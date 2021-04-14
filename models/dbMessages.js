const mongoose = require ('mongoose')

const messagesSchema = mongoose.Schema({
  message: {
    type:String
  },
  name: {
    type:String
  },
  timestamp: {
    type:String
  },
  received: {
    type:Boolean
  } 
})

const Message = mongoose.model('messagecontents', messagesSchema)
module.exports = Message