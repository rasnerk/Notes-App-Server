const Note = require('../db/schemas/notes')

const createNote = (req,res) => {
    const { Title, Body, type, uid } = req.body;

    Note.findOne({Title: Title}, async function (err,doc) {
        if (err) return res.send(err)
        if (doc) return res.send(`Note with the title: ${doc.Title} already exists`)

        const newNote = await Note.create({Title: Title, Body: Body, type: type, uid: uid})
        return newNote ? res.send(`${newNote.Title} created successfully!`) : res.send(`Failed to create note`)
    })

}

const deleteNote = (req,res) => {
    const { nid } = req.body;
    Note.findByIdAndDelete({_id: nid}, (err,doc) => {
        if (err) return res.send(err)
        res.send(`${doc.Title} deleted successfully!`)
    })
}

const updateNote = (req,res) => {
    Note.findByIdAndUpdate({_id: nid}, (err,doc) => {

    })
}

const getUsersNotes = (req,res) => {
    const {uid} = req.params;
    Note.find({uid: uid}, (err,docs) => {
        if (err) return res.send(err)
        res.send(docs)
    })
}

module.exports = { createNote, deleteNote, updateNote, getUsersNotes }