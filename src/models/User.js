//Esquema para Usuario
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{type: String, required: true},
  email:{type: String, required: true},
  password: { type: String, required: true},
  date: {type: Date, default: Date.now}
});


// Cifrar contraseña con bcrypt
UserSchema.methods.encryptPassword = async (password) =>{
  // Generar un hash, aplicando el algoritmo 10 veces
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

//Hacer comparación de contraseña del esquema, con la contraseña que inserte el usuario
//Para loguear
UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);