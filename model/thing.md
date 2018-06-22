# This is the project planning

## Logo

We still don't have an official name for the app so we have not yet had any logo. The temprorary one is `@ school` but it hasn't been approved by other team members. We need to decide by next week so that we could do all the design for our app. If everyone agrees with the name `@ school`, then Charl will do the logo part.

## Database

1. State
    1. State ID
    2. State Name

2. School
    1. School ID
    2. School Name
    3. Foriegn key State ID

3. Student
    1. Student ID
    2. Student Name
    3. Student NFC ID (default set to null)
    4. Student Password
    5. Foreign key School ID
    
4. Teacher
    1. Teacher ID
    2. Teacher Name
    3. Teacher Password
    4. Foreign key School ID

5. Class
    1. Class ID
    2. Class Name
    3. Class Start Time
    4. Class End Time
    
6. Teacher_Class
    1. Teacher ID
    2. Class ID

Above is must-have feautures for the database. Please develop more so the databse would have some features such as:
- The class schedule for students.
- Wheather or not the student has tapped in and tapped out of class.
- What class on what day at what time does a student not attend.
- The reason for the student's absence for that class.

Please include more if you think I am missing something. But before doing that, send me a message.

## Web app
1. Make some of basic APIs for retreiving information such as student ID, state ID, or student NFC ID from the database.
2. Please think about the security before making the APIs. Not all users have all access to every API.  

## Desktop app
1. Design a login screen and must have login capability by next week. Login must be secured.
