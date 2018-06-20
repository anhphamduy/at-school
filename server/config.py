import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')

    TEMPLATE_URL = os.path.join(basedir, "app", "views", "templates")
    STATIC_URL = os.path.join(basedir, "app", "views", "static")

    JWT_KEY_PRIVATE = os.path.join(basedir, "keys", "jwt-key")
    JWT_KEY_PUBLIC = os.path.join(basedir, "keys", "jwt-key.pub")

    JWT_AUTH_PASSWORD_KEY = "cuncun"
    