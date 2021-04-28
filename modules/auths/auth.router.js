const express = require('express');
const Router = new express.Router();
const AuthController = require('./auth.controller');
const {isAuth} = require('../../middleware/isAuth');

//app.use(express.urlencoded())

Router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const newUser = await AuthController.createUser({ email, password });
        res.send({
            success: 1,
            data: newUser,
        })
    }catch(err) {
        let statusErr = err.statusCode || 500
        res.status(statusErr).send({success : 0, message : err.message});
    }
});

Router.post('/login',async (req, res) => {
    try{
        const {email, password} = req.body;
        const foundUser = await AuthController.login({email, password});
        res.send({
            success : 1,
            data : foundUser
        })
    }catch(err) {
        let statusErr = err.statusCode || 500
        res.status(statusErr).send({success : 0, message : err.message});
    }
});

Router.get('/user',isAuth,async (req, res) => {
    try{
        const user = req.user;
        res.send({
            success : 1,
            data : user
        })
    }catch(err) {
        let statusErr = err.statusCode || 500
        res.status(statusErr).send({success : 0, message : err.message});
    }
});
module.exports = Router;