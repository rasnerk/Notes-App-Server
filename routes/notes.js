const router = require('express').Router();

const notesController = require('../controllers/notes');

router.get('/:uid', notesController.getUsersNotes)
router.post('/create', notesController.createNote)
router.delete('/delete', notesController.deleteNote)
router.patch('/update', notesController.updateNote)

module.exports = router;