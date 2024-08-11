const { sequelize, models } = require('../../db/connection')
const { Sequelize } = require('sequelize')
const con = require('../../db/connection_local')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const registerUser = (full_name, email, hashed_password, gender, dob) => {
    let sql = `INSERT INTO users(full_name, email, password, gender, DOB, status_id) VALUES (?,?,?,?,?, 1);`

    return new Promise((resolve, reject) => {
        sequelize.query(sql, { replacements:[full_name, email.toLowerCase(), hashed_password, gender, dob], type: Sequelize.QueryTypes.INSERT })
            .then((result) => {
                console.log(result);
                const token = jwt.sign(
                    { user_id: result[0], email: email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "24h",
                    }
                );
                return resolve({ token, id: result[0], full_name, email });
            })
            .catch(err => {
                err = err.original
                console.log(err.code)
                console.log(err.message);
                if (err.code == "ER_DUP_ENTRY")
                    return reject({ code: 403, message: "A user with this email already exists" });
                return reject({ code: 500, message: err })
            })
    }); 
}

const loginUser = (email, password) => {
    let sql = `SELECT * FROM users WHERE email = ? ;`
    return new Promise((resolve, reject) => {
        sequelize.query(sql, { replacements:[email.toLowerCase()],type: Sequelize.QueryTypes.SELECT })
            .then(result => {
                if (result.length == 0)
                    return reject({ code: 404, message: "No user with this email exists" })
                let user = result[0];
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign(
                        { user_id: user.id, email: user.email },
                        process.env.TOKEN_KEY,
                        {
                            //expiresIn: "24h",
                        }
                    );
                    delete user.password;
                    return resolve({ ...user, token });
                }
                else{
                    return reject({ code: 400, message: "Either password or email is incorrect" })
                 }    
            })
            .catch(e => {
                const err = e.original;
                console.log(err.code)
                console.log(err.message);
                return reject({ code: 500, message: "Internal Server Error" })
            })
    })
}

module.exports = {
    registerUser,
    loginUser
}