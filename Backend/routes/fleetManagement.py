from flask import Blueprint, make_response, request, jsonify
from flask_sqlalchemy import SQLAlchemy # type: ignore
from flask_cors import CORS # type: ignore
from flask import Flask

db = SQLAlchemy()
app = Flask(__name__)
# Create a Blueprint for fleet management
fleet_bp = Blueprint('fleet_bp', __name__)
CORS(fleet_bp, resources={r"/*": {"origins": "http://localhost:5173", "supports_credentials": True}})

class Vehicle(db.Model):
    id = db.Column(db.String(80), primary_key=True)
    model = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    sidd = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    
@fleet_bp.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT, PATCH, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

# Route to fetch all vehicles
@fleet_bp.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{
        'id': vehicle.id,
        'model': vehicle.model,
        'status': vehicle.status,
        'sidd': vehicle.sidd,
        'state': vehicle.state
    } for vehicle in vehicles])

# Route to add a vehicle
@fleet_bp.route('/vehicles', methods=['POST'])
def add_vehicle():
    data = request.get_json()
    print("Received data:", data)
    new_vehicle = Vehicle(
        id=data['id'],
        model=data['model'],
        status=data['status'],
        sidd=data['sidd'],
        state=data['state']
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({
        'id': new_vehicle.id,
        'model': new_vehicle.model,
        'status': new_vehicle.status,
        'sidd': new_vehicle.sidd,
        'state': new_vehicle.state
    }), 201

@fleet_bp.route('/vehicles/<string:vehicle_id>', methods=['DELETE'])
def delete_vehicle(vehicle_id):
    try:
        vehicle = Vehicle.query.get(vehicle_id)  # Get vehicle by id
        if vehicle:
            db.session.delete(vehicle)  # Delete the vehicle
            db.session.commit()  # Commit the transaction
            return '', 204  # No Content (success)
        else:
            return jsonify({'message': 'Vehicle not found'}), 404  # Vehicle not found
    except Exception as e:
        print(f"Delete error: {e}")
        return jsonify({'message': 'Failed to delete vehicle.'}), 500
    
# Route to update a vehicle by ID
@fleet_bp.route('/vehicles/<string:id>', methods=['PUT'])
def update_vehicle(id):
    data = request.get_json()
    vehicle = Vehicle.query.get(id)

    if vehicle:
        vehicle.model = data.get('model', vehicle.model)
        vehicle.status = data.get('status', vehicle.status)
        vehicle.sidd = data.get('sidd', vehicle.sidd)
        vehicle.state = data.get('state', vehicle.state)

        db.session.commit()

        return jsonify({
            'id': vehicle.id,
            'model': vehicle.model,
            'status': vehicle.status,
            'sidd': vehicle.sidd,
            'state': vehicle.state
        }), 200
    return jsonify({"message": "Vehicle not found"}), 404

@fleet_bp.after_request
def after_request(response):
    # Add CORS headers to all responses
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response