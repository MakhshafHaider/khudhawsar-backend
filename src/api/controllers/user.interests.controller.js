const { addUserInterests, updateUserInterests, deleteUserInterests, getUserInterests } = require("../services/user.interests.service")
const get_interests = (req, res) => {
    getUserInterests(req.user.user_id)
    .then((interests)=>{
        return res.json(interests)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}
const insert_interests = (req, res) => {
    addUserInterests(req.user.user_id, req.body)
        .then((result) => {
            return res.send(result)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })
}
const update_interests = (req, res) => {
    updateUserInterests(req.user.user_id, req.body)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

const delete_interests = (req, res) => {
    deleteUserInterests(req.user.user_id, req.body)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

module.exports = {
    get_interests,
    update_interests,
    delete_interests,
    insert_interests
}