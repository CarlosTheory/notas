const router = require('express').Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: "/notes",
    failureRedirect: '/users/signin',
    failureFlash: true
}));


// ----------------

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

//Ruta recibir sign up
router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    // console.log(req.body);

    if(name.length < 1){
        errors.push({text:'El nombre es requerido, no puede estar vacio.'});
    }

    if(email.length < 1){
        errors.push({text:'El correo es requerido, no puede estar vacio.'});
    }

    if(password.length < 1){
        errors.push({text:'La contraseña es requerida, no puede estar vacio.'});
    }

    if(password != confirm_password){
        errors.push({text:'Las contraseñas no coinciden.'});
    }
    if(password.length < 4){
        errors.push({text:'La contraseña debe ser mayor a 4 caracteres.'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password});
    } else {
        const emailUser = await User.findOne({email: email});

        if(emailUser) {
            req.flash('error_msg', 'El email ya esta registrado.');
            res.redirect('/users/signup');
        } else {
            const nuevoUsuario = new User({name, email, password});
            nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
            await nuevoUsuario.save();
            req.flash('success_msg', 'Registrado correctamente.');
            res.redirect('/users/signin');
        }
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;