const express = require('express');
const router = module.exports = express()
const { postValidation } = require('../validation');
const Post = require('../models/Post')
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

router.get('/', verifyToken, async (req, res) => {

    const userPosts = await Post.find({ userId: req.user.id })

    res.json({ posts: userPosts })
})

router.post('/', verifyToken, async (req, res) => {

    // validate post
    const { error } = postValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const post = new Post({
        message: req.body.message,
        userName: req.user.name,
        userId: req.user.id
    });

    try {
        const postSaved = await post.save();
        res.status(201).send({ post: postSaved });
    } catch (err) {
        res.status(404).send(err);
    }
})