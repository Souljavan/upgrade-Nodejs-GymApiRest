const express = require('express')
const router = express.Router()
const clientes = require('../model/clientes');
const authorize = require("../middlewares/auth");


router.route('/').get(authorize, (req, res, next) => {
    clientes.find()
        .then((cliente) => {
            if (cliente=="") {
                return res.status(404).json('No se encontro ningun cliente');
            }
            return res.json(cliente);
        })
        .catch((error) => {
            next(error)
        })
});


router.route('/:id').get(authorize, (req, res, next) => {
    const id = req.params.id;
    clientes.findById(id)
        .then(cliente => {
            if (!cliente) {
                return res.status(404).json('Cliente no encontrado');
            }
            return res.json(cliente)
        })
        .catch((error) => {
            next(error)
        })
});

router.route('/').post(authorize, (req, res, next) => {

    const newCliente = new clientes({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        DNI: req.body.DNI,
        FechaAlta:req.body.FechaAlta,
        Estado:req.body.Estado
    });

    newCliente.save()
        .then(() => {
            return res.status(201).json(newCliente);
        }).catch((error) => {
            next(error);
        });

})

router.route('/:id').put(authorize, (req, res, next) => {

    const clientid = req.params.id;
    const clientemodificar = new clientes(req.body);
    clientemodificar._id = clientid;
    clientes.findByIdAndUpdate(clientid, clientemodificar, { new: true })
        .then(clienteactualizado => {
            res.status(200).json(clienteactualizado);
        })
        .catch(error => {
            next(error);
        });

})

router.route('/:id').delete(authorize, (req, res, next) => {
    const clienteid = req.params.id;
    clientes.findByIdAndDelete(clienteid)
        .then(() => {
            return res.status(200).json(`Cliente con id ${clienteid} eliminado`);
        })
        .catch(error => {
            next(error);
        });
});





module.exports = router;