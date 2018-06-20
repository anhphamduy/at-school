import jwt
from flask import request, jsonify, current_app, redirect, url_for
from app.controllers.auth import bp
from app.models import User


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
                "public_key": public_key,
            }, private_key, algorithm="RS256").decode("utf-8")
            user.login(token)
            return jsonify({"token": token})
    except KeyError:
        return redirect(url_for("errors.bad_request"))
    return redirect(url_for("errors.bad_request"))


@bp.route("/auth/signout", methods=["POST"])
def signout():
    try:
        data = request.get_json()
        token = data["token"]
        payload = jwt.decode(token, current_app.config["JWT_KEY_PUBLIC"], algorithms=['RS256'])
        user = User.query.filter_by(id=payload.id).first()
        user.logout()
        return jsonify({"success": True})
    except KeyError:
        return redirect(url_for("errors.bad_request"))
    return redirect(url_for("errors.bad_request"))
