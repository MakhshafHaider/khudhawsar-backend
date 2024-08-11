const { addDropdown, updateDropdown, deleteDropdown, getDropdowns } = require("../services/dropdown.service")
const get_dropdowns = (req, res) => {
    // console.log(req.params.dropdown_name)
    getDropdowns(req.params.dropdown_name)
    .then((result)=>{
        return res.json(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}
const insert_dropdown = (req, res) => {
    addDropdown(req.params.dropdown_name,req.body)
        .then((result) => {
            return res.send(result)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })
}
const update_dropdown = (req, res) => {
    // console.log(req.params.dropdown_name, req.params.id)

    updateDropdown(req.params.dropdown_name,req.params.id, req.body)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

const delete_dropdown = (req, res) => {
    deleteDropdown(req.params.dropdown_name,req.params.id)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}

module.exports = {
    get_dropdowns,
    update_dropdown,
    delete_dropdown,
    insert_dropdown
}