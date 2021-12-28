const express = require('express')
var server = express();

require('./db/db');

server.use(express.json())

server.use('/gimnasio', require('./handlers/gimnasio').router);
server.use('/instructores', require('./handlers/instructores').router);
server.use('/clientes', require('./handlers/clientes').router);


server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
  });
  
  server.use((err, req, res, next) => {
    console.error('[ERROR] Ha ocurrido un error', err.status, err.message);
  return res.status(err.status || 500).json(err.message || 'Ha ocurrido un error en el servidor');
  });
  
  
  server.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor arrancado`);
    });