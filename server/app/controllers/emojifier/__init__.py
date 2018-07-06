from flask import Blueprint

bp = Blueprint("emojifier", __name__)

from app.controllers.emojifier import routes
