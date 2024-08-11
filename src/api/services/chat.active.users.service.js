const { QueryTypes } = require('sequelize')
const { sequelize, models } = require('../../db/connection')
const con = require('../../db/connection_local')


const get_activeUsers = (user_id) => {
    let sql = `SELECT * FROM active_users`;

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { type: QueryTypes.SELECT })
            .then((result) => {
                return resolve(result);
            })
            .catch(e => {
                let err = e.original;
                console.log(err);
                if(e.status == 404) return reject({ code: 404, message:"Active user not found"})
                else return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}

const add_activeUser = (user_id) => {
    var now = new Date();
    const timeActive = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');

    let sql = `INSERT INTO active_users (user_id, timeActive) VALUES (${user_id}, "${timeActive}") `;

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { type: QueryTypes.INSERT })
            .then((result) => {
                return resolve( { code: 200, message: `Active User Added Successfully`} );
            })
            .catch(e => {
                let err = e.original;
                console.log(err);
                if (err.name === 'SequelizeForeignKeyConstraintError') {
                    return reject({ code: 400, message: "Invalid User ID" });
                } else if (err.name === 'SequelizeUniqueConstraintError') {
                    return reject({ code: 403, message: "User Already Active" });
                } 
                else return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}

const remove_activeUser = (user_id) => {

    let sql = `DELETE FROM active_users WHERE user_id = ${user_id} `;

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { type: QueryTypes.DELETE })
            .then((result) => {
                return resolve({ code: 200, message:`Active User Removed Successfully`} );
            })
            .catch(e => {
                let err = e.original;
                console.log(err);
                 return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}

module.exports = {get_activeUsers, add_activeUser, remove_activeUser};