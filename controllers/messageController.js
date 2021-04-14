const router = require('express').Router()
const Message = require('../models/dbMessages')

router.get("/sync", (req, res) => {
  Message.find((err, data) => {
    if(err){
      res.status(500).send(err)
    }else {
      res.status(200).send(data)
    }
  })
})

// router.post('/new', async (req, res) => {
//   try{
//     const newMessage = await Message.create({
//       message: req.body.message,
//       name: req.body.name,
//       timestamp: req.body.timestamp,
//       received: req.body.received
//     })
//     newMessage.save()
//     res.json(newMessage)
//   }catch(err){
//     console.log(err)
//     res.status(400).json({msg: 'unable to create message'})
//   }
// })
router.post('/new', (req, res) => {
  const dbMessage = req.body

  Message.create(dbMessage, (err, data) => {
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).send(data)
    }
  })
})

module.exports = router