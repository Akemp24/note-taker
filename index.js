// write down required 
const express = require('express');
const path = require('path');

// create instance of express
const app = express();

// Set up middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define routes to handle requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});
// create html route for index.html

// create html route for notes.html

// create api route to get all notes from data from db.json and return as JSON

// create api to save a new note

// connect back end to front end