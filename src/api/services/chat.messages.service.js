const { QueryTypes } = require('sequelize')
const { sequelize, models } = require('../../db/connection')
const con = require('../../db/connection_local')

const get_message = (user_id) => {
    let sql = `SELECT * FROM messages where sender = ${user_id}`;

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { type: QueryTypes.SELECT })
            .then((result) => {
                return resolve(result);
            })
            .catch(e => {
                let err = e.original;
                console.log(err);
                return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}
const add_message = (data) => {
    var now = new Date();
    const timeActive = now.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(data, "msg data");

    let sql = `INSERT INTO messages (chat_id, sender, text, timestamp) VALUES
                (${data.chat_id}, ${data.sender}, "${data.text}", "${timeActive}")`

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { type: QueryTypes.INSERT })
            .then((result) => {
                return resolve( { code: 200, message: `Message Added Successfully`} );
            })
            .catch(e => {
                let err = e.original;
                console.log(err);
                return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}

const delete_message = (user_id) => {

    let sql = `DELETE FROM active_users WHERE user_id = ${user_id} `;

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { type: QueryTypes.DELETE })
            .then((result) => {
                return resolve( {code: 200, message:`Active User Removed Successfully`} );
            })
            .catch(e => {
                let err = e.original;
                console.log(err);
                return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}

module.exports = {get_message, add_message, delete_message};