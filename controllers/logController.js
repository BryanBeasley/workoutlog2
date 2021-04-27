const router = require('express').Router();
const LogBook = require('../models/log');
const validate = require('../middleware/validateSession');

router.get('/test', (req, res) => res.send('Logbook Controller Test'));

//***********************************
// CREATE NEW EXERCISE FOR LOGBOOK
//***********************************

router.post('/create', (req, res) => {
    LogBook.create({
        description: req.body.description,
        definition: req.body.definition, 
        result: req.body.result, 
        owner_id: req.body.owner_id
    })
    .then(logbook => res.status(200).json({ message:'I can use this to send a message once created', notebook: logbook }))
    .catch(err => res.status(500).json({ message: 'LogBook creation Failed', error: err }))
})

//***************************
// GET EXERCISE FOR LOGBOOK
//***************************

router.get('/book', (req, res) => {
    LogBook.findAll()
    .then(book => res.status(200).json({ message: `Found ${book.length} exercises logged.`, count: book.length, book }))
    .catch(err => res.status(500).json({ message: 'Not able to log Exercise!', err }))
})

// **************************
// UPDATE A LOG  
// **************************

//! TIMESTAMP 3:46 FOR EXPLANATION VIDEO 2

router.put('/update/:id', validate, (req, res) => {
    LogBook.update(req.body, { where: { id: req.params.id } })
    .then(updated => res.status(200).json({ message: `Successfully updated Exercise ${req.params.id}`, updated}))
    .catch(err => res.status(500).json({ message: 'Update failed', err }))
})

// ************************
// DELETE A LOG
// ************************

router.delete('/remove/:id', validate, (req, res) => {
    LogBook.destroy({ where: { id: req.params.id} })
    .then( removed => res.status(200).json({ message: `Successfully removed item ${req.params.id}`, removed}))
    .catch(err => res.status(500).json({ message: 'Removal of item failed', err }))
})


module.exports = router;