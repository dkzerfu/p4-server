const router = require('express').Router()
const Room = require('../models/dbRooms')

router.get("/sync", (req, res) => {
  Room.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})
router.post('/new', (req, res) => {
  const dbRooms = req.body
  console.log(dbRooms)
  Room.create(dbRooms, (err, data) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      console.log(data)
      res.status(200).json(data)
    }
  })
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const deleteRoom = await Room.findByIdAndDelete(req.params.id)
    res.json(deleteRoom)
  } catch (err) {
    console.log(err)
    res.json({
      msg: 'Unable to delete Room'
    })
  }
})

module.exports = router