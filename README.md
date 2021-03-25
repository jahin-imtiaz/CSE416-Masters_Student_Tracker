# CSE416-Masters_Student_Tracker

A web system to keep track of the masters student at Stony Brook University, where graduate M.S. students will be able to keep track of their degree requirements and course plan. Graduate program directors will be able to look up student data and modify them accordingly.

## HW6

## 1. Persistence

### 1.1 Data model

For information stored in document-oriented (NoSQL) databases with manually designed schema, this section should describe the document structure and any primary and secondary indices.

For information stored in databases using a persistence framework, this section should provide all of the information needed to configure the persistence framework to map persistent entities, attributes, and relationships to the database, with appropriate primary keys. The exact format of this information depends on the persistence framework. If this information is present in your submitted code, it is sufficient to identify which files contain it.

For information stored in files, this section should specify the schema or format.

This information should be provided for all persistent entities in the design, even if you have not yet implemented persistence for some of those entities.

### 1.2 Queries

Briefly describe how filtering (in the search for students) is or will be implemented. Will it be done by creating a database query that embodies all of the specified filter conditions? By a combination of a database query and application code? If a query language is used, which one?

## 2. Code Conventions

Describe the code conventions followed in your implementation. The conventions should cover naming (of fields, methods, classes, packages, etc.) and formatting (indentation, comment style, etc.). If you follow existing code conventions, such as one of the following, you can simply give the name and URL. It's a good idea to use a style checker, if available.#

JavaScript Standard Style: https://standardjs.com/rules-en.html
We use ESLint with Standard Style plugin as a style checker and Prettier to maintain consistent formatting

## 3. Implementation Status Report

SEE [IMPLEMENTATION GRADING SHEET](implementation-grading-sheet-SADGE_GOOMBAS.xlsx)

SEE [IMPLEMENTATION STATUS](implementation-status-SADGE_GOOMBAS.md)

This consists of two files.

a filled-out copy of the implementation grading sheet (fill the "claimed points" column) in xlsx format (so the TAs can fill the "actual points" column and enter grading comments) and in a file named implementation-grading-sheet-TEAM_NAME.xlsx. It should show your system's current score, as a way of indicating which requirements are satisfied or partially satisfied. This score also serves as a progress estimate.
a report, in a file named implementation-status-TEAM_NAME.\* (extension may be pdf, docx, etc.) describing which classes and components in the design documents are implemented, and providing details about the status of partially-implemented functionality.
The implementation should be 25% or more complete when this assignment is submitted. In other words, the code in your hw6-code1 submission should contain enough functionality to achieve a score of 25 points or more on the implementation grading sheet.

If you claim more than 3 pts (avg) for ease of use, you must include comments on the IGS (put them in any blank cell) justifying it by listing specific aspects or features that make your system above average in this respect.

You can claim partial credit for functionality that is partially implemented. You must indicate in the report (or on the IGS) which aspects of the functionality work (or which aspects don't work). To claim partial credit for functionality not yet connected to the GUI, run it in an IDE or shell (make sure the font is legible in the video). Note that the points for the GUI for each functionality are included in the points for that functionality.

## 4. Installation Manual

SEE [INSTALLATION MANUAL](installation-manual.md)

An installation manual, in a file named installation-manual.\*, containing instructions for installing, configuring, and starting the server side of the system. This includes instructions for downloading necessary libraries, and installing, configuring, and starting the database and web server, if appropriate. Step-by-step textual instructions are fine; click-by-click instructions with illustrative screenshots are unnecessary. The manual does not need to describe how to use the system; that should be self-evident from the user-friendly GUI.

## 5. Test Report

SEE [TEST REPORT](test-report.md)

A test report, in a file named test-report.\*, describing the testing you have done. This may include unit tests, integration tests, and system tests. The reported test cases should cover all functionality for which points are claimed in the implementation status report.

The test report is mainly an organized list of test cases. The description of each test case typically includes:

Name of test case
Brief description, indicating the requirements, features, or use cases being tested.
Precondition, if any. The test case should execute successfully from any state satisfying the precondition. For example, a typical precondition is that a user with a specified role is logged in, or that the database contains specified records.
Flow of Events: a numbered list of steps, describing the inputs to the system and the expected actions by the system.
Outcome: whether the system passed or failed the test; in case of failure, give a brief description of the system's observed behavior, and explain the source of the problem, if possible.
Collections of similar test cases should be described together in a concise way, to avoid unnecessary repetition.

Note: The instructor will create a test suite for use during the demo. It will not be released in advance, because one of the course goals is for you to gain experience in designing effective test suites. Releasing the demo test suite in advance would greatly reduce your incentive for doing that. Another perspective is that the demo is like the final exam, and final exam questions are usually not released in advance.

## 6. Contributions

A list of each team member's contributions to hw5 and hw6, including main activities and work products. Additional guidance appears in the teamwork policy on the course web page.

- Taner: video, writing markdown files, implementing models and routes, installation manual
- Jahin: import files, import functionality frontend, implementing data models
- William: frontend components, styling, requirements JSON, setting up and writing homework documents, test report, data model and queries
- Nur: implementing data models

## 7. Code and Data

SEE "import files" FOLDER

Code and data (files containing degree requirements, data files used in test cases, etc.) for the current version of the system. Do not include large libraries in your electronic submission. Instead, include in the installation user manual a list of the necessary libraries (with the version number that you used) and how to install them (e.g., package manager commands, or URLs where the libraries can be downloaded and which folders to save them in).

data files containing degree requirements should be named degree-requirements-AMS._, degree-requirements-BMI._, etc. (this way we can easily find them by searching for them). [added 2021-02-21]

## 8. Requirements

Current version of the requirements document.

Version: 2021-03-17

## 9. Design

Current version of the design documents.

Version: 2021-03-09

## 10. Video

A screen recording with narration showing your system exhibiting all functionality for which points are claimed in the implementation status report. Plan exactly what you will do, and rehearse it, before making the recording, so the video is succinct and reasonably polished. When demonstrating a feature or part of a feature, state explicitly in the narration what you are demonstrating; for example, "Now I'll demonstrate the 'sorting' part of '5.8 browse/search for students'". Some data can be entered in the database before the recording begins.

The course home page contains suggestions for screen recording software. [2021-02-19 added the following] Please adjust the settings to obtain reasonable-sized video files. For example, a Zoom recording of my 1920x1080 laptop screen and audio has a bitrate of 1180 kbps.

The video does not need to show every test case described in the test report. For example, test cases demonstrating that the system rejects various kinds of invalid input do not need to be shown in the video.
