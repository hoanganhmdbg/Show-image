const PostModel = require('./post');

const createPost = async ({imageUrl, title, description, createBy}) => {
    const newPost = await PostModel.create({imageUrl, title, description, createBy});
    return newPost;
}

const getPosts = async({offset, limit}) => {
    // const posts = await PostModel.find().skip(offset).limit(limit);
    // //example : offset : 1 , limit : 10 => 1-10
    // const total  = await PostModel.countDocuments();
    // 

    const [posts, total] = await Promise.all([
        PostModel.find().skip(offset).limit(limit).select('-__v')
        .populate({
            'path' : 'createBy',
            select : 'email' }),
        PostModel.countDocuments()
    ])
    return [posts, total];
}

const getDetailPost = async (postId) => {
    const foundPost = await PostModel.findById(postId)
                            .populate('createBy', 'email')
                            .populate({
                                path : 'comment',
                                populate: {
                                    path : 'createBy',
                                    select : 'email'
                                }
                            }); // populate nguoc

    if(!foundPost) throw new Error('Not found post');
    return foundPost;
}

module.exports = {
    createPost,
    getPosts,
    getDetailPost
}
