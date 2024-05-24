const express = require('express')
const { create } = require('../models/User')
const { createUser, getsinglePost, getAllPost, getAllUserPost, updatePost, deletePost, createpost } = require('../controllers/post')

const router = express.Router()


router.post('/create',createpost)
router.put('/update/:_id',updatePost)
router.delete('/delete/:_id',deletePost)
router.get('/getAllUserPost',getAllUserPost)
router.get('/getsinglepost',getsinglePost)
router.get('/getAllpost/:_id',getAllPost)

module.exports=router