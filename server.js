// importing
const express = require('express')
const rowdy = require('rowdy-logger')
const cors = require('cors')
const Messages = require('./models/dbMessages')
const Pusher = require("pusher");
require('dotenv').config()
require('./models')

// app config
const app = express()
const PORT = process.env.PORT || 8000
const rowdyResults = rowdy.begin(app)


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// API

// api routes
app.get("/", (req, res) => {
  res.status(200).send("hello World")
})

app.use('/api/messages', require('./controllers/messageController'))

// listen
app.listen(PORT, () => {
  rowdyResults.print()
  console.log(`Listening on localhost: ${PORT}`)
})