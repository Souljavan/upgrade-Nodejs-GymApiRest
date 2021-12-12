const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const ClientesSchema = new Schema(
    {
      nombre: { type: String, required: true },
      apellidos: { type: String, required: true },
      DNI: { type: String, required: true},
      FechaAlta: { type: String, required: true},
      Estado: { type: String, required: true}
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const clientes = mongoose.model('Clientes', ClientesSchema);
  module.exports = clientes;