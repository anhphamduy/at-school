from flask import Blueprint

bp = Blueprint("errors", __name__)

from app.controllers.errors.handlers import bad_request
