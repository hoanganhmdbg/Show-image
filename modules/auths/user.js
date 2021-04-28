const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require : true,
    },
    password : {
        type : String,
        require: true
    }
},{timestamps : true });// createAt , upodateAt
module.exports = mongoose.model('user', UserSchema);