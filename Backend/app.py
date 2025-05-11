from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy  # type: ignore
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity # type: ignore
from flask_cors import CORS    # type: ignore
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  # Change this in production!
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'

# Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'message': 'Email already registered'}), 409
    
    # Create new user
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,
        role=data['role']
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Generate access token
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

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    # Check if user exists and password is correct
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401
    
    # Generate access token
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

# Protected routes for each role
@app.route('/api/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user = get_jwt_identity()
    
    # Check if user is an admin
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

@app.route('/api/user/dashboard', methods=['GET'])
@jwt_required()
def user_dashboard():
    current_user = get_jwt_identity()
    
    # Check if user is a regular user
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

@app.route('/api/fleet/dashboard', methods=['GET'])
@jwt_required()
def fleet_dashboard():
    current_user = get_jwt_identity()
    
    # Check if user is a fleet owner
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

if __name__ == '__main__':
    app.run(debug=True)