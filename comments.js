// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

// Event bus endpoint
app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // Send event to posts service
  axios.post('http://localhost:4000/events', event);
  // Send event to comments service
  axios.post('http://localhost:4001/events', event);
  // Send event to query service
  axios.post('http://localhost:4002/events', event);
  // Send event to moderation service
  axios.post('http://localhost:4003/events', event);

  res.send({ status: 'OK' });
});

// Get all events
app.get('/events', (req, res) => {
  res.send(events);
});

// Start server
app.listen(4005, () => {
  console.log('Listening on 4005');
});