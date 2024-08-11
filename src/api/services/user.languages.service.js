const { QueryTypes } = require("sequelize");
const { sequelize, models } = require("../../db/connection");
const con = require("../../db/connection_local");

const getUserLanguages = (user_id) => {
  // if (!user_id) {
  //   return Promise.reject({ code: 404, message: "404 Not found" });
  // }

  let sql = `SELECT l.* from user_languages as ul
LEFT JOIN languages as l
ON ul.language_id = l.id
WHERE ul.user_id = ? ;`;
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: [user_id], type: QueryTypes.SELECT })
      .then((result) => {
        return resolve({code: 200, message: result});
      })
      .catch((e) => {
        console.log(e.original);
        console.log("errror", e);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

const addUserLanguages = (user_id, data) => {
  
  let sql = "INSERT IGNORE INTO user_languages (user_id, language_id) VALUES ";
  sql += data.map((_) => "(?)").join(",");

  let bulkInserts = data.map((i) => [user_id, i]);

  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: [...bulkInserts], type: QueryTypes.INSERT })
      .then((result) => {
        return resolve({
          code: 200,
          message: "User Languages Added Successfully",
        });
      })
      .catch((e) => {
        console.log(e);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

const updateUserLanguages = (user_id, data) => {
  let sql = `SELECT language_id FROM user_languages WHERE user_id = ? `;
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: [user_id], type: QueryTypes.SELECT })
      .then((result) => {
        const existing_user_lang = result.map((r) => r.language_id);
        const to_insert = data.filter((x) => !existing_user_lang.includes(x));
        const to_delete = existing_user_lang.filter((x) => !data.includes(x));
        if (to_insert.length === 0 && to_delete.length === 0)
          reject({
            code: 404,
            message:
              "User already have only these languages. No Update Required.",
          });
        const promises = [];
        if (to_insert.length > 0)
          promises.push(addUserLanguages(user_id, to_insert));
        if (to_delete.length > 0)
          promises.push(deleteUserLanguages(user_id, to_delete));
        const promise_results = Promise.all(promises);

        promise_results
          .then((r) => resolve({ code: 200, message: "Updated Successfully" }))
          .catch((e) => reject(e));
      })
      .catch((e) => {
        console.log(e);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

const deleteUserLanguages = (user_id, data) => {
  return new Promise((resolve, reject) => {
    models.user_languages.findOne({ where: { id: user_id } }).then((result) => {
      if (!result) {
        return reject({
          code: 404,
          message: `Language with id ${user_id} not found`,
        });
      }
    });

    models.user_languages
      .destroy({ where: { user_id: user_id, language_id: data } })
      .then(() => {
        return resolve({ code: 200, message: `User Languages Deleted` });
      })
      .catch((e) => {
        console.log(e);
        return reject({ code: 500, message: "Internal Server Error" });
      });
  });
};

module.exports = {
  getUserLanguages,
  addUserLanguages,
  deleteUserLanguages,
  updateUserLanguages,
};
