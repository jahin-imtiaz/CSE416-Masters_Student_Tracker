import { Database, MongoDBConnector, Model, DataTypes, Relationships } from 'https://deno.land/x/denodb/mod.ts';

const connector = new MongoDBConnector({
  uri: 'mongodb://127.0.0.1:27017',
  database: 'test',
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
    reqId: Relationships.belongsTo(DegreeRequirement),
    graduation: DataTypes.STRING,
    course_plan: DataTypes.JSON,
    graduated: DataTypes.BOOLEAN,
    comments: DataTypes.JSON
  };
}

/**
 * Foreign Key for req_ver from Student / One-to-one relationship with Student
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
  }

}

class Course extends Model {
  static table = 'courses'
}

class CourseOffering extends Model {
  static table = 'offerings'
}


db.link([DegreeRequirement, Course, CourseOffering, Student])
db.sync()