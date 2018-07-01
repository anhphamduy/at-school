from flask import request, jsonify, current_app, redirect, url_for
import os
from app.controllers.camera import bp
import base64
import face_recognition
from PIL import Image
import numpy as np
from app.controllers.errors import bad_request
import jwt
from app.models import User



@bp.route("/camera/upload", methods=["POST"])
def upload():
    try:
        data = request.get_json()
        image_data = data["imageData"]
        image_data = image_data[image_data.find(",")+1:]
        image_data = base64.b64decode(image_data)
        filename = 'image.jpg'
        with open(filename, 'wb') as f:
            f.write(image_data)

        # Load the uploaded image file
        img = face_recognition.load_image_file(filename)
        face_locations = face_recognition.face_locations(img)
        # Get face encodings for any faces in the uploaded image
        unknown_face_encodings = face_recognition.face_encodings(img)
        people_found = []
        users = User.query.all()
        if len(unknown_face_encodings) > 0:

            # get only those users have face encoding
            known_face_encodings = []
            users_have_encodings = []
            for u in users:
                if u.face_encoding:
                    known_face_encodings.append(np.fromstring(u.face_encoding))
                    users_have_encodings.append(u)

            # compare faces
            match_results = face_recognition.compare_faces(known_face_encodings, unknown_face_encodings[0])
            
            # get the name of all users that have the same face encodings
            for i in enumerate(match_results):
                if (i[1]):
                    people_found.append(users_have_encodings[i[0]].firstname + " " + users_have_encodings[i[0]].lastname)

        return jsonify({"success" : True, "peopleFound": people_found})
    except KeyError:
        return bad_request("Wrong arguments.")
    return bad_request("There is an internal server error. Please contact the IT support.")

@bp.route("/camera/save", methods=["POST"])
def save_image():
    try: 
        data = request.get_json()
        
        # get user from jwt token
        token = data["token"]
        payload = jwt.decode(token, open(current_app.config["JWT_KEY_PUBLIC"]).read(), algorithms=['RS256'])
        user = User.query.filter_by(id=payload["id"]).first()
        if not user:
            return bad_request("User does not exist.")
        # get image data
        image_data = data["imageData"]
        image_data = base64.b64decode(image_data)
        filename = os.path.join(os.path.dirname(__file__), 'image.jpg')
        with open(filename, 'wb') as f:
            f.write(image_data)
        img = face_recognition.load_image_file(filename)
        face_encodings = face_recognition.face_encodings(img)
        if len(face_encodings) != 1:
            return bad_request("There is no face in the photo.")

        # put face encoding of the user into the database here
        encoding_to_save = face_encodings[0].tostring()
        user.save_face_encoding(encoding_to_save)
        
        return jsonify({"success" : True})
    except KeyError:
        return bad_request("Wrong arguments.")
    return bad_request("There is an internal server error. Please contact the IT support.")



