const fs = require('fs')
const express = require('express');
const path = require('path');
const uniqid = require('uniqid');
const notes = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  return res.json(notes)
});

app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a review`);
  const request = req.body
  request.id = uniqid()
  notes.push(request)
  console.log(notes)
  fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) {
      throw err
    }
    res.json(request)
  }
  )
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);