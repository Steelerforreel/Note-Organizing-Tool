const fs = require('fs')
const express = require('express');
const path = require('path');
const api = require('./public/index.html');
const uniqid = require('uniqid');
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
  return res.json(notes)
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a review`);

  let response;

  if (req.body) {
    response = {
        status: 'success',
        data: req.body,
};
    res.json(`Note for ${response.data} has been added!`);
} else {
    res.json('Request body must contain something.');
}
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);