const router = require('express').Router();

// Al tomar este modelo de dato puedo crear borrar actualizar etc
const { discriminators } = require('../models/Note');
const Note = require('../models/Note');

// /notes/add es la ruta
router.get('/notes/add', (req, res) => {
    res.render('notes/add');
});

// CREAR NOTA /notes/new-note ruta del metodo post
router.post('/notes/new-note', async (req, res) => {

    // Destructuring -> sacar cada propiedad por separado a traves de un objeto
    const { title, description } = req.body;
    //Validar
    const errors = [];
    if(!title){
        errors.push({text:'Inserte un titulo'}); 
    }
    if(!description){
       errors.push({text:'Debe agregar una descripción'}); 
    }

    // Si hay algun error, se van a volver a mostrar los campos que inserto, mas el error o los errores
    if(errors.length > 0){
        res.render('notes/add', {
            errors,
            title,
            description
        });
    } else {
        const notaNueva = new Note({title, description});
        await notaNueva.save();
        //mensaje de nota agredada satisfactoriamente
        req.flash('success_msg', 'Nota agregada satisfactoriamente.');
        res.redirect('/notes');
    }
});

//OBTENER NOTAS
router.get('/notes', async (req, res) => {
    //Consultar bd
    //En el curso solo se usa:
    //const notes = await Note.find() - pero no funciona sin el .lean();
    const notes = await Note.find().sort({date:'desc'}).lean();
    res.render('notes/all', {notes});
});

// Pasar el id de la nota a editar
router.get('/notes/edit/:id', async (req, res) => {
    //obtener la nota desde la bd
    const note = await Note.findById(req.params.id).lean();
    //console.log("Nota recibida:", note)
    res.render('notes/edit', {note});
});

//EDITAR NOTA
router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    //actualizar datos
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Actualizada correctamente.')
    res.redirect('/notes');
});

//Eliminar-Delete
router.delete('/notes/delete/:id', async (req, res) => {
    //console.log(req.params.id);
    console.log('nota', req.params.id, 'borrada');
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada correctamente.');
    res.redirect('/notes');
});

module.exports = router;