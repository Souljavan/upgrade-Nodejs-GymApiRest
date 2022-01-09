const express = require('express')
const router = express.Router()
const Gimnasio = require('../model/gimnasio');
const authorize = require("../middlewares/auth");


router.route('/').get(authorize, (req, res, next) => {
    Gimnasio.find()
        .then((gimnasio) => {
            if (gimnasio=="") {
                return res.status(404).json('No se encontro ningun Gimnasio');
            }
            return res.json(gimnasio);
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/:id').get(authorize, (req, res, next) => {
    const id = req.params.id;
    Gimnasio.findById(id)
        .then(gimnasio => {
            if (!gimnasio) {
                return res.status(404).json('Gimnasio no encontrado');
            }
            return res.json(gimnasio)
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/').post(authorize, (req, res, next) => {

    const newGimnasio = new Gimnasio({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        imagen:req.body.imagen,
        instructores:req.body.FechaAlta|| [],
        clientes:req.body.Estado|| []
    });

    newGimnasio.save()
        .then(() => {
            return res.status(201).json(newGimnasio);
        }).catch((error) => {
            next(error);
        });

})

router.route('/:id').put(authorize, (req, res, next) => {

    const gimnasioid = req.params.id;
    const gimnasiomodificar = new Gimnasio(req.body);
    gimnasiomodificar._id = gimnasioid;
    Gimnasio.findByIdAndUpdate(gimnasioid, gimnasiomodificar, { new: true })
        .then(gymactualizado => {
            res.status(200).json(gymactualizado);
        })
        .catch(error => {
            next(error);
        });

})

//Añade instructores a gimnasios
router.route('/:id/instructores').put(authorize, (req, res, next) => {

    const gimnasioid = req.params.id;
    const instructorid = req.body.instructor_id;

    Gimnasio.findByIdAndUpdate(
        gimnasioid,
        { $push: { instructores: instructorid } },
        { new: true }
    )
        .then(gymactualizado => {
            res.status(200).json(gymactualizado)
        })
        .catch(error => {
            next(error);
        });

})


//Añade clientes a gimnasios
router.route('/:id/clientes').put(authorize, (req, res, next) => {

    const gimnasioid = req.params.id;
    const clienteid = req.body.cliente_id;

    Gimnasio.findByIdAndUpdate(
        gimnasioid,
        { $push: { clientes: clienteid } },
        { new: true }
    )
        .then(gymactualizado => {
            res.status(200).json(gymactualizado)
        })
        .catch(error => {
            next(error);
        });

})

router.route('/:id/').delete(authorize, (req, res, next) => {
    const gimnasioid = req.params.id;
    Gimnasio.findByIdAndDelete(gimnasioid)
        .then(() => {
            return res.status(200).json(`Gimnasio con id ${gimnasioid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});





module.exports = router;