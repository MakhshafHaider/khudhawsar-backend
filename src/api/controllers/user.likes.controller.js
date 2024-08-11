const { addUserMatch } = require("../services/user.matches.service")
const { addNotification} = require("../services/user.notifications.services");
const { addUserLike, deleteUserLike, getUserLikes } = require("../services/user.likes.service")
const get_likes = (req, res) => {
    getUserLikes(req.user.user_id)
        .then((likes) => {
            return res.json(likes)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })

}
const insert_like = (req, res) => {
    addUserLike(req.user.user_id, req.query.liked_user_id)
      .then((result) => {
        return addNotification(req.user.user_id, req.query.liked_user_id)
          .then(() => {
            console.log('Notification added successfully.');
            return addUserMatch(req.user.user_id, req.query.liked_user_id);
          })
          .then((msg) => {
            console.log('i am called', msg);
            res.send(msg); // Send the final response
          })
          .catch((e) => {
            console.log('Error adding notification:', e);
            res.status(500).send('Error adding notification');
          });
      })
      .catch((e) => {
        res.status(404).send(e); // Send the initial error response
      });
  }
  
// const insert_like = async (req, res) => {
//     try {
//       const result = await addUserLike(req.user.user_id, req.query.liked_user_id);
//       await addNotification(req.user.user_id, req.query.liked_user_id);
//       await addUserMatch(req.user.user_id, req.query.liked_user_id);
  
//       // Send the response once all operations are completed
//       return res.send(result);
//     } catch (error) {
//       console.log('Error:', error);
//       return res.status(500).send(error);
//     }
//   };
  
const delete_like = (req, res) => {
    deleteUserLike(req.user.user_id, req.query.liked_user_id)
        .then((result) => {
            return res.send(result)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })

}

module.exports = {
    get_likes,
    delete_like,
    insert_like
}