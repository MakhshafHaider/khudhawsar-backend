const { QueryTypes } = require('sequelize');
const {sequelize, models} = require('../../db/connection');

const getUserViews = (user_id) => {
    let sql = `SELECT u.id, u.full_name, ui.img_url, TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) AS age, 
                c.value as 'country', s.value as 'state', ci.value as 'city'  
                FROM user_views as uv
                LEFT JOIN users as u ON uv.viewed_user_id = u.id
                LEFT JOIN country as c ON c.id = u.country_id
                LEFT JOIN state as s ON s.id = u.state_id
                LEFT JOIN city as ci ON ci.id = u.city_id
                LEFT JOIN user_images as ui ON (ui.user_id = u.id AND ui.order = 0)

                WHERE uv.user_id = :user_id;`
    return new Promise((resolve, reject) => {
        sequelize.query(sql, {replacements:{user_id}, type:QueryTypes.SELECT})
        .then(result=>{
            return resolve(result);
        })
        .catch(e=>{
            console.log(e.original);
            return reject({ code: 500, message: "Internal Server Error" })

        })
    })
}

const addUserView = (user_id, viewed_user_id) => {

    return new Promise((resolve, reject) => {
        models.user_views.create({user_id, viewed_user_id})
        .then(result=>{
            return resolve({code:200, message:`User View Added Successfully`} );
        })
        .catch(e=>{
            console.log(e.original);
            return reject({ code: 500, message: "Internal Server Error" })

        })
    })
}


const deleteUserView = (user_id, viewed_user_id) => {

    return new Promise((resolve, reject) => {
        models.user_views.destroy({where:{user_id, viewed_user_id}})
        .then(result=>{
            if(result === 0) return reject({code:404, message: `Not found`})
            return resolve(`Deleted Like`);
        })
        .catch(e=>{
            console.log(e.original);
            return reject({ code: 500, message: "Internal Server Error" })

        })
        
    })
}


module.exports = {
    getUserViews,
    addUserView,
    deleteUserView,
}