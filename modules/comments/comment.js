const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content : {
        type : String,
    },
    createBy : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    },
    post : {
        type : mongoose.Types.ObjectId,
        ref : 'post'
    }
});

module.exports = mongoose.model('comment', commentSchema);