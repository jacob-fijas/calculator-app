const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')

const { getHistory, addCalculation } = require('./fakeDB')

// create app
const app = express()
app.use(bodyParser.json())

app.post('/api/history', function (req, res) {
  console.log('post', req)
  addCalculation(req.body.calculation)
  res.send(getHistory())
})

app.get('/api/history', function (req, res) {
  console.log('getter')
  res.send(getHistory())
})

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start server
app.listen(5000, () => console.log('server started on port 5000'))