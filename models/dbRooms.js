const mongoose = require ('mongoose')

const roomsSchema = mongoose.Schema({
  
  name: {
    type:String
  }
})

const Room = mongoose.model('roomcontents', roomsSchema)
module.exports = Room