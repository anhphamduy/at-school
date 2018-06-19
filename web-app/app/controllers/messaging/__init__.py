from flask import Blueprint

bp = Blueprint("messaging", __name__)

from app.controllers.messaging import routes
