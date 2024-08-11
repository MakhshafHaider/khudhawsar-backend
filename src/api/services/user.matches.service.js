const { KOI8R_GENERAL_CI } = require('mysql/lib/protocol/constants/charsets')
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../../db/connection')
const con = require('../../db/connection_local')
const { find_similarity_users } = require('./utility')

const check_likes = (user_id, liked_user_id) => {
  let sql = `CALL check_likes(?, ?)`;
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, {
        replacements: [user_id, liked_user_id],
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        console.log("result", result);
        if (!Array.isArray(result)) return reject({ code: 404, message: 'Like is not mutual' });
      
        let [users, users_interests, users_languages] = result;

        let user_profile = users['0']
        let liked_profile = users['1']

        users_interests = Object.values(users_interests);
        users_languages = Object.values(users_languages);

        user_profile.interests = users_interests
          .filter((i) => i.user_id === user_profile.id)
          .map((e) => e.interest_id)
        liked_profile.interests = users_interests
          .filter((i) => i.user_id === liked_profile.id)
          .map((e) => e.interest_id)
        user_profile.languages = users_languages
          .filter((i) => i.user_id === user_profile.id)
          .map((e) => e.language_id)
        liked_profile.languages = users_languages
          .filter((i) => i.user_id === liked_profile.id)
          .map((e) => e.language_id)
        const similarity = 
          find_similarity_users(user_profile, liked_profile) * 100
        return resolve(Math.round(similarity))
      })
      .catch((e) => {
        return reject(e, 'error')
      })
  })
}


