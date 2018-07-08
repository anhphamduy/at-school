from datetime import time

def add_days(db, Day):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    for day in days:
        new_day = Day(id=day)
        db.session.add(new_day)
        db.session.commit()
    return True

def add_lines(db, Line):
    lines = [i for i in range(1, 10)]
    for line in lines:
        new_line = Line(id=line)
        db.session.add(new_line)
        db.session.commit()
    return True

def setup_line_time(db, Line_Schedule):

    day_id = "Monday"
    time_intervals = [
        [time(8, 30), time(9, 25)],
        [time(9, 25), time(10, 20)],
        [time(10, 20), time(11, 15)],
        [time(11, 15), time(12, 10)],
        [time(12, 10), time(13, 5)],
        [time(13, 5), time(14, 0)],
        [time(14, 0), time(14, 55)],
        [time(14, 55), time(15, 50)]
    ]
    lines = [1, 2, 3, 4, 5, 6, 7, 8]
    for counter in range(len(lines)):
        new_line_schedule = Line_Schedule(line_id=lines[counter],
                         day_id=day_id, start_time=time_intervals[counter][0],
                         end_time=time_intervals[counter][1])
        db.session.add(new_line_schedule)
        db.session.commit()

    day_id = "Tuesday"
    time_intervals = [
        [time(9, 30), time(11, 20)],
        [time(11, 20), time(12, 20)],
        [time(12, 20), time(13, 20)],
        [time(13, 20), time(15, 10)],
    ]
    lines = [7, 3, 5, 1]
    for counter in range(len(lines)):
        new_line_schedule = Line_Schedule(line_id=lines[counter],
                         day_id=day_id, start_time=time_intervals[counter][0],
                         end_time=time_intervals[counter][1])
        db.session.add(new_line_schedule)
        db.session.commit()

    day_id = "Wednesday"
    time_intervals = [
        [time(9, 30), time(11, 20)],
        [time(11, 20), time(12, 20)],
        [time(12, 20), time(13, 20)],
        [time(13, 20), time(15, 10)],
        [time(15, 30), time(19, 00)]
    ]
    lines = [8, 2, 6, 4, 9]
    for counter in range(len(lines)):
        new_line_schedule = Line_Schedule(line_id=lines[counter],
                         day_id=day_id, start_time=time_intervals[counter][0],
                         end_time=time_intervals[counter][1])
        db.session.add(new_line_schedule)
        db.session.commit()

    day_id = "Thursday"
    time_intervals = [
        [time(8, 30), time(10, 20)],
        [time(10, 20), time(11, 20)],
        [time(11, 20), time(12, 20)],
        [time(12, 20), time(14, 10)],
    ]
    lines = [5, 1, 7, 3]
    for counter in range(len(lines)):
        new_line_schedule = Line_Schedule(line_id=lines[counter],
                         day_id=day_id, start_time=time_intervals[counter][0],
                         end_time=time_intervals[counter][1])
        db.session.add(new_line_schedule)
        db.session.commit()
    
    day_id = "Friday"
    time_intervals = [
        [time(9, 0), time(10, 50)],
        [time(11, 20), time(12, 20)],
        [time(12, 20), time(13, 20)],
        [time(13, 20), time(15, 10)],
    ]
    lines = [6, 4, 8, 2]
    for counter in range(len(lines)):
        new_line_schedule = Line_Schedule(line_id=lines[counter],
                         day_id=day_id, start_time=time_intervals[counter][0],
                         end_time=time_intervals[counter][1])
        db.session.add(new_line_schedule)
        db.session.commit()
    

def schedule_setup(db, Day, Line, Line_Schedule):
    add_days(db, Day)
    add_lines(db, Line)
    setup_line_time(db, Line_Schedule)
