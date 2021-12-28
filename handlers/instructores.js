const express = require('express')
const router = express.Router()
const instructores = require('../model/instructores');
const authorize = require("../middlewares/auth");


router.route('/').get(authorize, (req, res, next) => {
    instructores.find()
        .then((instructor) => {
            if (instructor=="") {
                return res.status(404).json('No se encontro ningun instructor');
            }
            return res.json(instructor);
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/:id').get(authorize, (req, res, next) => {
    const id = req.params.id;
    instructores.findById(id)
        .then(instructor => {
            if (!instructor) {
                return res.status(404).json('Instructor no encontrado');
            }
            return res.json(instructor)
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/').post(authorize, (req, res, next) => {

    const newinstructor = new instructores({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        Clase: req.body.Clase,
        FechaAlta:req.body.FechaAlta,
        Estado:req.body.Estado,
        Salario:req.body.Salario
    });

    newinstructor.save()
        .then(() => {
            return res.status(201).json(newinstructor);
        }).catch((error) => {
            next(error);
        });

})

router.route('/:id').put(authorize, (req, res, next) => {

    const instructorid = req.params.id;
    const instructormodificar = new instructores(req.body);
    instructormodificar._id = instructorid;
    instructores.findByIdAndUpdate(instructorid, instructormodificar, { new: true })
        .then(instructoractualizado => {
            res.status(200).json(instructoractualizado);
        })
        .catch(error => {
            next(error);
        });

})

router.route('/:id').delete(authorize, (req, res, next) => {
    const instructorid = req.params.id;
    instructores.findByIdAndDelete(instructorid)
        .then(() => {
            return res.status(200).json(`Instructor con id ${instructorid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});





module.exports = router;