const oppGenderMembers = async (user_id, page, limit, radius = 5) => {
  // const users = await sequelize.query(``, { type: QueryTypes.SELECT })

  // console.log(users, 'users')

  return new Promise(async (resolve, reject) => {
    sequelize
      .query(`SELECT * FROM users where id=${user_id}`, {
        replacements: {
          user_id,
        },
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        // console.log(result, 'result')
        if (result.length === 0)
          return reject({ code: 404, message: 'Page Not Found' })
        return resolve(result[0])
      })
      .catch((err) => {
        console.log(err.original)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })

  // let offset = (page - 1) * limit
  // let sql = `
  //               SELECT u.id as 'matched_id' ,
  //               um.match_percentage, u.full_name, ui.img_url,
  //               TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) AS age,
  //               c.value as 'country', s.value as 'state', ci.value as 'city',
  //               distance( me.last_loc_lat, me.last_loc_long , u.last_loc_lat, u.last_loc_long) as 'distance'
  //               FROM user_matches as um

  //               LEFT JOIN users as u ON IF(um.user_id = :user_id, um.matched_user_id,um.user_id) = u.id
  //               LEFT JOIN country as c ON c.id = u.country_id
  //               LEFT JOIN state as s ON s.id = u.state_id
  //               LEFT JOIN city as ci ON ci.id = u.city_id
  //               LEFT JOIN user_images as ui ON (ui.user_id = :user_id AND ui.order = 0)
  //               JOIN users as me ON me.id = :user_id

  //               WHERE (um.user_id = :user_id OR um.matched_user_id = :user_id)
  //               AND
  //               distance( me.last_loc_lat, me.last_loc_long , u.last_loc_lat, u.last_loc_long) <= :radius
  //               ORDER BY um.match_percentage DESC
  //               LIMIT :limit OFFSET :offset;`
  // return new Promise(async (resolve, reject) => {
  //   sequelize
  //     .query(sql, {
  //       replacements: {
  //         user_id,
  //         limit: Number.parseInt(limit),
  //         radius,
  //         offset,
  //       },
  //       type: QueryTypes.SELECT,
  //     })
  //     .then((result) => {
  //       console.log(result, 'result')
  //       if (result.length === 0)
  //         return reject({ code: 404, message: 'Page Not Found' })
  //       return resolve(result)
  //     })
  //     .catch((err) => {
  //       console.log(err.original)
  //       return reject({ code: 500, message: 'Internal Server Error' })
  //     })
  // })
}

const addUserMatch = (user_id, liked_user_id) => {
  console.log('user_id, liked_user_id', user_id, liked_user_id);
  return new Promise(async (resolve, reject) => {
    let similarity = 0;
    try {
      similarity = await check_likes(user_id, liked_user_id);
    } catch (e) {
      return reject({ code: 500, message: e });
    }
    let sql = `INSERT INTO user_matches VALUES( :user_id , :liked_user_id , :similarity ) AS aliased 
                    ON DUPLICATE KEY UPDATE match_percentage=aliased.match_percentage;`;
    sequelize
      .query(sql, {
        replacements: { user_id, liked_user_id, similarity },
        type: QueryTypes.INSERT,
      })
      .then((result) => {
        return resolve({ code: 200, message: 'User Match Added Successfully' });
      })
      .catch((e) => {
        console.log(e.original);
        return reject({ code: 500, message: 'Internal Server Error' });
      });
  });
};


const updateUserMatch = (user_id, liked_user_id) => {
  return new Promise(async (resolve, reject) => {
    let similarity = 0
    try {
      similarity = await check_likes(user_id, liked_user_id)
    } catch (e) {
      console.log(e)
      return reject({ code: 500, message: e })
    }
    let sql = `UPDATE user_matches SET match_percentage = :similarity WHERE user_id IN ( :user_id , :liked_user_id ) AND matched_user_id IN ( :user_id , :liked_user_id )`
    sequelize
      .query(sql, {
        replacements: { user_id, liked_user_id, similarity },
        type: QueryTypes.UPDATE,
      })
      .then((result) => {
        return resolve( {code: 200, message: `User Match Updated Successfully`} )
      })
      .catch((e) => {
        console.log(e.original)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const batchUpdateUserMatches = (user_id) => {
  let sql = `SELECT IF(um.user_id = :user_id , um.matched_user_id,um.user_id) as matched_id
                FROM user_matches as um WHERE um.user_id = :user_id OR um.matched_user_id = :user_id`
  sequelize
    .query(sql, { replacements: { user_id }, type: QueryTypes.SELECT })
    .then((matches) => {
      matches.forEach((match) => {
        updateUserMatch(user_id, match.matched_id)
          .then(() => {
            console.log('Updated Match #', match.matched_id)
          })
          .catch((e) => {
            console.log(e)
          })
      })
    })
    .catch((e) => {
      console.log(e.original)
    })
}

// radius in km
const getUserMatches = (user_id, page, limit, radius = 5) => {
  let offset = (page - 1) * limit
  let sql = `
                SELECT u.id as 'matched_id' ,
                um.match_percentage, u.full_name, ui.img_url, 
                TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) AS age, 
                c.value as 'country', s.value as 'state', ci.value as 'city', 
                distance( me.last_loc_lat, me.last_loc_long , u.last_loc_lat, u.last_loc_long) as 'distance'
                FROM user_matches as um

                LEFT JOIN users as u ON IF(um.user_id = :user_id, um.matched_user_id,um.user_id) = u.id
                LEFT JOIN country as c ON c.id = u.country_id
                LEFT JOIN state as s ON s.id = u.state_id
                LEFT JOIN city as ci ON ci.id = u.city_id
                LEFT JOIN user_images as ui ON (ui.user_id = :user_id AND ui.order = 0)
                JOIN users as me ON me.id = :user_id

                WHERE (um.user_id = :user_id OR um.matched_user_id = :user_id)
                AND
                distance(me.last_loc_lat, me.last_loc_long , u.last_loc_lat, u.last_loc_long) <= :radius
                ORDER BY um.match_percentage DESC
                LIMIT :limit OFFSET :offset;`
  return new Promise(async (resolve, reject) => {
    sequelize
      .query(sql, {
        replacements: {
          user_id,
          limit: Number.parseInt(limit),
          radius,
          offset,
        },
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        console.log(result, 'result')
        if (result.length === 0)
          return reject({ code: 404, message: 'Page Not Found' })
        return resolve(result)
      })
      .catch((err) => {
        console.log(err.original)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const getUserMatch = (user_id, lastid, radius = 5) => {
  if (lastid === undefined) lastid = 0
  let sql = ` SELECT u.id as 'matched_id' ,
                um.match_percentage, u.full_name, ui.img_url, 
                TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) AS age, 
                c.value as 'country', s.value as 'state', ci.value as 'city'  ,
                distance( me.last_loc_lat, me.last_loc_long , u.last_loc_lat, u.last_loc_long) as 'distance'

                FROM user_matches as um

                LEFT JOIN users as u ON IF(um.user_id = :user_id , um.matched_user_id,um.user_id) = u.id
                LEFT JOIN country as c ON c.id = u.country_id
                LEFT JOIN state as s ON s.id = u.state_id
                LEFT JOIN city as ci ON ci.id = u.city_id
                LEFT JOIN user_images as ui ON (ui.user_id = :user_id AND ui.order = 0)
                JOIN users as me ON me.id = :user_id

                WHERE 
                    (um.user_id = :user_id OR um.matched_user_id = :user_id)
                    AND
                    u.id > :lastid
                    AND
                    distance( me.last_loc_lat, me.last_loc_long , u.last_loc_lat, u.last_loc_long) <= :radius

                ORDER BY u.id ASC
                LIMIT 1;`
  return new Promise(async (resolve, reject) => {
    sequelize
      .query(sql, {
        replacements: { user_id, lastid, radius },
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        if (result.length === 0)
          return reject({ code: 404, message: 'No More Match Not Found' })
        // const matches = result.filter(user=>{
        //     distance(user.last_loc_lat , user.last_loc_long)
        // })
        return resolve(result)
      })
      .catch((e) => {
        console.log(e.original)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

module.exports = {
  addUserMatch,
  updateUserMatch,
  getUserMatches,
  getUserMatch,
  batchUpdateUserMatches,
  oppGenderMembers,
}
