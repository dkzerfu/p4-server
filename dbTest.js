const Message = require('./models/dbMessages')

async function createMessage(){
  const newMessage = await Message.create({
    message: "hello",
    name: "Dagm",
    timestamp: "demo",
    received: false
  })
  newMessage.save()
  console.log(newMessage)
}
createMessage()