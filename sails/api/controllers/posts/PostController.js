/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    newPost: async function(req, res){
        sails.log('Creating new Post');
        await Post.create({
            id: req.param('id'),
            title: req.param('title'),
            typeOfPost: req.param('type'),
            content: req.param('content'),
            board: req.param('board'),
        });
        return res.ok();
    },

    getPost: async function(req, res){
        sails.log('Fetching Post #' + req.param('post_id'));
        var pst = await Post.findOne({post_id: req.param('post_id')});
        return res.json(JSON.stringify(pst));
    },

    searchPost: async function(req, res){
        sails.log('Fetching Posts from board #' + req.param('boardID'));
        var pst = await Post.var.find({
                                 where: {board: req.param('boardID')},
                                 select: ['id', 'title', 'typeOfPost', 'content']
                                });
        return res.json(JSON.stringify(pst));
    },

    deletePost: async function(req, res) {
        sails.log('Trying to delete post #' + req.param('postID'));
        await Post.destroy({id: req.param('postID')})
        return res.ok(); 
    },

    updatePost: async function(req, res) {

        return res.ok();
    }

};