const { QueryTypes } = require('sequelize')
const { models, sequelize } = require('../../db/connection')
const messages = require('../../db/models/messages')
const {
  get_message,
  add_message,
  delete_message,
} = require('../services/chat.messages.service')

const send_msg = async (req, res) => {
  const users = []
  const { content, chatId } = req.body

  if (!content || !chatId) {
    console.log('Invalid data passed into request')
    return res.sendStatus(400)
  }

  var newMessage = {
    sender: req.user.user_id,
    content: content,
    chat: chatId,
  }

  await models.messages
    .create(newMessage, {
      raw: true,
    })
    .then(async (message) => {
      const message2 = message.get({ plain: true })
      console.log(message2, 'message2')

      const sender_data = await models.users.findByPk(req.user.user_id, {
        raw: true,
      })
      const chat_data = await models.chats.findByPk(chatId, {
        raw: true,
      })
      const user1 = await models.users.findByPk(chat_data.user1Id, {
        raw: true,
      })
      const user2 = await models.users.findByPk(chat_data.user2Id, {
        raw: true,
      })

      users.push([user1, user2])

      await models.chats.update(
        { latest_message: message2.id },
        {
          where: {
            id: chatId,
          },
          returning: true, //option to tell Sequelize to return the object.
          plain: true, //option just to return the object itself and not the other messy meta data
        }
      )

      res.json({
        ...message2,
        sender: sender_data,
        chat: { ...chat_data, users: users[0] },
      })
    })
}

const all_messages = async (req, res) => {
  try {
    const messages = await models.messages.findAll({
      where: {
        chat: req.params.chat_id,
      },
      raw: true,
    })

    console.log(messages, 'messages')

    // const messages = await sequelize.query(
    //   `SELECT *
    // FROM dbmaster.messages
    // INNER JOIN dbmaster.chats
    // ON dbmaster.messages.chat = dbmaster.chats.id
    // INNER JOIN dbmaster.users
    // ON dbmaster.messages.sender = dbmaster.users.id
    // WHERE chat = 3;`,
    //   {
    //     type: QueryTypes.SELECT,
    //     nest: true,
    //   }
    // )

    res.json(messages)
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
}

const get_msg = (req, res) => {
  get_message()
    .then((users) => {
      return res.json(users)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

const add_msg = (req, res) => {
  console.log(req.body, 'msg data')
  add_message(req.body)
    .then((result) => {
      return res.send(result)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

// const delete_msg = (req, res) => {
//     remove_activeUser(req.user.user_id)
//     .then((result)=>{
//         return res.send(result)
//     })
//     .catch((e)=>{
//         return res.status(e.code).send(e.message)
//     })

// }

module.exports = { get_msg, add_msg, send_msg, all_messages }
