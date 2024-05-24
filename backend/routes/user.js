const express = require('express')
const { registerUser, loginUser, updateUser, deleteUser, getAllusers } = require('../controllers/user')
const router = express.Router()


// localhost:8080/
router.post('/register',registerUser)
router.post('/login',loginUser)
router.put('/update/:_id',updateUser)
router.delete('/delete/:_id',deleteUser)
router.get('/alluser',getAllusers)


module.exports = router