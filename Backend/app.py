from flask import Flask
from flask_cors import CORS # type: ignore
from flask_jwt_extended import JWTManager # type: ignore
from config import Config
from models import db
from routes.auth import auth_bp
from dashboards import dashboard_bp
from routes.fleetManagement import fleet_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
db.init_app(app)
JWTManager(app)  # <-- THIS LINE IS MANDATORY

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(fleet_bp, url_prefix='/api/fleet')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
