import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = "auth.login"
login.login_message = "Please login to access this page"
cors = CORS()

def create_app(config_class=Config):
    app = Flask(__name__, template_folder=config_class.TEMPLATE_URL, static_folder=config_class.STATIC_URL)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    cors.init_app(app)

    from app.controllers.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    from app.controllers.camera import bp as camera_bp
    app.register_blueprint(camera_bp)

    from app.controllers.messaging import bp as messaging_bp
    app.register_blueprint(messaging_bp)

    from app.controllers.emojifier import bp as emojifier_bp
    app.register_blueprint(emojifier_bp)

    from app.controllers.schedule import bp as schedule_bp
    app.register_blueprint(schedule_bp)

    from app.controllers.classroom import bp as classroom_bp
    app.register_blueprint(classroom_bp)

    from app.controllers.errors import bp as errors_bp
    app.register_blueprint(errors_bp)
    

    return app

from app import models