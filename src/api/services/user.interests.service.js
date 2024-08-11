const { QueryTypes } = require('sequelize')
const { models, sequelize } = require('../../db/connection')
const con = require('../../db/connection_local')

const getUserInterests = (user_id) => {
    let sql = `SELECT i.* from user_interests as ui
                LEFT JOIN interests as i
                ON ui.interest_id = i.id
                WHERE user_id = ? ;`
    return new Promise((resolve, reject) => {
        sequelize.query(sql, {replacements:[user_id], type:QueryTypes.SELECT})
        .then(result=>{
            console.log(result);
            return resolve(result);
        })
        .catch(err=>{
            console.log(err.original);
            return reject({code:500, message:"Internal Server Error"})
        })
    })
}


const addUserInterests = (user_id, data) => {

    let sql = "INSERT IGNORE INTO user_interests (user_id, interest_id) VALUES ";
    sql += data.map(_=>"(?)").join(",")

    let bulkInserts = data.map(i=>[user_id, i])
    return new Promise((resolve, reject) => {
        sequelize.query(sql, {replacements:[...bulkInserts], type:QueryTypes.INSERT})
        .then(result=>{
            return resolve("User Interests Added Successfully")
        })
        .catch(e=>{
            console.log(e);
            return reject({code:500, message:"Internal Server Error"})
        })
    })
}


const updateUserInterests = (user_id, data) => {

    let sql = `SELECT interest_id FROM user_interests WHERE user_id = ? `;
    return new Promise((resolve, reject) => {
        sequelize.query(sql,{replacements:[user_id], type:QueryTypes.SELECT})
        .then(result=>{
            const existing_user_int = result.map(r => r.interest_id);
            const to_insert = data.filter(x => !existing_user_int.includes(x));
            const to_delete = existing_user_int.filter(x => !data.includes(x));
            if(to_insert.length === 0 && to_delete.length === 0 )
                resolve("User already have only these interests. No Update Required.")
            const promises = [];
            if (to_insert.length > 0) promises.push(addUserInterests(user_id, to_insert));
            if (to_delete.length > 0) promises.push(deleteUserInterests(user_id, to_delete));
            const promise_results = Promise.all(promises);

            promise_results
                .then(r => resolve("Updated Successfully"))
                .catch(e => reject(e))

        })
        .catch(e=>{
            console.log(e);
            return reject({ code: 500, message: "Internal Server Error" })
        })
    })
}


// const updateUserInterests = (user_id, data) => {

//     let sql = `DELETE FROM user_interests WHERE user_id = ${user_id};`;
//     sql += " INSERT INTO user_interests (user_id, interest_id) VALUES ";
//     data.forEach(i => {
//         sql += `(${user_id}, ${i}) ,`
//     })
//     sql = sql.slice(0, -1);
//     sql += ";"
//     console.log(sql)
//     return new Promise((resolve, reject) => {
//         con.query(sql,[1,2], function (err, result) {
//             if (err) {
//                 console.log(err.code)
//                 console.log(err.message);
//                 return reject({ code: 500, message: "Internal Server Error" })
//             };

//             if (result.affectedRows == 0)
//                 return reject({ code: 404, message: `Couldn't Update` })
//             return resolve(`User Interests Updated to ID # (${data.toString()})`);
//         });
//     })
// }


const deleteUserInterests = (user_id, data) => {

    return new Promise((resolve, reject) => {
        models.user_interests.destroy({where:{user_id:user_id, interest_id:data}})
        .then(result=>{
            return resolve( { code: 200, message: "User Interests Deleted" })
        })
        .catch(e=>{
            console.log(e.original);           
            return reject({ code: 500, message: "Internal Server Error" })
        })

    })
}


module.exports = {
    getUserInterests,
    addUserInterests,
    deleteUserInterests,
    updateUserInterests
}