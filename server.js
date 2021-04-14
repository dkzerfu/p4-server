const express = require('express')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors())

io.on('connection', socket => {
    const userName = socket.handshake.query.userName
    console.log(userName, 'has connected!')

    socket.on('disconnect', () => {
        console.log(userName, 'has disconnected')
    })

    socket.on('chat message', msg => {
        // send the message to all the other connected clients
        console.log(`${userName} says: ${msg.content}`)
        io.emit('chat message', msg)
    })
})


const PORT = process.env.PORT || 3030
http.listen(PORT, () => {
    console.log('listening on port', PORT)
})