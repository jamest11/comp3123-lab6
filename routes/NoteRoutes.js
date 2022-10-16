const express = require("express")
const noteModel = require('../models/NotesModel.js')

const routes = express.Router()

// get all notes
routes.get('/notes', async (req, res) => {
    try{ 
        const notes = await noteModel.find()
        res.status(200).send(notes)
    } catch(err) {
        res.status(500).send(err)
    }
})

// add new note
routes.post('/notes', async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    try {
        const note = new noteModel(req.body)
        await note.save()
        res.status(200).send(note)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// view note by ID
routes.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findById(req.params.noteId)
        res.status(200).send(note)
    } catch (err) {
        res.status(500).send(err)
    }
})

// update note by ID
routes.put('/notes/:noteId', async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    try {
        req.body.dateUpdated = Date.now()
        let note = await noteModel.findByIdAndUpdate(req.params.noteId, req.body)
        note = await noteModel.findById(req.params.noteId)
        res.status(200).send(note)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

// delete note by ID
routes.delete('/notes/:noteId', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId)
    
        if (!note) res.status(500).send("No item found")

        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = routes