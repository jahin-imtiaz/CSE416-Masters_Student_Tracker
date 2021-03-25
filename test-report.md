# Test Cases

**Test case**: GPD imports degree requirements

**Brief description**: GPD uploads JSON file containing degree requirements

**Precondition**: GPD is logged in, valid degree requirements JSON file

**Test Inputs**: 
1. File: *degree-requirements-AMS.json*

**Flow of Events**: 
1. Click on browse degree requirements file button on Import File screen
2. Select valid degree requirements file
3. Click on respective add button
4. Degree requirements for that degree version are stored as documents in MongoDB
5. If there is an existing copy of the degree version in the database, then it is overwritten by the newly imported degree requirement document
6. Outcome: Successful import of degree requirements

**Test case**: GPD imports course offerings

**Brief description**: GPD uploads csv file containing course offerings

**Precondition**: GPD is logged in, valid course offerings csv file

**Test Inputs**: 
1. File: *courseOfferings.csv*

**Flow of Events**:

1. Click on browse course offerings file button on Import File screen
2. Select valid course offerings file
3. Click on respective add button
4. Course offerings for that semester are stored as documents in MongoDB
5. If there is an existing copy of the course offerings for that semester in the database, then it is deleted and replaced by the newly imported course offerings document

**Outcome**: Successful import of course offerings

**Test case**: GPD deletes all student data

**Brief description**: GPD deletes all student records in the system

**Precondition**: GPD is logged in

**Flow of Events**:

1. Click on Delete All Student button on GPD home screen
2. All student records are removed from MongoDB

**Outcome**: Successful deletion of student data

**Test case**: GPD imports student data 

**Brief description**: GPD uploads two csv file containing student data

**Precondition**: GPD is logged in, valid student profile csv file, valid student course plan csv file

**Test Inputs**: 
1. Student profile file: *student profile file.csv*
2. Student course plan file: *student course plan file.csv*

**Flow of Events**: 
1. Click on browse student profile button on Import File screen
2. Select valid student profile file
3. Click on respective add button
4. Student profiles are stored as documents in MongoDB
5. If there is an existing copy of a student mentioned in the student profiles inside the database, then it is deleted and replaced by the newly imported data in the student profile file
6. Select valid student course plan file
7. Click on respective add button
8. Student course plans are stored as documents in MongoDB
9. If there is an existing copy of a student mentioned in the student course plan inside the database, then it is deleted and replaced by the newly imported data in the student course plan

**Outcome**: Successful import of student data

**Test case**: GPD imports student grades

**Brief description**: GPD uploads csv file containing student grades

**Precondition**: GPD is logged in, valid student grades csv file

**Test Inputs**: 

1. File: *student grades file.csv*

**Flow of Events**:

1. Click on browse grades file on the Import File screen
2. Select valid student grades file
3. Click on respective add button
4. Student course plan documents are updated according to the data in the newly imported student grades file

**Outcome**: Successful import of student grades

**Test case**: GPD adds a student to the system

**Brief description**: GPD enters student data and adds it to the database

**Precondition**: GPD is logged in, valid student data

**Test Inputs**: 

1. Student ID: 123456789
2. Email: john.smith@stonybrook.edu
3. First Name: John
4. Last Name: Smith
5. Department: AMS
6. Track: Computational Applied Mathematics
7. Entry Semester: Fall
8. Entry Year: 2018
9. Req. Version Semester: Spring
10. Req Version Year: 2021
11. Graduation Semester: Fall
12. Graduation Year: 2021
13. Password: CatDog

**Flow of Events**: 
1. Click on Add Student button on GPD home screen
Enter valid information about the student
2. Click on add button
3. Student information is entered as a document in MongoDB

**Outcome**: Successfully add student to the database
