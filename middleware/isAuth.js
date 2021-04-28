const jwt = require('jsonwebtoken');
const UserModel = require('../modules/auths/user');

const isAuth = async (req,res, next) => {
    //const headers = req.headers;
    const token = req.headers.authorization;
    try{
        if(!token) throw new Error("Empty Token");
        const decodeData = jwt.verify(token, process.env.PRIVATE_KEY);
        const { userID } = decodeData;
        const existUser = await UserModel.findById(userID).select('-password');
        if(!existUser) throw new Error('Not exist user');
        req.user = existUser;
        next();
    }catch(err) {
        res.status(401).send({
            success : 0,
            message : err.message
        })
    }
};

module.exports = {
    isAuth
}