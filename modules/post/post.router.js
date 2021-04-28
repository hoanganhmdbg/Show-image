const express = require('express');
const Router = new express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../auths/user');
const PostController = require('./post.controller');
const {isAuth} = require('../../middleware/isAuth');
Router.get('/',
async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const numberPage = Number(page);
        const numberPageSize = Number(pageSize);

        const offset = (numberPage - 1) * numberPageSize;
        const limit = numberPageSize;
        console.log(offset,limit);
        const [data, total] = await PostController.getPosts({ offset, limit });

        res.send({
            success: 1,
            data: { data, total }
        })
    }catch(err) {
        res.status(500).send({
            success: 0,
            message: err.message
        })
    }

});
//check token co hợp lệ hay ko
Router.get('/:postId',async (req, res) => {
    try{
        const {postId} = req.params;
        const post = await PostController.getDetailPost(postId);
        res.send({success : 1,
        data : post})
    }catch(err) {
        res.status(500).send({
            success: 0,
            message: err.message
        })
    }
})
Router.post('/',
isAuth
,async (req, res) => {
    try {
        const { imageUrl, title, description } = req.body;
        const createBy = req.user._id;
        const newPost = await PostController.createPost({ imageUrl, title, description, createBy });
        res.send({
            success: 1,
            data: newPost,
        })
    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message
        })
    }
});

module.exports = Router;