from flask import Blueprint

bp = Blueprint("schedule", __name__)

from app.controllers.schedule import routes