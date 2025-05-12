from flask import Flask
from flask_jwt_extended import JWTManager # type: ignore 
from flask_cors import CORS # type: ignore
from config import Config
from models import db
from routes.auth import auth_bp           # from the routes folder
from dashboards import dashboard_bp   

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)

# Create DB
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
