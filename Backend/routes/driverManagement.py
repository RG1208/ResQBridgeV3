from flask import Blueprint, request, jsonify, make_response
from models import db, Driver
from flask_cors import CORS # type: ignore

driver_bp = Blueprint('driver_bp', __name__)
CORS(driver_bp, resources={r"/api/driver/*": {"origins": "https://resqbridge3.vercel.app"}}, supports_credentials=True)

@driver_bp.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'https://resqbridge3.vercel.app'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response

@driver_bp.route('/drivers', methods=['GET'])
def get_drivers():
    drivers = Driver.query.all()
    return jsonify([driver.to_dict() for driver in drivers]), 200

@driver_bp.route('/drivers', methods=['POST'])
def add_driver():
    data = request.get_json()
    if Driver.query.get(data['id']):
        return jsonify({'error': 'Driver with this ID already exists'}), 400

    new_driver = Driver(
        id=data['id'],
        name=data['name'],
        phone=data['phone'],
        assigned_vehicle=data['assignedVehicle'],
        status=data['status'],
        emergency_contact=data['emergencyContact']
    )
    db.session.add(new_driver)
    db.session.commit()
    return jsonify(new_driver.to_dict()), 201

@driver_bp.route('/drivers/<string:driver_id>', methods=['PUT'])
def update_driver(driver_id):
    driver = Driver.query.get(driver_id)
    if not driver:
        return jsonify({'error': 'Driver not found'}), 404

    data = request.get_json()
    driver.name = data['name']
    driver.phone = data['phone']
    driver.assigned_vehicle = data['assignedVehicle']
    driver.status = data['status']
    driver.emergency_contact = data['emergencyContact']

    db.session.commit()
    return jsonify(driver.to_dict()), 200

@driver_bp.route('/drivers/<string:driver_id>', methods=['DELETE'])
def delete_driver(driver_id):
    driver = Driver.query.get(driver_id)
    if not driver:
        return jsonify({'error': 'Driver not found'}), 404

    db.session.delete(driver)
    db.session.commit()
    return '', 204

@driver_bp.after_request
def after_request(response):
    if request.method == 'OPTIONS':
        response.headers['Access-Control-Allow-Origin'] = 'https://resqbridge3.vercel.app'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response
