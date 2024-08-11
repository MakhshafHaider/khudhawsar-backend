const { Op } = require('sequelize')
const { models } = require('../../db/connection')
const chats = require('../../db/models/init-models')
const {
  get_activeUsers,
  add_activeUser,
  remove_activeUser,
} = require('../services/chat.active.users.service')

const get_active = (req, res) => {
  get_activeUsers()
    .then((users) => {
      return res.json(users)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

const access_chat = async (req, res) => {
  try {
    const users = []
    var msg_obj = {}
    const { userId } = req.body

    if (!userId) {
      console.log('UserId param not sent with request')
      return res.sendStatus(400)
    }

    const is_chats = await models.chats.findAll({
      where: {
        [Op.and]: [
          {
            user1Id: {
              [Op.or]: [{ [Op.eq]: req.user.user_id }, { [Op.eq]: userId }],
            },
          },
          {
            user2Id: {
              [Op.or]: [{ [Op.eq]: req.user.user_id }, { [Op.eq]: userId }],
            },
          },
        ],
      },
      raw: true,
    })

    console.log(is_chats, 'chat_hai')

    if (is_chats.length > 0) {
      const user1 = await models.users.findByPk(is_chats[0].user1Id)
      const user2 = await models.users.findByPk(is_chats[0].user2Id)

      const latest_msg = await models.messages.findByPk(
        is_chats[0].latest_message,
        { raw: true }
      )

      if (latest_msg) {
        var sender = await models.users.findByPk(latest_msg.sender, {
          raw: true,
        })
        msg_obj = { ...latest_msg, sender }
      }

      // console.log(user1, 'user1')
      // console.log(user2, 'user2')

      users.push([user1, user2])

      console.log(users, 'users')

      console.log(is_chats[0].user1Id, 'is_chats') // check if these users have chat before or not

      res.json({ ...is_chats[0], users: users[0], latestMessage: msg_obj })
    } else {
      var chatData = {
        chat_name: 'sender',
        user1Id: req.user.user_id,
        user2Id: userId,
      }

      await models.chats.create(chatData)
    }

    // res.json(is_chats)
  } catch (error) {
    console.log(error, 'error')
  }
  // get_activeUsers()
  // .then((users)=>{
  //     return res.json(users)
  // })
  // .catch((e)=>{
  //     return res.status(e.code).send(e)
  // })
}

const fetch_chat = async (req, res) => {
  try {
    var response = []
    const users = []
    var msg_obj = {}
    var count = 0

    const is_chats = await models.chats.findAll({
      where: {
        [Op.or]: [{ user1Id: req.user.user_id }, { user2Id: req.user.user_id }],
      },
      raw: true,
    })

    // is_chats.forEach(async (chat) => {   // loop for all chats
    //   const user1 = await models.users.findByPk(chat.user1Id)
    //   const user2 = await models.users.findByPk(chat.user2Id)

    //   const latest_msg = await models.messages.findByPk(chat.latest_message, {
    //     raw: true,
    //   })

    //   if (latest_msg) {
    //     var sender = await models.users.findByPk(latest_msg.sender, {
    //       raw: true,
    //     })
    //     msg_obj = { ...latest_msg, sender }
    //   }

    //   users.push([user1, user2])

    //   console.log(users, 'users')

    //   // console.log(chat.user1Id, 'is_chats') // check if these users have chat before or not

    //   response.push({ ...chat, users: users[count], latestMessage: msg_obj })

    //   console.log(response,'response')

    //   ++count
    // })

    // console.log(response,'response_outside')

    // res.json(response)

    const user1 = await models.users.findByPk(is_chats[0].user1Id)
    const user2 = await models.users.findByPk(is_chats[0].user2Id)

    const latest_msg = await models.messages.findByPk(
      is_chats[0].latest_message,
      { raw: true }
    )

    if (latest_msg) {
      var sender = await models.users.findByPk(latest_msg.sender, {
        raw: true,
      })
      msg_obj = { ...latest_msg, sender }
    }

    users.push([user1, user2])

    console.log(users, 'users')

    console.log(is_chats[0].user1Id, 'is_chats') // check if these users have chat before or not

    res.json([{ ...is_chats[0], users: users[0], latestMessage: msg_obj }])
  } catch (error) {
    console.log(error, 'error')
  }
}

const add_active = (req, res) => {
  add_activeUser(req.user.user_id)
    .then((result) => {
      return res.send(result)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

const delete_active = (req, res) => {
  remove_activeUser(req.user.user_id)
    .then((result) => {
      return res.send(result)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

module.exports = {
  get_active,
  add_active,
  delete_active,
  access_chat,
  fetch_chat,
}
