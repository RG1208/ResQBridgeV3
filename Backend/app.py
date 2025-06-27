from flask import Flask, jsonify
from flask_cors import CORS # type: ignore
from flask_jwt_extended import JWTManager # type: ignore
from config import Config
from models import db
from routes.auth import auth_bp
from dashboards import dashboard_bp
from routes.fleetManagement import fleet_bp
from routes.driverManagement import driver_bp
from routes.sidd import sidd_bp
from routes.incident_alerts import incident_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": "https://resqbridge3.vercel.app"}}, supports_credentials=True)
db.init_app(app)
JWTManager(app) 

@app.route('/')
def index():
    return jsonify({'message': 'ResqBridge backend is running ✅'})

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(fleet_bp, url_prefix='/api/fleet')
app.register_blueprint(driver_bp, url_prefix='/api/driver')
app.register_blueprint(sidd_bp, url_prefix='/api/sidd')
app.register_blueprint(incident_bp, url_prefix='/api')

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
