const { addUserImages, deleteUserImages, getUserImages , updateUserImage} = require("../services/user.images.service")
const get_images = (req, res) => {
    getUserImages(req.user.user_id)
    .then((images)=>{
        return res.json(images)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}
const insert_images = (req, res) => {
    addUserImages(req.user.user_id, req.body)
        .then((result) => {
            return res.send(result)
        })
        .catch((e) => {
            return res.status(e.code).send(e)
        })
}
const update_images = (req, res) => {
    // console.log('images', req.body)
    const  images  = req.body;
    updateUserImage(req.user.user_id, images)
      .then((result) => {
        return res.send(result);
      })
      .catch((e) => {
        return res.status(e.code).send(e);
      });
  };
  


const delete_images = (req, res) => {
    deleteUserImages(req.user.user_id, req.body)
    .then((result)=>{
        return res.send(result)
    })
    .catch((e)=>{
        return res.status(e.code).send(e)
    })

}


module.exports = {
    get_images,
    delete_images,
    insert_images,
    update_images
}