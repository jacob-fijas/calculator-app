const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const http = require('http')

const { getHistory, addCalculation } = require('./fakeDB')

// create app
const app = express()
app.use(bodyParser.json())

app.post('/api/history', function (req, res) {
  addCalculation(req.body.calculation)
  // send updated history to all clients
  io.sockets.emit('message', getHistory())
  res.send('success')
})

app.get('/api/history', function (req, res) {
  res.send(getHistory())
})

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"))
})

// start server and websocket
const server = http.createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`server started on port ${PORT}`))