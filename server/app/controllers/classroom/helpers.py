def falcuty_setup(db, Falcuty):
    falcuties = [
        "Arts", 
        "English and Humanities", 
        "Languages", 
        "Mathematics", 
        "Physical and Outdoor Education", 
        "Social and Behavioural Sciences", 
        "Technology and Design"
    ]
    for falcuty in falcuties:
        new_falcuty = Falcuty(falcuty_name=falcuty)
        db.session.add(new_falcuty)
        db.session.commit()