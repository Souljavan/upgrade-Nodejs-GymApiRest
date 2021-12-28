const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

// Conexion base de datos
require('./db/db');



const user = require('./handlers/user')
const gimnasio = require('./handlers/gimnasio')
const instructores = require('./handlers/instructores')
const clientes = require('./handlers/clientes')

//configuracion Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


//Rutas
app.use('/api', user)
app.use('/gimnasio', gimnasio)
app.use('/instructores', instructores)
app.use('/clientes', clientes)



  
app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor arrancado`);
    });


// Express error handling
app.use((req, res, next) => {
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});