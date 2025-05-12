from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token  # type: ignore
from models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'Email already registered'}), 409

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        role=data['role']
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity={
        'id': new_user.id,
        'email': new_user.email,
        'role': new_user.role,
        'name': new_user.name
    })

    return jsonify({
        'message': 'User registered successfully',
        'token': access_token,
        'role': new_user.role,
        'name': new_user.name
    }), 201

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401

    access_token = create_access_token(identity={
        'id': user.id,
        'email': user.email,
        'role': user.role,
        'name': user.name
    })

    return jsonify({
        'message': 'Login successful',
        'token': access_token,
        'role': user.role,
        'name': user.name
    }), 200
