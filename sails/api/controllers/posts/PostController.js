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
            typeOfPost: req.param('type'),
            content: req.param('content'),
        });
        return res.ok();
    },

    getPost: async function(req, res){
        sails.log('Fetching Post #' + req.param('postID'));
        var pst = await Post.findOne({id: req.param('postID')});
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