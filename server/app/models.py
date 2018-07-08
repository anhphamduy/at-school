from app import db
from datetime import datetime
from hashlib import md5
from werkzeug.security import generate_password_hash, check_password_hash

class GloveEmbedding(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(1000), nullable=False)
    vector = db.Column(db.String(3000), nullable=False)

class Message(db.Model):
    __tablename__ = "message"

    id = db.Column(db.Integer, primary_key=True)
    to_id = db.Column(db.Integer)
    from_id = db.Column(db.Integer)
    content = db.Column(db.String(1000))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return "<Messege from {} to {}>".format(self.from_id, self.to_id)

class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255))
    password = db.Column(db.String(128))
    access_level = db.Column(db.Integer)
    jwt = db.Column(db.String(10000))
    num_of_logins = db.Column(db.Integer, default=0)
    nfc_id = db.Column(db.String(30))
    school_id = db.Column(db.Integer)
    face_encoding = db.Column(db.String(2000))
    class_teach = db.relationship("Class", backref="classes_teach", lazy="dynamic")

    def set_password(self, password):
        """Runs the passwords through a hash and appends."""
        self.password = generate_password_hash(str(password))
    
    def get_default_avatar(self, size):
        digest = md5(self.username.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=identicon&s={}'.format(
            digest, size)

    def check_password(self, password):
        """Checks a password against the hash."""
        return check_password_hash(self.password, password)

    def save_face_encoding(self, encoding):
        self.face_encoding = encoding
        db.session.add(self)
        db.session.commit()

    def login(self, jwt):
        if self.jwt:  
            self.num_of_logins += 1
            db.session.add(self)
            db.session.commit()
        else:
            self.jwt = jwt
            self.num_of_logins += 1
            db.session.add(self)
            db.session.commit()

    def logout(self):
        self.num_of_logins -= 1
        if self.num_of_logins == 0:
            self.jwt = None
        db.session.add(self)
        db.session.commit()

    def send_message(self, to_user, content):
        message = Message(from_id=self.id, to_id=to_user.id, content=content)
        db.session.add(message)
        db.session.commit()

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Class(db.Model):
    __tablename__ = "class"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))
    line_id = db.Column(db.Integer, db.ForeignKey("line.id"))
    teacher_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    falcuty_id = db.Column(db.Integer, db.ForeignKey("falcuty.id"))

    def __repr__(self):
        return "<Class {}>".format(self.name)

class Falcuty(db.Model):
    __tablename__ = "falcuty"

    id = db.Column(db.Integer, primary_key=True)
    falcuty_name = db.Column(db.String(200))
    class_id = db.relationship("Class", backref="classes", lazy="dynamic")

class Line(db.Model):
    __tablename__ = "line"

    id = db.Column(db.Integer, primary_key=True)
    schedule = db.relationship("Day", secondary="line_schedule", lazy="dynamic")
    class_id = db.relationship("Class", backref="class_schedule", lazy="dynamic")

class Day(db.Model):
    __tablename__ = "day"

    id = db.Column(db.String(10), primary_key=True)
    line = db.relationship("Line", secondary="line_schedule", lazy="dynamic")

class Line_Schedule(db.Model):
    __tablename__ = "line_schedule"

    line_id = db.Column(db.Integer, db.ForeignKey("line.id"), primary_key=True)
    day_id = db.Column(db.Integer, db.ForeignKey("day.id"), primary_key=True)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    title = db.Column(db.String(100))
    description = db.Column(db.String(255))

    def __repr__(self):
        return "<Post {}>".format(self.title)
        
# class Roll(db.Model):
    
#     user_id = db.Column(db.Integer)
#     class_id = db.Column(db.Integer)

#     def __repr__(self):
#         return "<Roll {} contains user {}>".format(
#             self.class_id, self.user_id
#         )

class School(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    state_id = db.Column(db.Integer)

    def __repr__(self):
        return "<School {}>".format(self.name)

class State(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __repr__(self):
        return '<State {}>'.format(self.name)