const mongoose = require('mongoose')
const Pusher = require('pusher')
require('./dbMessages')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/whatsapp'

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useUnifiedTopology: false
})

const db = mongoose.connection

db.once('open', () => {
    console.log(`mongoDB connection @ ${db.host}:${db.port}`)


    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();
    
    changeStream.on('change', (change) => {
      console.log("A CHANGE OCCURRED", change)

      if(change.operationType === 'insert'){
        const messageDetails = change.fullDocument
        Pusher.trigger('messages', 'inserted', 
        {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received
        })
      }
    });
    
})

db.on('error', () => {
    console.error(`someting has gone wrong with the DB \n ${err}`)
})