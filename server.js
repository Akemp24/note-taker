// write down required 
const express = require('express');
const path = require('path');
const fs = require('fs');

// create instance of express
const app = express();

// Set up middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define routes to handle requests and for the server
// create html route for index.html and notes.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// create api route to get all notes from data from db.json and return as JSON
app.get('/api/notes', retrieveNotes);
app.get('/api/notes', saveNewNote);

function retrieveNotes(req, res) {
    const dbFilePath = path.join(__dirname, 'db.json');
    const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    res.json(notes);
};

function saveNewNote(req, res) {
    const dbFilePath = path.join(__dirname, 'db.json');
    const notes = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    const newNote = req.body;
    newNote.id = generateUniqueId();
    notes.push(newNote);
    fs.writeFileSync(dbFilePath, JSON.stringify(notes));
    res.json(newNote);
};
// create api to save a new note
// connect back end to front end
const handleNoteSave = () => {
    const newNote = {
        title: noteTitle.value,
        text: noteText.value,
    };
    saveNote(newNote).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    })
    .catch((error) => {
        console.error('Error saving note:', error);
    });
};

const handleNoteDelete = (e) => {
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
        activeNote = {};
    }

    deleteNote(noteId).then(() => {
        getAndRenderNotes();
        renderActiveNote();
    })
    .catch((error) => {
        console.error('Error deleting note:', error);
    });
};

