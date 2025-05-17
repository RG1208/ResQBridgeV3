from flask import Blueprint, request, jsonify, make_response
from models import IncidentAlert, db
from flask_cors import CORS  # type: ignore
from datetime import datetime

incident_bp = Blueprint('incident_bp', __name__, url_prefix='/api')

# Enable CORS for this blueprint with proper methods and origins
CORS(incident_bp, resources={r"/alerts/*": {"origins": "http://localhost:5173"}}, methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"])


@incident_bp.route('/alerts', methods=['POST'])
def create_alert():
    data = request.get_json()

    time_obj = None
    if 'time' in data and data['time']:
        try:
            time_obj = datetime.fromisoformat(data['time'])
        except ValueError:
            return jsonify({'error': 'Invalid time format, must be ISO8601 string'}), 400

    new_alert = IncidentAlert(
        vehicle_id=data['vehicle_id'],
        time=time_obj,
        location=data['location'],
        severity=data['severity'],
        transcript=data['transcript'],
        status=data.get('status', 'Pending')
    )
    db.session.add(new_alert)
    db.session.commit()
    return jsonify({'message': 'Alert created successfully'}), 201

# GET: Retrieve all alerts
@incident_bp.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        alerts = IncidentAlert.query.all()
        result = [{
            'id': alert.id,
            'vehicleId': alert.vehicle_id,
            'severity': alert.severity,
            'status': alert.status,
            'time': alert.time.isoformat() if alert.time else None,
            'location': alert.location,
            'transcript': alert.transcript
        } for alert in alerts]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# DELETE: Delete alerts by vehicle_id
@incident_bp.route('/alerts/<vehicle_id>', methods=['DELETE'])
def delete_alerts_by_vehicle(vehicle_id):
    alerts = IncidentAlert.query.filter_by(vehicle_id=vehicle_id).all()
    
    if not alerts:
        return jsonify({'message': f'No alerts found for vehicle ID {vehicle_id}'}), 404

    try:
        for alert in alerts:
            db.session.delete(alert)
        db.session.commit()
        return jsonify({'message': f'Alerts for vehicle {vehicle_id} deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete alerts', 'details': str(e)}), 500
