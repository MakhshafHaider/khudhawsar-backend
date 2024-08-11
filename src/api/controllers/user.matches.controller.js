const { QueryTypes, Sequelize, Op } = require('sequelize')
const { sequelize, models } = require('../../db/connection')
const users = require('../../db/models/users')
const user_images = require('../../db/models/user_images')
const {
  getUserMatches,
  getUserMatch,
  oppGenderMembers,
} = require('../services/user.matches.service')
const { find_similarity_users } = require('../services/utility')
const country = require('../../db/models/country')

const get_matches = (req, res) => {
  let get_user_matches
  if (req.query.page) {
    get_user_matches = getUserMatches(
      req.user.user_id,
      req.query.page,
      req.query.limit,
      req.query.radius
    )
  } else
    get_user_matches = getUserMatch(
      req.user.user_id,
      req.query.lastid,
      req.query.radius
    )
  get_user_matches
    .then((matches) => {
      return res.json(matches)
    })
    .catch((e) => {
      return res.status(e.code).send(e)
    })
}

function paginateArray(arr, itemPerPage, pageIndex) {
  const lastIndex = itemPerPage * pageIndex
  const firstIndex = lastIndex - itemPerPage

  if (pageIndex > Math.ceil(arr.length / itemPerPage)) {
    return { data: 'page limit exceeded!' }
  } else {
    return {
      data: arr.slice(firstIndex, lastIndex),
      page: pageIndex,
      limit: itemPerPage,
      totalDocs: arr.length,
      totalPages: Math.ceil(arr.length / itemPerPage),
    }
  }
}

const get_opposite_matches = async (req, res) => {
  let user_gender
  let opposite_gender_data
  let interests

  user_gender = await oppGenderMembers(req.user.user_id)

  user_gender.interests = await models.user_interests.findAll({
    where: { user_id: req.user.user_id },
  })

  const user_interest = user_gender.interests.map((e) => e.interest_id)
  user_gender.interests = user_interest

  user_gender.images = await models.user_images.findAll({
    where: { user_id: req.user.user_id },
    raw: true,
  })
  const user_image = user_gender.images.map((e) => e.img_url)
  user_gender.images = user_image

  user_gender.languages = await models.user_languages.findAll({
    where: { user_id: req.user.user_id },
  })

  const user_lang = user_gender.languages.map((e) => e.language_id)
  user_gender.languages = user_lang

  let { page, limit, radius, ...query } = req.query

  if (user_gender.gender.toLowerCase() == 'm') {
    opposite_gender_data = await models.users.findAll({
      raw: true,
      attributes: {
        include: [
          [
            Sequelize.fn(
              'distance',
              Sequelize.col('last_loc_lat'),
              Sequelize.col('last_loc_long'),
              user_gender.last_loc_lat,
              user_gender.last_loc_long
            ),
            'distance',
          ],
        ],
      },
      where: {
        gender: 'f',
        ...query,
        $and: sequelize.where(
          Sequelize.fn(
            'distance',
            Sequelize.col('last_loc_lat'),
            Sequelize.col('last_loc_long'),
            user_gender.last_loc_lat,
            user_gender.last_loc_long
          ),
          '<=',
          radius || 4000
        ),
      },
    })

    const newArray = await Promise.all(
      opposite_gender_data.map(async (member_profile) => {
        let interest_name = []
        let country = await models.country.findByPk(member_profile.country_id)
        member_profile.country = country?.value

        // member_profile.interest_name = interests_name?.value

        member_profile.interests = await models.user_interests.findAll({
          where: { user_id: member_profile.id },
          raw: true,
        })
        const member_interest = member_profile.interests.map(
          (e) => e.interest_id
        )
        member_profile.interests = member_interest

        // member_profile.interests.map(async (item) => {
        //   interests = await models.interests.findByPk(item)

        //   console.log(interests.name, 'interests.name')

        //   interest_name.push(interests)
        // })
        member_profile.images = await models.user_images.findAll({
          where: { user_id: member_profile.id },
          raw: true,
        })
        const member_image = member_profile.images.map((e) => e.img_url)
        member_profile.images = member_image

        member_profile.interests.map(async (item) => {
          interests = await models.interests.findByPk(item)

          interest_name.push(interests.name)
        })
        member_profile.interest_name = interest_name

        member_profile.languages = await models.user_languages.findAll({
          where: { user_id: member_profile.id },
          raw: true,
        })

        const member_lang = member_profile.languages.map((e) => e.language_id)
        member_profile.languages = member_lang

        let similarity =
          find_similarity_users(user_gender, member_profile) * 100

        similarity = Math.round(similarity)

        member_profile.matching_percentage = similarity

        return member_profile
      })
    )

    res.status(200).send(paginateArray(newArray, limit, page))
  } else {
    opposite_gender_data = await models.users.findAll({
      raw: true,
      attributes: {
        include: [
          [
            Sequelize.fn(
              'distance',
              Sequelize.col('last_loc_lat'),
              Sequelize.col('last_loc_long'),
              user_gender.last_loc_lat,
              user_gender.last_loc_long
            ),
            'distance',
          ],
        ],
      },
      where: {
        gender: 'm',
        ...query,
        $and: sequelize.where(
          Sequelize.fn(
            'distance',
            Sequelize.col('last_loc_lat'),
            Sequelize.col('last_loc_long'),
            user_gender.last_loc_lat,
            user_gender.last_loc_long
          ),
          '<=',
          radius || 4000
        ),
      },
    })

    const newArray = await Promise.all(
      opposite_gender_data.map(async (member_profile) => {
        let interest_name = []
        let country = await models.country.findByPk(member_profile.country_id)

        member_profile.country = country?.value
        member_profile.interests = await models.user_interests.findAll({
          where: { user_id: member_profile.id },
          raw: true,
        })
        const member_interest = member_profile.interests.map(
          (e) => e.interest_id
        )
        member_profile.interests = member_interest
        member_profile.images = await models.user_images.findAll({
          where: { user_id: member_profile.id },
          raw: true,
        })
        const member_image = member_profile.images.map((e) => e.img_url)
        member_profile.images = member_image

        member_profile.interests.map(async (item) => {
          interests = await models.interests.findByPk(item)

          interest_name.push(interests.name)
        })
        member_profile.interest_name = interest_name

        member_profile.languages = await models.user_languages.findAll({
          where: { user_id: member_profile.id },
          raw: true,
        })

        const member_lang = member_profile.languages.map((e) => e.language_id)
        member_profile.languages = member_lang

        let similarity =
          find_similarity_users(user_gender, member_profile) * 100

        similarity = Math.round(similarity)

        member_profile.matching_percentage = similarity

        return member_profile
      })
    )

    res.status(200).send(paginateArray(newArray, limit, page))
  }
}

module.exports = {
  get_matches,
  get_opposite_matches,
}
