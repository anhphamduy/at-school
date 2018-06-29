from flask import Blueprint

bp = Blueprint("camera", __name__)

from app.controllers.camera import routes