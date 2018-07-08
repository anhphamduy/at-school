from flask import Blueprint

bp = Blueprint("classroom", __name__)

from app.controllers.classroom import routes