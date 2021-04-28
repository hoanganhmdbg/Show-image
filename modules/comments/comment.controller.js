const commentModel = require('./comment');
const postModel = require('../post/post');
const createComment = async({content, createBy, postId}) => {
    const existPost = await postModel.findById(postId);
    if(!existPost) throw new Error('Not found post');
    const newComment = await commentModel.create({
        content,
        createBy,
        post : postId,
    });
    return newComment;
};
const getComment = async(postId) => {
    const comments = await commentModel
                            .find({post : postId})
                            .populate({path : 'createBy', select : 'email'})
                            .populate('post', 'title');
    return comments;
}
module.exports = {
    createComment,
    getComment
};