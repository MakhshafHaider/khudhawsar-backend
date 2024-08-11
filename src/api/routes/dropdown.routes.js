const express = require('express');
const { get_dropdowns, update_dropdown, insert_dropdown, delete_dropdown } = require('../controllers/dropdown.controller');
// const { authorize } = require("../middleware/auth");
const router = express.Router()

router.get('/:dropdown_name', get_dropdowns);
router.post('/:dropdown_name', insert_dropdown);
router.put('/:dropdown_name/:id', update_dropdown);
router.delete('/:dropdown_name/:id', delete_dropdown);

module.exports = router