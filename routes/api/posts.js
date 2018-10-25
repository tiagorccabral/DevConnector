const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Carrega o model de Posts
const Post = require('../../models/Post');
// Carrega o model de Profile
const Profile = require('../../models/Profile');

// Load Post validators
const validatePostInput = require('../../validations/post');


// @route   GET api/posts/test
// @desc    Tests posts route
// @access  public
router.get('/test', (req, res) => res.json({msg: 'Posts works!'}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noposts: 'Nenhuma postagem encontrada'}))
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noposts: 'Nenhuma postagem encontrada'}))
});


// @route   POST api/posts
// @desc    Create posts
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    // Check validations
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(() => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ noauthorize: 'Usuário não autorizado'});
                    }
                    // Continue with delete
                    post.remove().then(() => res.json({success: true}))
                })
                .catch(err => res.status(404).json({ postnotfound: 'Postagem não encontrada'}))
        });
});

// @route   Post api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then((profile) => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyLiked: 'Usuário já deu like neste post'});
                    }
                    // Adiciona o id do user ao array de likes
                    post.likes.unshift({user: req.user.id});

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Postagem não encontrada'}))
        });
});

// @route   Post api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then((profile) => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: 'Usuário ainda não deu like neste post'});
                    }
                    // Encontra o index do like a ser removido
                    removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // Remove do array
                    post.likes.splice(removeIndex, 1);

                    // Salva
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Postagem não encontrada'}))
        });
});

// @route   Post api/posts/comment/:id
// @desc    Add comment to post. :id === post_id
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };

                // Add to comments array
                post.comments.unshift(newComment);

                // Save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {

        Post.findById(req.params.id)
            .then(post => {

                // Check if comment exists
                if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                    return res.status(404).json({commentNotFound: 'Comentário não existe'})
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Remove do array
                post.comments.splice(removeIndex, 1);

                // Salva
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
);

module.exports = router;
