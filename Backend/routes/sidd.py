from flask import Blueprint, request, jsonify
from models import db, SIDDDevice
from flask_cors import CORS # type: ignore

sidd_bp = Blueprint('sidd', __name__, url_prefix='/api/sidd')
CORS(sidd_bp, resources={r"/*": {"origins": "https://resqbridge3.vercel.app"}}, supports_credentials=True)

# GET all devices
@sidd_bp.route('', methods=['GET'])
def get_devices():
    devices = SIDDDevice.query.all()
    return jsonify([{
        'id': d.id,
        'driver': d.driver,
        'contact': d.contact,
        'car': d.car,
        'status': d.status,
        'emergency': d.emergency
    } for d in devices])

# POST: Add new device
@sidd_bp.route('', methods=['POST'])
def add_device():
    data = request.get_json()
    print("Received data:", data)
    
    new_device = SIDDDevice(
        id=data.get('id'),
        driver=data.get('driver'),
        contact=data.get('contact'),
        car=data.get('car'),
        status=data.get('status'),
        emergency=data.get('emergency')
    )
    
    db.session.add(new_device)
    db.session.commit()

    return jsonify({
        'id': new_device.id,
        'driver': new_device.driver,
        'contact': new_device.contact,
        'car': new_device.car,
        'status': new_device.status,
        'emergency': new_device.emergency
    }), 201

# PUT: Update existing device
@sidd_bp.route('/<string:id>', methods=['PUT'])
def update_device(id):
    data = request.get_json()
    device = SIDDDevice.query.get(id)

    if not device:
        return jsonify({'message': 'Device not found'}), 404

    device.driver = data.get('driver', device.driver)
    device.contact = data.get('contact', device.contact)
    device.car = data.get('car', device.car)
    device.status = data.get('status', device.status)
    device.emergency = data.get('emergency', device.emergency)

    db.session.commit()

    return jsonify({
        'id': device.id,
        'driver': device.driver,
        'contact': device.contact,
        'car': device.car,
        'status': device.status,
        'emergency': device.emergency
    }), 200

# DELETE: Remove a device by ID
@sidd_bp.route('/<string:id>', methods=['DELETE'])
def delete_device(id):
    device = SIDDDevice.query.get(id)
    if not device:
        return jsonify({'message': 'Device not found'}), 404

    db.session.delete(device)
    db.session.commit()
    return jsonify({'message': 'Device deleted'}), 200

