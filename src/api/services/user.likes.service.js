const { QueryTypes } = require("sequelize");
const { sequelize, models } = require("../../db/connection");

const getUserLikes = (user_id) => {
  let sql = `SELECT 
  u.id, 
  u.full_name, 
  ui.img_url, 
  TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) AS age, 
  c.value as 'country', 
  s.value as 'state', 
  ci.value as 'city', 
  um.match_percentage 
FROM user_likes as ul
LEFT JOIN users as u ON ul.liked_user_id = u.id
LEFT JOIN country as c ON c.id = u.country_id
LEFT JOIN state as s ON s.id = u.state_id
LEFT JOIN city as ci ON ci.id = u.city_id 
LEFT JOIN user_images as ui ON ui.user_id = u.id AND ui.order = 0
LEFT JOIN user_matches as um ON (u.id = um.user_id AND um.matched_user_id = :user_id) OR (u.id = um.matched_user_id AND um.user_id = :user_id)
WHERE ul.user_id = :user_id;
 `;
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: { user_id }, type: QueryTypes.SELECT })
      .then((result) => {
        return resolve(result);
      })
      .catch((e) => {
        console.log(e.original);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

const addUserLike = (user_id, liked_user_id) => {
  return new Promise((resolve, reject) => {
    models.user_likes
      .create({ user_id, liked_user_id })
      .then((result) => {
        return resolve({ code: 200, message: `User Likes Added Successfully` });
      })
      .catch((e) => {
        console.log(e.original);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

const deleteUserLike = (user_id, liked_user_id) => {
  // let sql = `DELETE FROM user_likes WHERE user_id = ${user_id} AND liked_user_id = ${liked_user_id}`
  return new Promise((resolve, reject) => {
    models.user_likes
      .destroy({ where: { user_id, liked_user_id } })
      .then((result) => {
        return resolve(`Deleted Like`);
      })
      .catch((e) => {
        console.log(e.original);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

module.exports = {
  getUserLikes,
  addUserLike,
  deleteUserLike,
};
