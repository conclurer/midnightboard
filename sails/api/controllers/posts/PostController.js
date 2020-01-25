/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    newPost: async function(req, res){
        sails.log('Creating new Post');
        var createdPost = await Post.create({
            title: req.param('title'),
            typeOfPost: req.param('type'),
            content: req.param('content'),
            dueDate: 0,
            interactiveDueDate: 0
        }).fetch();
        await post_location.create({
            boardId: req.param('boardID'),
            postId: createdPost.id
        })
        return res.ok();
    },

    getPost: async function(req, res){
        sails.log('Fetching Post #' + req.param('post_id'));
        var pst = await Post.findOne({post_id: req.param('post_id')});
        return res.json(JSON.stringify(pst));
    },

    searchPost: async function(req, res){
        sails.log('Fetching Posts from board #' + req.param('boardID'));
        var idList = await post_location.find({
                                 where: {boardId: req.param('boardID')},
                                 select: ['postId']
        });
        var postList = [];
        for(var i=0;i<idList.length;i++){
            postList[i] = await Post.findOne({id: idList[i].postId});
        }
        return res.json(JSON.stringify(postList));
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