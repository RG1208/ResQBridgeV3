from flask import Blueprint, request, jsonify, make_response
from models import IncidentAlert , db
from flask_cors import CORS # type: ignore
from datetime import datetime

incident_bp = Blueprint('incident_bp', __name__)
CORS(incident_bp, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

# Handle CORS Preflight
@incident_bp.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

# POST: Receive alert from SIDD
@incident_bp.route('/alerts', methods=['POST'])
def create_alert():
    data = request.get_json()

    # Parse time string to datetime object, if provided
    time_obj = None
    if 'time' in data and data['time']:
        try:
            time_obj = datetime.fromisoformat(data['time'])
        except ValueError:
            return jsonify({'error': 'Invalid time format, must be ISO8601 string'}), 400

    new_alert = IncidentAlert(
        vehicle_id=data['vehicle_id'],
        time=time_obj,  # pass datetime object or None
        location=data['location'],
        severity=data['severity'],
        transcript=data['transcript'],
        status=data.get('status', 'Pending')
    )
    db.session.add(new_alert)
    db.session.commit()
    return jsonify({'message': 'Alert created successfully'}), 201


# GET: Serve alert data to frontend
@incident_bp.route('/alerts', methods=['GET'])
def get_alerts():
    try:
        alerts = IncidentAlert.query.all()
        result = []
        for alert in alerts:
           result.append({
                'id': alert.id,
                'vehicleId': alert.vehicle_id,
                'severity': alert.severity,
                'status': alert.status,
                'time': alert.time.isoformat() if alert.time else None,
                'location': alert.location,
                'transcript': alert.transcript
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Add CORS headers to all responses
@incident_bp.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response
