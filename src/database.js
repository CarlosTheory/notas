//conexion a bd
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/notes-app', {
    useNewUrlParser: true,
})
    .then(db => console.log('Base de Datos conectada'))
    .catch(err => console.error(err));

