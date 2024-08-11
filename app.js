const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./src/api/routes/routes')
const { sequelize, models } = require('./src/db/connection')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => res.send('App is working'))
app.get('/db/force', (req, res) => {
  sequelize
    .sync({ force: true })
    .then((result) => {
      return res.status(200).send('Completed!')
    })
    .catch((e) => {
      return res.status(500).send(e)
    })
})
app.get('/db/alter', (req, res) => {
  sequelize
    .sync({ alter: true })
    .then(() => res.send('Completed!'))
    .catch((e) => {
      res.send(e)
    })
})
app.use('/api', routes)

const server = app.listen(port, () =>
  console.log(`API listening on port ${port}!`)
)

const socketIO = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

let users = []

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected`)

  socket.on('message', (data) => {
    //console.log(data);
    socketIO.emit('messageResponse', data)
  })

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data)
  })

  socket.on('newUser', (data) => {
    users.push(data)
    socketIO.emit('newUserResponse', users)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected')
    users = users.filter((user) => user.socketID !== socket.id)
    socketIO.emit('newUserResponse', users)
    socket.disconnect()
  })
})

module.exports = {
  app,
}
