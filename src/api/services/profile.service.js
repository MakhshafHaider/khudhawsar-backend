const { sequelize, models } = require('../../db/connection')
const { QueryTypes } = require('sequelize')
const { getUserImages } = require('./user.images.service')
const { getUserInterests } = require('./user.interests.service')
const { getUserLanguages } = require('./user.languages.service')

const getProfile = (user_id) => {
  let sql = `CALL get_user(?);`
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: [user_id] })
      .then(async (result) => {
        if (result.length == 0)
          return reject({ code: 404, message: 'No user with this id exists' })
        let user = result[0]
        delete user.password
        try {
          const interests = await getUserInterests(user_id)
          user.interests = interests
          const languages = await getUserLanguages(user_id)
          user.languages = languages
          const images = await getUserImages(user_id)
          user.images = images
        } catch (e) {
          console.log(e)
        }
        return resolve(user)
      })
      .catch((e) => {
        console.log(e)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const editProfile = (user_id, data) => {
  const allowed_fields = [
    'full_name',
    'gender',
    'DOB',
    'income_amount',
    'income_currency_id',
    'IDcard_image_url',
    'interested_gender',
    'status_id',
    'occupation_id',
    'height',
    'weight',
    'last_loc_lat',
    'last_loc_long',
    'country_id',
    'state_id',
    'city_id',
    'hair_color_id',
    'eye_color_id',
    'body_type_id',
    'ethinicity_id',
    'appearance_id',
    'drinks_id',
    'smokes_id',
    'eating_habits_id',
    'marital_status_id',
    'have_children_id',
    'number_of_children',
    'oldest_child',
    'youngest_child',
    'more_children_id',
    'employment_status_id',
    'living_situation_id',
    'relocate_id',
    'relationship_wanted_id',
    'nationality_id',
    'education_id',
    'religion_id',
    'language_id',
    'born_reverted_id',
    'religious_values_id',
    'attend_religious_services_id',
    'polygamy_id',
    'read_quran_id',
    'family_values_id',
    'profile_creator_id',
    'profile_heading',
    'introduction',
    'partner_intro',
    'niqab_id',
    'hijab_id',
  ]
  console.log('data, user_id', data, user_id)
  return new Promise((resolve, reject) => {
    models.users.findOne({ where: { id: user_id } }).then((result) => {
      if (!result) {
        return reject({
          code: 404,
          message: `User with id ${user_id} not found`,
        })
      }
    })
    models.users
      .update({ ...data }, { where: { id: user_id }, fields: allowed_fields })
      .then((result) => {
        console.log(result)
        return resolve({ code: 200, message: `User Profile Updated` })
      })
      .catch((e) => {
        // console.log(e, 'e')
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}
// doneeee
const searchProfile = (user_id, query_parameters) => {
  // const allowed_fields = ["id", "full_name", "email", "password", "gender", "DOB", "income_amount", "income_currency_id", "IDcard_image_url", "interested_gender", "status_id", "occupation_id", "height", "weight", "last_loc_lat", "last_loc_long", "country_id", "state_id", "city_id", "hair_color_id", "eye_color_id", "body_type_id", "ethinicity_id", "appearance_id", "drinks_id", "smokes_id", "eating_habits_id", "marital_status_id", "have_children_id", "number_of_children", "oldest_child", "youngest_child", "more_children_id", "employment_status_id", "living_situation_id", "relocate_id", "relationship_wanted_id", "nationality_id", "education_id", "religion_id", "born_reverted_id", "religious_values_id", "attend_religious_services_id", "polygamy_id", "read_quran_id", "family_values_id", "profile_creator_id", "profile_heading", "introduction", "partner_intro", "niqab_id", "hijab_id"];
  const current_date = new Date()
  const {
    email,
    password,
    min_age,
    max_age,
    income,
    min_height,
    min_weight,
    max_height,
    max_weight,
    languages,
    radius,
    ...data
  } = query_parameters
  // console.log(languages[0]);

  let sql = `SELECT DISTINCT u.id, u.full_name, ui.img_url, TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) AS age, 
                c.value as 'country', s.value as 'state', ci.value as 'city'  
                FROM users as u 
                LEFT JOIN country as c ON c.id = u.country_id
                LEFT JOIN state as s ON s.id = u.state_id
                LEFT JOIN city as ci ON ci.id = u.city_id
                LEFT JOIN user_images as ui ON (ui.user_id = u.id AND ui.order = 0)
                ${
                  languages
                    ? 'LEFT JOIN user_languages as ul ON ul.user_id = u.id LEFT JOIN languages as l ON l.id = ul.language_id'
                    : ''
                }
                ${radius ? `JOIN users as me ON me.id = :user_id` : ''}
                WHERE u.id != :user_id AND `

  if (min_age) {
    let max_dob = `${current_date.getFullYear() - min_age}-${
      current_date.getMonth() + 1
    }-${current_date.getDate()}`
    sql += `u.dob <= ${max_dob} AND `
  }
  if (max_age) {
    let min_dob = `${current_date.getFullYear() - max_age - 1}-${
      current_date.getMonth() + 1
    }-${current_date.getDate() + 1}`
    sql += `u.dob >= ${min_dob} AND `
  }
  if (income) sql += `u.income_amount >= :income AND `
  if (max_height) sql += `u.height <= :max_height AND `
  if (min_height) sql += `u.height >= :min_height AND `
  if (max_weight) sql += `u.weight <= :max_weight AND `
  if (min_weight) sql += `u.weight >= :min_weight AND `
  if (languages) sql += `l.id in (:languages) AND `
  if (radius) {
    sql += `distance( me.last_loc_lat, me.last_loc_long, u.last_loc_lat, u.last_loc_long) <= :radius AND `
  }
  Object.entries(data).forEach(([key, value]) => {
    sql += `${key} = :${key} AND `
  })
  sql = sql.slice(0, -5)

  return new Promise((resolve, reject) => {
    if (
      query_parameters.hasOwnProperty('password') ||
      query_parameters.hasOwnProperty('email')
    )
      return reject({ code: 404, message: 'Parameter/s not allowed!' })
    console.log(typeof max_height)
    if (
      (max_height && !Number.isFinite(max_height)) ||
      (max_weight && !Number.isFinite(max_weight)) ||
      (min_height && !Number.isFinite(min_height)) ||
      (min_weight && !Number.isFinite(min_weight))
    )
      return reject({ code: 404, message: 'Parameter/s not correct!' })

    sequelize
      .query(sql, {
        replacements: { user_id, ...query_parameters },
        type: QueryTypes.SELECT,
      })
      .then((result) => {
        console.log(result)
        // if (radius) result = result[2]
        if (result.length === 0)
          reject({ code: 404, message: 'No such user found' })
        return resolve({ code: 200, message: result })
      })
      .catch((e) => {
        console.log(e)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

module.exports = {
  getProfile,
  editProfile,
  searchProfile,
}
