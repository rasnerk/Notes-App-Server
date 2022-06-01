const Note = require('../db/schemas/notes')

const createNote = (req,res) => {
    const { Title } = req.body;

    Note.findOne({Title: Title}, async doc => {
        try {
            const newNote = await Note.create(req.body)
            return newNote ? res.status(200).send(`${newNote.Title} created successfully!`) : res.status(417).send(`Failed to create note`)  
        } catch (error) {
            if(error) return res.status(417).send(error)
            if(doc) return res.send(`Note with the title: ${doc.Title} already exists`)
        }
    })

}

const deleteNote = (req,res) => {
    const { nid } = req.params;
    Note.findByIdAndDelete({_id: nid}, doc => {
        try {
            res.send(`${doc.Title} deleted successfully!`)
        } catch (error) {
            return res.send(error)
        }
    })
}

const getUsersNotes = async (req,res) => {
    const {uid} = req.params;
    const usersNotes = await Note.find({uid: uid});
    if (usersNotes === null || usersNotes === undefined) {
        return res.status(500).send('Cannot Find Users Notes')
    }
    res.status(200).send(usersNotes)
}

module.exports = { createNote, deleteNote, getUsersNotes }