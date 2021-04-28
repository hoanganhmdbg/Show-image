const express = require('express');
const Router = new express.Router();
const commentController = require('./comment.controller');
const commentModel = require('./comment');
const {isAuth} = require('../../middleware/isAuth');
Router.get('/posts/:postId',
isAuth,
async (req, res) => {
    try{
        const { postId } = req.params;
        const comments = await commentController.getComment(postId);
        res.send({
            success : 1,
            data : comments
        })
    }catch(err){
        res.status(500).send({
            success : 0,
            message : err.message
        })
    }
    


});

Router.post('/',
isAuth
,async (req, res) => {
    try{
        const { content,postId} = req.body;
        const createBy = req.user._id;

        const newComment = await commentController.createComment({
            content,postId, createBy
        });
        
        res.send({
            success : 1,
            data : newComment,
        })
    }catch(err) {
        res.status(500).send({
            success : 0,
            message : err.message
        })
    }
});

module.exports = Router