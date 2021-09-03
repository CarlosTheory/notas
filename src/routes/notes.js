const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('Notas desde bd');
});

module.exports = router;