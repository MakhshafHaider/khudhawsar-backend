const { sequelize, models } = require('../../db/connection')
const { QueryTypes } = require('sequelize')

const tables = {
  appearance: 'appearance',
  attend_religious_services: 'attend_religious_services',
  body_type: 'body_type',
  born_reverted_options: 'born_reverted_options',
  city: 'city',
  color: 'color',
  country: 'country',
  currency: 'currency',
  drink_smoke_options: 'drink_smoke_options',
  eating_habits: 'eating_habits',
  education: 'education',
  employment_status: 'employment_status',
  ethinicity: 'ethinicity',
  family_values: 'family_values',
  have_children_options: 'have_children_options',
  interests: 'interests',
  language: 'language',
  languages: 'languages',
  living_situation: 'living_situation',
  marital_status: 'marital_status',
  more_children: 'more_children',
  nationality: 'nationality',
  niqab_hijab_options: 'niqab_hijab_options',
  occupation: 'occupation',
  hair_color: 'hair_color',
  polygamy: 'polygamy',
  profile_creator: 'profile_creator',
  read_quran: 'read_quran',
  relationship: 'relationship',
  religion: 'religion',
  religious_values: 'religious_values',
  relocate_options: 'relocate_options',
  state: 'state',
  status: 'status',
}

const getDropdowns = (dropdown_name) => {
  console.log('dropdown running')
  if (!tables[dropdown_name]) {
    return Promise.reject({
      code: 400,
      message: `Invalid dropdown name: ${dropdown_name}`,
    })
  }

  console.log(dropdown_name, 'dropdown_name')
  let sql = `SELECT * FROM  ${tables[dropdown_name]};`
  return new Promise((resolve, reject) => {
    if (!tables[dropdown_name]) {
      return reject({
        code: 400,
        message: `Invalid dropdown name: ${dropdown_name}`,
      })
    }

    sequelize
      .query(sql, { type: QueryTypes.SELECT })
      .then((result) => {
        return resolve({ code: 200, message: result })
      })
      .catch((e) => {
        const err = e.original
        console.log(err.code)
        console.log(err.message)

        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const addDropdown = (dropdown_name, data) => {
  return new Promise((resolve, reject) => {
    if (!tables[dropdown_name]) {
      return reject({
        code: 400,
        message: `Invalid dropdown name: ${dropdown_name}`,
      })
    }

    models[tables[dropdown_name]]
      .create({ ...data })
      .then((result) => {
        return resolve({
          code: 200,
          message: `Dropdown Value Added Successfully On ID = ${result.dataValues.id}`,
        })
      })
      .catch((e) => {
        console.log(e)
        if (e.name === 'SequelizeValidationError') {
          return reject({ code: 400, message: e.message })
        }
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const updateDropdown = (dropdown_name, dropdown_id, data) => {
  console.log('dropDown, dropdown id', data, dropdown_id, dropdown_name)
  console.log('data', data)
  return new Promise((resolve, reject) => {
    if (!tables[dropdown_name]) {
      return reject({
        code: 400,
        message: `Invalid dropdown name: ${dropdown_name}`,
      })
    }

    if (!models[tables[dropdown_name]]) {
      return reject({
        code: 404,
        message: `Model not found for the table${tables[dropdown_name]}`,
      })
    }

    models[tables[dropdown_name]]
      .findOne({ where: { id: dropdown_id } })
      .then((result) => {
        if (!result) {
          return reject({
            code: 404,
            message: `Dropdown with id ${dropdown_id} not found`,
          })
        } else {
          models[tables[dropdown_name]]
            .update({ ...data }, { where: { id: dropdown_id } })
            .then((result) => {
              console.log('result', result)
              if (result === 0)
                return resolve({ code: 404, message: 'Id not found' })
              else
                return resolve({ code: 200, message: `Dropdown Value Updated` })
            })
            .catch((e) => {
              console.log(e)
              return reject({ code: 500, message: 'Internal Server Error' })
            })
        }
      })
  })
}

const deleteDropdown = (dropdown_name, dropdown_id) => {
  return new Promise((resolve, reject) => {
    models[tables[dropdown_name]]
      .destroy({ where: { id: dropdown_id } })
      .then((result) => {
        if (result == 0)
          return reject({ code: 404, message: 'Dropdown Item Not Found' })
        return resolve({ code: 200, message: `Dropdown Item Deleted` })
      })
      .catch((e) => {
        console.log(e)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

module.exports = {
  getDropdowns,
  addDropdown,
  deleteDropdown,
  updateDropdown,
}
