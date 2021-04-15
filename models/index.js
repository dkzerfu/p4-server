const mongoose = require('mongoose')
const Pusher = require("pusher");

require('./dbMessages')
require('./dbRooms')

const pusher = new Pusher({
  appId: process.env.appId, 
  key: process.env.key, 
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: true
});

const connection_url = process.env.ATLAS_URI

mongoose.connect(connection_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
  })

  const db = mongoose.connection

  db.once("open", () => {
    console.log("DB connected")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change) => {

      if(change.operationType === 'insert'){
        const messageDetails = change.fullDocument
        pusher.trigger('messages', 'inserted', 
        {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received
        })
      }else{
        console.log('Error triggering pusher')
      }

  })
    const roomCollection = db.collection("roomcontents")
    const roomchangeStream = roomCollection.watch()

    roomchangeStream.on("change", (change) => {

      if(change.operationType === 'insert'){
        const roomDetails = change.fullDocument
        pusher.trigger('rooms', 'inserted', 
        {
          name: roomDetails.name,
        })
      }else{
        console.log('Error triggering pusher')
      }

  })
})