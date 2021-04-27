const User = require('../models/user');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/test', (req, res) => {
    res.send('Success: Testing the user Controller');
});

router.post('/register', (req, res) => {
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName 
    })
    .then(user => {
        let token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1d' })
        res.send({ user, token })
    })
    .catch(error => res.status(500).send({
        message: 'Failed to create user',
        error: error.errors[0].message
    }))
})
// ! TIMESTAMP 3:30 (explanation video 1)
router.post('/login', (req, res) => {
    User.findOne({
        where: {
        username: req.body.username
     } 
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function( err, matches){
                matches ? generateToken(user) : res.send('Incorrect Password')
            })

        function generateToken(user) {
            let token = jwt.sign({ id: user.id, }, process.env.SECRET, { expiresIn: '1d' });
            res.send({user, token})
        }
        } else {
            res.send('No user found in the Database');
        }
    })
})

module.exports = router;