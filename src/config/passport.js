const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
  usernameField: 'email',

}, async (email, password, callback)=>{
  //Revisar si esta en la bd
  const user = await User.findOne({email: email});
  if(!user){
    //Si el correo no existe:
                    // error - usuario - mensaje
    return callback(null, false, {message: 'Usuario no encontrado'});
  } else {
    //Si el correo existe
    //Hay que validar la contraseña
    //ese user pertenece a la const user de arriba dentro de la funcion
    const match = await user.matchPassword(password);
    if(match){
                    // error - usuario - mensaje
      return callback(null, user)
    } else {
      return callback(null, false, {message: "Contraseña Incorrecta"});
    }
  }
}));

//Almacenar el usuario en sesion cuando se logueé, con su id
passport.serializeUser((user, callback) => {
          //retornar, no error y  el user id
          //console.log(user)
  callback(null, user.id);
});

// Toma un id y genera un callback
passport.deserializeUser((id, callback) => {
  // Buscar usuario por id
  User.findById(id, (err, user) => {
    //console.log(user);
    callback(err, user);
  });
});