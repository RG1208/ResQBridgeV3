from flask_sqlalchemy import SQLAlchemy # type: ignore
import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f'<User {self.email}>'

class Vehicle(db.Model):
    __tablename__ = 'vehicle'  # This specifies the table name
    
    id = db.Column(db.String(100), primary_key=True)
    model = db.Column(db.String(100))
    status = db.Column(db.String(50), default='Offline')
    sidd = db.Column(db.String(100))
    state = db.Column(db.String(50), default='Stationary')

    def __init__(self, id, model, status, sidd, state):
        self.id = id
        self.model = model
        self.status = status
        self.sidd = sidd
        self.state = state

class Driver(db.Model):
    __tablename__ = 'drivers'

    id = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    assigned_vehicle = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Enum('Active', 'Off Duty', name='driver_status'), nullable=False)
    emergency_contact = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'assignedVehicle': self.assigned_vehicle,
            'status': self.status,
            'emergencyContact': self.emergency_contact
        }
    

class SIDDDevice(db.Model):
    id = db.Column(db.String, primary_key=True)
    driver = db.Column(db.String, nullable=False)
    contact = db.Column(db.String, nullable=False)
    car = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    emergency = db.Column(db.String, nullable=False)
