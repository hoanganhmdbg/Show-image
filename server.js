const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());
const AuthRouter = require('./modules/auths/auth.router');
const PostRouter = require('./modules/post/post.router');
const CommentRouter = require('./modules/comments/comment.router');

mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true,
    useUnifiedTopology : true },(err) => {
        if(err) console.log('mongo err', err);
        console.log('mongo connect successful');
    }
)
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/posts', PostRouter);
app.use('/api/comments', CommentRouter);

app.use('*', (req,res) => {
    res.status(404).send({
        success : 0,
        message : '404 not found'
    })
})

app.listen(process.env.PORT, (err) => {
    if(err) throw err;

    console.log('start server');
})