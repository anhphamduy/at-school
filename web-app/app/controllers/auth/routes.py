import jwt
from flask import request, jsonify, current_app
from app.controllers.auth import bp
from app.models import User

@bp.route("/signin", methods=["POST"])
def signin():
    try:
        print("Here")
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
                "public_key": public_key
            }, private_key, algorithm="RS256").decode("utf-8")
            print(token)
            return jsonify()
        else:
            # return the error (404)
            pass

        return jsonify()

    except KeyError:
        pass
    