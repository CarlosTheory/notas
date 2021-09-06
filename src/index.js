//arancar servidor, archivo principal

//requerir express
const express = require('express');

const path = require('path');
const exphbs = require('express-handlebars');
// Añadi @handlebars/allow-prototype-access para poder usar las propiedades de res.locals.user
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// ______
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initializations
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main', //Layout principal
    layoutsDir: path.join(app.get('views'), 'layouts'), //DIrectorio de Layouts
    partialsDir: path.join(app.get('views'), 'partials'), //DIrectorio de Layouts parciales
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server init
app.listen(app.get('port'), () => {
    console.log('Servidor esta escuchando en el puerto', app.get('port'));
});