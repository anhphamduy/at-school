import jwt
from flask import request, jsonify, current_app, redirect, url_for
from app.controllers.auth import bp
from app.models import User
from app import db


@bp.route("/auth/signin", methods=["POST"])
def signin():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            public_key = open(current_app.config["JWT_KEY_PUBLIC"]).read()
            private_key = open(current_app.config["JWT_KEY_PRIVATE"]).read()
            token = jwt.encode({
                "id": user.id,
                "username": username,
            }, private_key, algorithm="RS256").decode("utf-8")
            user.login(token)
            fullname = user.firstname + " " + user.lastname
            return jsonify({
                "token": token, 
                "success": True, 
                "avatarUrl": user.get_default_avatar(256), 
                "userType": "teacher",
                "fullname": fullname
                })
    except KeyError:
        return redirect(url_for("errors.bad_request"))
    return jsonify({"success": False, "message": "Username or password is not correct."})


@bp.route("/auth/signout", methods=["POST"])
def signout():
    try:
        data = request.get_json()
        token = data["token"]
        payload = jwt.decode(token, open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user = User.query.filter_by(id=payload["id"]).first()
        user.logout()
        return jsonify({"success": True})
    except KeyError:
        return redirect(url_for("errors.bad_request"))
    return redirect(url_for("errors.bad_request"))

@bp.route("/auth/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data["username"]
        password = data["password"]
        password1 = data["password1"]
        firstname = data["firstname"]
        lastname = data["lastname"]
        email = data["email"]
        access_level = data["accessLevel"]

        if access_level not in ["1", "2", 1, 2]:
            return redirect(url_for("errors.bad_request"))

        if (password != password1 or len(password) < 8 or not firstname 
            or not lastname or not email or not username):
            return redirect(url_for("errors.bad_request"))

        user = User.query.filter_by(username=username).first()
        if (user):
            return redirect(url_for("errors.bad_request"))
        
        # when passed all the validations, add user in the database
        user = User(username=username, email=email, firstname=firstname, lastname=lastname, access_level=int(access_level))
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return jsonify({"success": True})

    except KeyError: 
        return redirect(url_for("errors.bad_request"))
    return redirect(url_for("errors.bad_request"))


@bp.route("/auth/duplicateuser", methods=["POST"])
def duplicate_user():
    try:
        data = request.get_json()
        username = data["username"]

        user = User.query.filter_by(username=username).first()
        if user:
            return jsonify({"duplicate": True})
        

        return jsonify({"duplicate": False})
    except KeyError:
        return redirect(url_for("errors.bad_request"))
    return redirect(url_for("errors.bad_request"))
