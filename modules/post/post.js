const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    imageUrl : {
        type : String,
        require : true,
    },
    title: {
        type : String,
        require : true,
    },
    description : String,
    createBy : {
        type : mongoose.Types.ObjectId,
        ref : 'user'
    }
}, 
{timestamps : true,
toJSON : {virtuals : true}, // 2 option nay chi define khi co virtual field
toObject : {virtuals : true}}
);

postSchema.virtual('comment', {
    ref : 'comment', //the model to use
    localField : '_id', // field from post
    foreignField : 'post' // field from comment
})
module.exports = mongoose.model('post', postSchema);