const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const InstructorSchema = new Schema(
    {
      nombre: { type: String, required: true },
      apellidos: { type: String, required: true },
      Clase: { type: String, required: true},
      FechaAlta: { type: String, required: true},
      Estado: { type: String, required: true},
      Salario: { type: Number}
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const instructores = mongoose.model('Instructores', InstructorSchema);
  module.exports = instructores;