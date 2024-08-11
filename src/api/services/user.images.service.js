const { QueryTypes } = require('sequelize')
const { sequelize, models } = require('../../db/connection')
const con = require('../../db/connection_local')

const getUserImages = (user_id) => {
  let sql = `SELECT ui.img_url, ui.order from user_images as ui
                WHERE ui.user_id = ? ;`
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: [user_id], type: QueryTypes.SELECT })
      .then((result) => {
        return resolve(result)
      })
      .catch((e) => {
        const err = e.original
        console.log(err.code)
        console.log(err.message)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const addUserImages = (user_id, data) => {  
  let sql =
    'INSERT INTO user_images (user_id, img_url, user_images.order) VALUES '
  sql += data.map((_) => '(?)').join(',')
  sql += 'AS aliased ON DUPLICATE KEY UPDATE img_url=aliased.img_url;'
  let bulkInserts = []
  data.forEach((i) => {
    bulkInserts.push([user_id, i.img_url, i.order])
  })
  return new Promise((resolve, reject) => {
    sequelize
      .query(sql, { replacements: bulkInserts, type: QueryTypes.INSERT })
      .then((result) => {
        return resolve( {code: 200, message:`User Images Added Successfully` })
      })
      .catch((e) => {
        let err = e.original
        console.log(err)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const deleteUserImages = (user_id, img_orders) => {
  return new Promise((resolve, reject) => {

    if(models.user_images.findOne({where: {id:user_id}}).then((result) => {
      if(!result){
        return reject({code: 404 , message: `Image with id ${user_id} not found`})
      }
    }))

    models.user_images
      .destroy({ where: { user_id: user_id, order: img_orders } })
      .then((result) => {
        if (result == 0) return reject({ code: 404, message: `Couldn't Delete`})
        return resolve({ code: 200, message: `Image Deleted`})
      })
      .catch((e) => {
        console.log(e)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}

const updateUserImage = (user_id, images) => {
  console.log('images in backend', images)
  return new Promise((resolve, reject) => {
    models.user_images.findAll({ where: { user_id: user_id } })
      .then((existingImages) => {
        const updates = images.map((image) => {
          const existingImage = existingImages.find((ei) => ei.order === image.order);
          if (existingImage) {
            return existingImage.update({ img_url: image.img_url });
          } else {
            return models.user_images.create({
              user_id: user_id,
              img_url: image.img_url,
              order: image.order
            });
          }
        });
        Promise.all(updates)
          .then(() => {
            return resolve({ code: 200, message: `Images updated successfully` })
          })
          .catch((e) => {
            console.log(e)
            return reject({ code: 500, message: 'Internal Server Error' })
          })
      })
      .catch((e) => {
        console.log(e)
        return reject({ code: 500, message: 'Internal Server Error' })
      })
  })
}



module.exports = {
  getUserImages,
  addUserImages,
  deleteUserImages,
  updateUserImage
}
