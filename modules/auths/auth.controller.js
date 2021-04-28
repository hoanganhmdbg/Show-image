const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createUser = async ({email, password}) => {
    const existedUser  = await UserModel.findOne({email});
    if(existedUser){
        var err = new Error('existed email');
        err.statusCode = 401;
        throw err;
    };
    var salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    const newUser = await UserModel.create({email,password : hashpassword});

    return newUser;
}


const login = async ({email, password}) => {
    const existedUser = await UserModel.findOne({email}).lean();
    //neu ko co lean() => query cua monggo
    if(!existedUser){
        var err = new Error('not exist email');
        err.statusCode = 401;
        throw err;
    }
    const hashpassword = existedUser.password;
    const check = bcrypt.compareSync(password, hashpassword);
    if(!check) {
        var err = new Error('password not match');
        err.statusCode = 401;
        throw err;
    }
    //login success;
    //mã hóa thông tin 
    const data = {userID : existedUser._id};
    const token = jwt.sign(data,process.env.PRIVATE_KEY, { expiresIn: 60 * 60 * 1000 });


    return {...existedUser, token};
}

module.exports = {
    createUser,
    login
}