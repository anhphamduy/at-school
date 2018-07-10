from flask import request, jsonify, current_app
from app import db
from app.controllers.classroom import bp
from app.models import User, Class
import jwt
from config import Config


@bp.route("/classroom/createclass", methods=["POST"])
def create_class():
    try:
        data = request.get_json()
        class_name = data["className"]
        class_description = data["classDescription"]
        class_line = data["classLine"]
        class_falcuty = data["classFalcuty"]

        # get user from jwt token
        token = data["token"]
        payload = jwt.decode(token, open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user = User.query.filter_by(id=payload["id"]).first()
        if not user:
            return bad_request("User does not exist.")

        # check if user has enough access level
        if user.access_level != 2:
            return bad_request("Do not have access.")
        
        new_class = Class(name=class_name, description=class_description, 
                    line_id=int(class_line), falcuty_id=int(class_falcuty),
                    teacher_id=user.id)
        
        db.session.add(new_class)
        db.session.commit()
        
        return jsonify({"success": True, "id": new_class.id})

    except KeyError:
        pass

@bp.route("/classroom/teacher/getclass", methods=["POST"])
def get_class_teacher():
    try:
        data = request.get_json()

        # get user from jwt token
        token = data["token"]
        payload = jwt.decode(token, open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user = User.query.filter_by(id=payload["id"]).first()

        if not user:
            return bad_request("User does not exist.")

        # check if user has enough access level
        if user.access_level != 2:
            return bad_request("Do not have access.")

        classes = Class.query.filter_by(teacher_id=user.id)
        results = []
        for c in classes:
            results.append({
                "id": c.id,
                "name": c.name,
                "description": c.description,
                "line": c.line_id,
            })
        print(results)
        return jsonify({"results": results})

    except KeyError:
        pass

@bp.route("/classroom/teacher/hasclass", methods=["POST"])
def teacher_has_class():
    try:
        data = request.get_json()

        # get user from jwt token
        token = data["token"]
        payload = jwt.decode(token, open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user = User.query.filter_by(id=payload["id"]).first()

        if not user:
            return bad_request("User does not exist.")

        # check if user has enough access level
        if user.access_level != 2:
            return bad_request("Do not have access.")

        classes = Class.query.filter_by(teacher_id=user.id).all()
        for i in range(len(classes)):
            classes[i] = {
                "id": classes[i].id
            }
        if len(classes) == 0:
            return jsonify({"result": False})
        else:
            return jsonify({"result": True, "classes": classes})

    except KeyError:
        pass
        
