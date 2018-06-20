import jwt
from flask import request, jsonify
from app.controllers.messaging import bp
from app.models import User, Message
from config import Config

@bp.route("/messaging", methods=["POST"])
def send_message():
    data = request.json()
    try:
        username = data["username"]
        password = data["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            public_key = open(Config["JWT_KEY_PUBLIC"]).read()
            private_key = open(Config["JWT_KEY_PRIVATE"]).read()
            token = jwt.encode({
                "id": user.id,
                "username": username,
                "public_key": public_key
            }, private_key, algorithm="RS256")
        else:
            # return the error (404)
            pass

    except KeyError:
        pass