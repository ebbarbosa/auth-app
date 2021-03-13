const router = require('express').Router();

router.post('/register', (req, res)=> {
    res.send('user registered')
});

router.post('/login', (req, res)=> {
    res.send('user logged in')
});

module.exports = router;