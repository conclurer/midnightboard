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
    await PostLocation.create({
      boardId: req.param('boardId'),
      postId: createdPost.id
    });
    return res.ok();
  },

  getPost: async function(req, res){
    sails.log('Fetching Post #' + req.param('postId'));
    var pst = await Post.findOne({postId: req.param('postId')});
    return res.json(JSON.stringify(pst));
  },

  searchPost: async function(req, res){
    sails.log('Fetching Posts from board #' + req.param('boardId'));
    var idList = await PostLocation.find({
      where: {boardId: req.param('boardId')},
      select: ['postId']
    });
    var postList = [];
    for(var i=0; i<idList.length; i++){
      postList[i] = await Post.findOne({id: idList[i].postId});
    }
    return res.json(JSON.stringify(postList));
  },

  deletePost: async function(req, res) {
    sails.log('Trying to delete post #' + req.param('postId'));
    await Post.destroy({id: req.param('postId')});
    return res.ok();
  },

  updatePost: async function(req, res) {

    return res.ok();
  }

};
