from app import create_app, db
from app.models import User, Message, GloveEmbedding, Line, Day, Line_Schedule, Falcuty, Class
from app.controllers.emojifier.helpers import emojifier_setup
from app.controllers.schedule.helpers import schedule_setup, setup_line_time
from app.controllers.classroom.helpers import falcuty_setup

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
        "Class": Class,
        "Falcuty": Falcuty,
        "Line_Schedule": Line_Schedule,
        "GloveEmbedding": GloveEmbedding, 
        "emojifier_setup": emojifier_setup,
        "schedule_setup": schedule_setup,
        "setup_line_time": setup_line_time,
        "falcuty_setup": falcuty_setup
    }



app.run(host='0.0.0.0')