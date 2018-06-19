from flask import request, jsonify
from app.controllers.messaging import bp
from app.models import User, Message

@bp.route("/messaging", methods=["POST"])
def send_message():
    data = request.json()