# CSE416-Masters_Student_Tracker

A web system to keep track of the masters student at Stony Brook University, where graduate M.S. students will be able to keep track of their degree requirements and course plan. Graduate program directors will be able to look up student data and modify them accordingly.

## HW7

## 1. Concurrency

### 1.1 Synchronization for database accesses

MongoDB utilizes a locking mechanism, multi-granularity locking, to prevent multiple clients from modifying the same piece of data simultaneously. Multi-granularity locking allows operations to lock at the global, database, or collection level. MongoDB also uses reader-writer locks that allows concurrent readers shared access to a resource. MongoDB is writer-greedy in that it gives priority to write, so when we get a write request is performed, all the read requests are blocked until the write is completed.

For example, if a student and GPD concurrently edit the student's course plan, MongoDB employs its multi-granularity locking mechanism so that it prevents writes while another write operation is being performed elsewhere in the database. After one of them finishes, the lock is released and the other will perform its write.

Another example is if the GPD imports various kinds of data while a student is performing a suggest course plan. MongoDB uses its writer-greedy readers-writers lock so that when the GPD updates data in the database, then the student will see the data updates from the suggest course plan since writes will be done before any reads. 

### 1.2 Synchronization for any server-side in-memory data structures shared by sessions of concurrent users

Any server-side in-memory data structures fetched from the MongoDB database or manipulated on the server are secured through coding patterns using the Mongoose (our ORM) models and schemas we display in the Persistence section of this readme. When finding or updating a data structure with data from MongoDB, we may use `Model.findOne()` and `Model.findOneAndUpdate()`, respectively. Both of these operations are atomic and may only operate within the limitations set within our schemas. These operations return an ES6 Promise object, in which synchronization is handled through the `async/await` javascript syntax when processing on the data needs to be done.

In our server, you will see that instead of processing the data structures after fetching, we make use of projections while finding/updating so that it may be tightly coupled with the processing itself, making the entire operation atomic. The final result is then set to a `const` variable which we may return through our API. While concurrent find/update operations are taking place, MongoDB's locking mechanism is used when accessing the database, this has been more thoroughly described in section #1.1.

## 2. Implementation Status Report

SEE [IMPLEMENTATION GRADING SHEET](implementation-grading-sheet-SADGE_GOOMBAS.xlsx)

SEE [IMPLEMENTATION STATUS](implementation-status-SADGE_GOOMBAS.md)

## 3. Installation Manual

SEE [INSTALLATION MANUAL](installation-manual.md)

## 4. Test Report

SEE [TEST REPORT](test-report.md)

## 5. Contributions

- Taner: View/Edit Student Info functionalties + UI
- Jahin: Suggest Course Plan functionalties + UI
- William: Browse/Search Student functionalties + UI
- Nur: Enrollment Trend + Add Course functionalties + UI

## 6. Code and Data

SEE "import files" FOLDER FOR DATA FILES

## 7. Requirements

Version: 2021-04-08

## 8. Design

Version: 2021-03-09

## 9. Video

Video is attached with the BB submission.
