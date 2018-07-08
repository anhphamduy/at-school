from app import create_app, db
from app.models import User, Message, GloveEmbedding, Line, Day, Line_Schedule
from app.controllers.emojifier.helpers import read_glove_vecs, save_database
from app.controllers.schedule.helpers import setup_schedule, setup_line_time

# get the app instance
app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db, 
        'User': User, 
        "Message": Message, 
        "Line": Line,
        "Day": Day,
        "Line_Schedule": Line_Schedule,
        "GloveEmbedding": GloveEmbedding, 
        "read_glove_vecs": read_glove_vecs, 
        "save_database": save_database,
        "setup_schedule": setup_schedule,
        "setup_line_time": setup_line_time
    }



app.run(host='0.0.0.0')