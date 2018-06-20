from flask import abort
from app.controllers.errors import bp

@bp.route("/badrequest400")
def bad_request():
    return abort(400)