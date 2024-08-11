const { addUserLanguages, updateUserLanguages, deleteUserLanguages, getUserLanguages } = require("../services/user.languages.service")
const get_languages = (req, res) => {
    console.log("req.user.user_id",req.user.user_id);
    getUserLanguages(req.user.user_id)
    .then((languages)=>{
        return res.json(languages)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}
const insert_languages = (req, res) => {
    addUserLanguages(req.user.user_id, req.body)
        .then((result) => {
            return res.send(result)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })
}
const update_languages = (req, res) => {
    updateUserLanguages(req.user.user_id, req.body)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

const delete_languages = (req, res) => {
    deleteUserLanguages(req.user.user_id, req.body)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

module.exports = {
    get_languages,
    update_languages,
    delete_languages,
    insert_languages
}