const mongoose = require('mongoose')

const messagesSchema = mongoose.Schema({
  message: {
    type: String
  },
  name: {
    type: String
  },
  timestamp: {
    type: String
  },
  received: {
    type: Boolean
  }
})

const roomsSchema = mongoose.Schema({

  name: {
    type: String
  },
  messages: [messagesSchema]
})

const Room = mongoose.model('roomcontents', roomsSchema)
module.exports = Room