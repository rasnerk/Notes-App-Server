const router = require('express').Router();

const notesController = require('../controllers/notes');

router.get('/:uid', notesController.getUsersNotes)
router.post('/create', notesController.createNote)
router.delete('/delete/:nid', notesController.deleteNote)

module.exports = router;