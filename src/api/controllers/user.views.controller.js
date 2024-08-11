const { addUserView, deleteUserView, getUserViews } = require("../services/user.views.service")
const get_views = (req, res) => {
    getUserViews(req.user.user_id)
    .then((views)=>{
        return res.json(views)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}
const insert_view = (req, res) => {

    addUserView(req.user.user_id, req.query.viewed_user_id)
        .then((result) => {
            return res.send(result)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })
}

const delete_view = (req, res) => {
    deleteUserView(req.user.user_id, req.query.viewed_user_id)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

module.exports = {
    get_views,
    delete_view,
    insert_view
}