const router = require('express').Router()
const Message = require('../models/dbMessages')
const Room = require('../models/dbRooms')

router.get("/sync", (req, res) => {
  Message.find((err, data) => {
    if(err){
      res.status(500).send(err)
    }else {
      res.status(200).send(data)
    }
  })
})
// router.post('/new', (req, res) => {
//   const dbMessage = req.body
//   const room = dbMessage.id  
//   console.log(room)
//   console.log(dbMessage)
//   // Message.create(dbMessage, (err, data) => {
//     Room.findByIdAndUpdate(room, {
//       $addToSet: {messages: {
//         message: dbMessage.message,
//         name: dbMessage.name,
//         timestamp: dbMessage.timestamp,
//         received: dbMessage.received
//       }}
//     })
//     if(err){
//       console.log(err)
//       res.status(500).send(err)
//     }else{
//       res.status(200).send(data)
//     }
//   })
// })


router.post('/new', async (req, res) => {
  const dbMessage = req.body
  const room = dbMessage.id  
  console.log(room)
  console.log(dbMessage)
  const filter = {id: room}
  const update = {messages: {
    message: dbMessage.message,
    name: dbMessage.name,
    timestamp: dbMessage.timestamp,
    received: dbMessage.received
  }}
  try{
    const newMessage = await Room.findByIdAndUpdate(room, { 
      $addToSet: update,
    }, { new: true})
    res.json(newMessage)
  }catch(err){
    console.log(err)
    res.status(400).json({msg: 'unable to create message'})
  }
})
module.exports = router