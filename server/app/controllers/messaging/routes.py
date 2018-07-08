import jwt
from flask import request, jsonify, current_app
from app.controllers.messaging import bp
from app.models import User, Message
from config import Config
from app.controllers.errors import bad_request
from sqlalchemy import and_, or_

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
                    "id": user.id,
                    "fullname": user.firstname + " " + user.lastname,
                    "accessLevel": user.access_level,
                    "avatar": user.get_default_avatar(512)
                })
        
            return jsonify({"results": data_to_return})

        

    except KeyError:
        pass

@bp.route("/getmessage/details", methods=["POST"])
def get_message_details():
    try:
        # get user id and other id
        data = request.get_json()
        payload = jwt.decode(data["token"], open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user_id = payload["id"]
        other_id = data["id"]

        # sanity check if two users exist
        user = User.query.filter_by(id=user_id).first()
        user1 = User.query.filter_by(id=other_id).first()
        if not user or not user1:
            return bad_request("User does not exist.")

        messages = Message.query.filter(or_(and_(Message.from_id==user_id, Message.to_id==other_id), \
            and_(Message.from_id==other_id, Message.to_id==user_id))).order_by(Message.timestamp.asc()).all()
        
        results = []
        counter = 0
        for message in messages:
            if message.from_id == user_id:
                results.append({
                    "id": counter,
                    "content": message.content,
                    "self": True
                })
            else:
                results.append({
                    "id": counter,
                    "content": message.content,
                    "self": False
                })
            counter += 1
        return jsonify({"results": results})

    except KeyError:
        pass

@bp.route("/sendmessage", methods=["POST"])
def send_message():
    try:
        # get user id and other id
        data = request.get_json()
        payload = jwt.decode(data["token"], open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user_id = payload["id"]
        other_id = data["id"]

        # sanity check if two users exist
        user = User.query.filter_by(id=user_id).first()
        user1 = User.query.filter_by(id=other_id).first()
        if not user or not user1:
            return bad_request("User does not exist.")

        # send message
        content = data["content"]
        if not content:
            return bad_request("Message contains no content.")

        user.send_message(user1, content)

        # get all the messages to return
        messages = Message.query.filter(or_(and_(Message.from_id==user_id, Message.to_id==other_id), \
            and_(Message.from_id==other_id, Message.to_id==user_id))).order_by(Message.timestamp.desc()).all()
        
        results = []
        for message in messages:
            if message.from_id == user_id:
                results.append({
                    "id": message.id,
                    "content": message.content,
                    "self": True
                })
            else:
                results.append({
                    "id": message.id,
                    "content": message.content,
                    "self": False
                })
        return jsonify({"results": results})

    except KeyError:
        pass
