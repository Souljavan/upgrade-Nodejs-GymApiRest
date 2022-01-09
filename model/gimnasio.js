const mongoose=require('mongoose');
const Schema = mongoose.Schema;

// Creamos el esquema de personajes
const GimnasioSchema = new Schema(
    {
      nombre: { type: String, required: true },
      direccion: { type: String, required: true },
      localidad: { type: String, required: true},
      imagen: { type: String, required: true},
      descripcion:{ type: String, required: true},
      instructores: [{ type: mongoose.Types.ObjectId, ref: 'instructores' }],
      clientes: [{ type: mongoose.Types.ObjectId, ref: 'clientes' }]
    },
    {
      timestamps: true,
    }
  );
  
  // Creamos y exportamos el modelo Movies
  const Gimnasio = mongoose.model('gimnasio', GimnasioSchema);
  module.exports = Gimnasio;