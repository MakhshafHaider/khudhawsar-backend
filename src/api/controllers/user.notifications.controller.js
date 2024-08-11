const { addNotification, getNotifications } = require("../services/user.notifications.services")

const insert_notifications = (req, res) => {
    // const { user_id, liked_user_id } = req.body;
  
       console.log('res', req.query);
      addNotification(req.user.user_id, req.query.liked_user_id)
      .then(() => {
        res.status(200).json({ message: 'Notification added successfully' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  };


const get_notifications = (req, res) => {
    const user_id = req.user.user_id;
  
    
    getNotifications(user_id)
      .then((notifications) => {
        res.status(200).json({ notifications });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  };

module.exports ={
    get_notifications,
    insert_notifications
}