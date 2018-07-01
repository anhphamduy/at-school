import jwt
from flask import request, jsonify, current_app
from app.controllers.messaging import bp
from app.models import User, Message
from config import Config
from app.controllers.errors import bad_request


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

@bp.route("/getmessage", methods=["POST"])
def get_message():
    try:
        data = request.get_json()
        # get user from jwt token
        token = data["token"]
        payload = jwt.decode(token, open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user = User.query.filter_by(id=payload["id"]).first()
        if not user:
            return bad_request("User does not exist.")
        
        # type 1: get all users
        message_type = data["messageType"]
        if message_type == 1:
            users = User.query.all()
            data_to_return = []
            for user in users:
                data_to_return.append({
                    "fullname": user.firstname + " " + user.lastname,
                    "accessLevel": user.access_level,
                    "avatar": user.get_default_avatar(512)
                })
        
            return jsonify({"results": data_to_return})

        

    except KeyError:
        pass