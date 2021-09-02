//arancar servidor, archivo principal

//requerir express
const express = require('express');

const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Initializations
const app = express();

//Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //Layout principal
    layoutsDir: path.join(app.get('views'), 'layouts'), //DIrectorio de Layouts
    partialsDir: path.join(app.get('views'), 'partials'), //DIrectorio de Layouts parciales
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares - funciones que se ejecutan antes de ser pasadas a las rutas
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secretapp',
    resave: true,
    saveUninitialized: true
}));

//Global variables

//Routes


//Static Files

//Server init
app.listen(app.get('port'), () => {
    console.log('Servidor esta escuchando en el puerto', app.get('port'));
});