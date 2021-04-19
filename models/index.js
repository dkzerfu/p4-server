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
  // useFindAndModify: false
})

const db = mongoose.connection

db.once("open", () => {
  console.log("DB connected")

  const roomCollection = db.collection("roomcontents")
  const roomchangeStream = roomCollection.watch()

  roomchangeStream.on("change", (change) => {

    if (change.operationType === 'insert') {
      const roomDetails = change.fullDocument
      pusher.trigger('rooms', 'inserted',
        {
          _id: roomDetails._id,
          name: roomDetails.name,
          messages: roomDetails.messages

        })


    } else if (change.operationType === 'update') {
      console.log(change)
      const roomDetails = change.updateDescription.updatedFields

      pusher.trigger('messages', 'inserted',
        {

          messages: roomDetails.messages

        })
      console.log("updating.....")
    } else {
      console.log('Error triggering pusher')
    }

  })

})