from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity # type: ignore
from models import User

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/api/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user = get_jwt_identity()
    if current_user.get('role') != 'admin':
        return jsonify({'message': 'Access denied'}), 403

    return jsonify({
        'message': 'Admin dashboard data',
        'data': {
            'total_users': User.query.count(),
            'stats': {
                'active_users': 120,
                'new_registrations': 15,
                'pending_requests': 5
            }
        }
    }), 200

@dashboard_bp.route('/api/user/dashboard', methods=['GET'])
@jwt_required()
def user_dashboard():
    current_user = get_jwt_identity()
    if current_user.get('role') != 'user':
        return jsonify({'message': 'Access denied'}), 403

    return jsonify({
        'message': 'User dashboard data',
        'data': {
            'activities': [
                {'id': 1, 'type': 'login', 'timestamp': '2023-05-10T10:30:00Z'},
                {'id': 2, 'type': 'profile_update', 'timestamp': '2023-05-09T14:20:00Z'},
                {'id': 3, 'type': 'payment', 'timestamp': '2023-05-08T09:15:00Z'}
            ],
            'notifications': 3
        }
    }), 200

@dashboard_bp.route('/api/fleet/dashboard', methods=['GET'])
@jwt_required()
def fleet_dashboard():
    current_user = get_jwt_identity()
    if current_user.get('role') != 'fleetowner':
        return jsonify({'message': 'Access denied'}), 403

    return jsonify({
        'message': 'Fleet dashboard data',
        'data': {
            'total_vehicles': 25,
            'active_vehicles': 18,
            'maintenance_required': 3,
            'drivers': 20
        }
    }), 200
