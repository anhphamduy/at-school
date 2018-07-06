from app import create_app, db
from app.models import User, Message, GloveEmbedding
from app.controllers.emojifier.helpers import read_glove_vecs, save_database

# get the app instance
app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, "Message": Message, "GloveEmbedding": GloveEmbedding, "read_glove_vecs": read_glove_vecs, "save_database": save_database}


app.run(host='0.0.0.0')