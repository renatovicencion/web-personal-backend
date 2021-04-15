const Course = require('../models/course');

function addCourse(req, res) {
    const body = req.body;
    const course = new Course(body);

    course.order = 1000;

    course.save((err, courseStored) => {
        if (err) {
            if (!req.body.idCourse) {
                res.status(404).send({ code: 404, message: "El id del curso es un campo obligatorio." });
            } else {
                res.status(400).send({ code: 400, message: "El curso ya existe." });
            }
        } else {
            if (!courseStored) {
                res.status(400).send({ code: 400, message: "No se ha podido crear el curso." });
            } else {
                res.status(200).send({ code: 200, message: "Curso creado con éxito." });
            }
        }
    });

}

function getCourses(req, res) {
    Course.find()
        .sort({ order: "asc" })
        .exec((err, courses) => {
            if (err) {
                res.status(500).send({ code: 500, message: "Error del servidor." })
            } else {
                if (!courses) {
                    res.status(404).send({ code: 404, message: "No se ha encontrado ningún curso." })
                } else {
                    res.status(200).send({ code: 200, courses: courses });
                }
            }
        })
}

function deleteCourse(req, res) {
    const { id } = req.params;

    Course.findByIdAndRemove(id, (err, courseDeleted) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!courseDeleted) {
                res.status(404).send({ code: 404, message: "No se ha encontrado el curso." });
            } else {
                res.status(200).send({ code: 200, message: "El curso se ha eliminado con éxito." });
            }
        }
    });
}

function updateCourse(req, res) {
    let courseData = req.body;

    const { id } = req.params;

    Course.findByIdAndUpdate(id, courseData, (err, courseUpdate) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!courseUpdate) {
                res.status(404).send({ code: 404, message: "No se ha encontrado ningún curso." });
            } else {
                res.status(200).send({ code: 200, message: "Curso actualizado con éxito." });
            }
        }
    });
}

module.exports = {
    addCourse,
    getCourses,
    deleteCourse,
    updateCourse
}