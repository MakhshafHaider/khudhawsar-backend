const bcrypt = require("bcrypt")
const { registerUser, loginUser } = require('../services/auth.service')

const signup = async (req, res) => {
    const { body } = req;
    if (!(body.email && body.password && body.full_name && body.gender && body.dob )) {
        return res.status(400).send( {message: "All input is required"} );
    }
    console.log(body)
    try {
        var hashed_password = await bcrypt.hash(body.password, 10);
    }
    catch (e) {
        return res.status(500).send(e);
    }
    registerUser(body.full_name, body.email, hashed_password, body.gender, body.dob)
        .then((user) => {
            return res.status(201).json(user);
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })
}
const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    loginUser(email, password)
        .then((user) => {
            return res.json(user);
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })

}

module.exports = {
    login,
    signup
}