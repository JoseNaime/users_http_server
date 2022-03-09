const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);
const cors = require('cors');

// allow cross-origin resource sharing (CORS)
app.use(cors());

// init db
db.defaults({ users: [] }).write();

app.use(express.static('public'));

// data parser - boydparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// post print test
app.post('/print', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

// add user (name, dob, email, username, password, phone, street, city, state, zip, latitude, longitude, avatar)
app.post('/add', (req, res) => {
  const user = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    avatar: req.body.avatar,
  };
  db.get('users')
    .push(user)
    .write();
  console.log(db.get('users').value());
  res.send(db.get('users').value());
})

// return all users
app.get('/data', (req, res) => {
  res.json(db.get('users').value());
});

// start server
app.listen(process.env.PORT, () => {
  console.log('Server started on port ' + process.env.PORT);
});