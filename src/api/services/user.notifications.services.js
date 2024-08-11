const { QueryTypes } = require("sequelize");
const { sequelize, models } = require("../../db/connection");

const addNotification = (user_id, liked_user_id) => {
  console.log("user id", user_id);

      return models.users.findByPk(user_id)
        .then(user => {
          if (user) {
            const notification = { 
              user_id: liked_user_id,
              liked_user_id: user_id,
              notification_message: `${user.full_name} has liked you.`,
              timestamp: new Date(),
              type: 'likes'
            };
            
            // Fetch the user's profile picture
            return models.user_images.findOne({
              where: {
                user_id: user_id,
                order: 0
              }
            }).then(image => {
              if (image) {
                const notificationWithImage = {
                  ...notification,
                  profile_picture: image.img_url
                };
                return models.notifications.create(notificationWithImage);
              } else {
                // If no image found, proceed without the profile picture
                   console.log(" i am calledd in else", notification);

                return models.notifications.create(notification);
              }
            });
          } else {
            throw new Error(`User with ID ${user_id} not found.`);
          }
        });
    };


  const getNotifications =(user_id) => {
    return models.notifications.findAll({
      where: { user_id },
      order: [['timestamp', 'DESC']]
    });
  };


  module.exports = {
    addNotification,
    getNotifications
  }