const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class MeController {

  //GET /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).sortTable(req),
      Course.countDocumentsDeleted()]
    )
      .then(([courses, deleteCount]) => 
        res.render('me/stored-courses', {
          deleteCount,
          courses: mutipleMongooseToObject(courses)
      }))
      .catch(next);
  }

  //GET /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
    .then(courses => res.render('me/trash-courses', {
      courses: mutipleMongooseToObject(courses)
    }))
    .catch(next);
  }
}

module.exports = new MeController();
