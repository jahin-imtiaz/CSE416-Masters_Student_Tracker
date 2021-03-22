import { Database, MongoDBConnector, Model, DataTypes, Relationships } from 'https://deno.land/x/denodb/mod.ts';
import "https://deno.land/x/dotenv/load.ts";

const connector = new MongoDBConnector({
  uri: Deno.env.get('MongoURI'),
  database: 'MAST416',
});

const db = new Database(connector);

class Student extends Model {
  static table = 'students'
  static fields = {
    _id: {
      sbu_id: DataTypes.INTEGER,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    track: DataTypes.STRING,
    entry_year: DataTypes.STRING,
    entry_semester: DataTypes.STRING,
    reqId: Relationships.belongsTo(DegreeRequirement), //Many-to-one relation between student and DegreeRequirement
    graduation: DataTypes.STRING,
    course_plan: DataTypes.JSON,
    graduated: DataTypes.BOOLEAN,
    comments: DataTypes.JSON
  };

  // fetch the degreeRequirement object for this student
  static degreeRequirement() {
    return this.hasOne(DegreeRequirement);
  }
}

/**
 * Foreign Key for req_ver from Student /one-to-many relationship with Student
 */
class DegreeRequirement extends Model {
  static table = 'degreqs'
  static fields = {
    _id: DataTypes.INTEGER,
    requirements: DataTypes.JSON, 
    // Create abstract Requirement Class, and append subclass of requirements to this array
    // format of JSON: [GraduationRequirement, TimeRequirement, ...]
    // each Requirement subclass is an object
    // DON'T FORGET ANY REQUIREMENTS
    department: DataTypes.STRING,
    version: DataTypes.STRING,
  };

  // fetch all students that has this degree requirement
  static businesses() {
    return this.hasMany(Student);
  }
}
Relationships.oneToOne(Degree, Owner);

class Course extends Model {
  static table = 'courses'
  static fields = {
    _id: {
      primaryKey: true,
    },
    course_name: DataTypes.STRING,
    course_num: DataTypes.STRING,
    description: DataTypes.STRING,
    number_of_credit: DataTypes.INTEGER,
    prerequisites: DataTypes.JSON 
    // Create a json object that holds array of (course_names, course number) objects
    // Using Json because Many-to-Many is confusing for same data models
  }

  //Fetch all course offering objects for this course
  static courseOfferings() {
    return this.hasMany(CourseOffering);
  }
}


class CourseOffering extends Model {
  static table = 'offerings'
  static fields = {
    _id :{
      primaryKey: true
    },
    department : DataTypes.STRING,
    semester : DataTypes.STRING,
    year : DataTypes.STRING,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    courseID: Relationships.belongsTo(Course) //(one to Many) given a course, we can find its offered course semesters
  }

  // Fetch the course that is related to this courseOffering
  static course() {
    return this.hasOne(Course);
  }
}


db.link([DegreeRequirement, Course, CourseOffering, Student])
db.sync()