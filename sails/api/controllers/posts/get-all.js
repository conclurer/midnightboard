module.exports = {

  friendlyName: 'Get all posts on board',

  description: 'Returns an array of all posts on the board. '
    + '`overdueDays` can be set to also retrieve posts that are x days overdue',

  inputs: {
    boardId: {
      description: 'Board ID of the board to retrieve posts from',
      type: 'number'
    },
    overdueDays: {
      description: 'Optional: If set, also retrieves posts that are x days overdue',
      type: 'number'
    },
    limit: {
      description: 'Optional: Maximum number of posts ro receive. Combine with `offset`',
      type: 'number'
    },
    offset: {
      description: 'Optional: Post offset',
      type: 'number'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    unauthorized: {
      description: 'Authorization required',
      statusCode: 401
    },
    nonExistent: {
      description: 'Board does not exist',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(inputs.boardId < 0) {
      return exits.missingParams();
    }
    if(!inputs.offset) {
      inputs.offset = 0;
    }
    if(!inputs.limit) {
      inputs.limit = 64;
    }

    var brd;
    if(inputs.boardId === 0) {
      brd = await Board.findOne({boardType: 0});
    } else {
      brd = await Board.findOne({id: inputs.boardId});
    }
    if(!brd) {
      return exits.nonExistent('Board not found');
    }
    if(brd.boardType === 1 && !this.req.me) {
      return exits.unauthorized();
    }

    sails.log.verbose('POSTS_ALL::: Fetching Posts from board #' + inputs.boardId);

    var fetchedId = brd.id;
    var overdue = Date.now();
    if(inputs.overdueDays && !isNaN(inputs.overdueDays) && inputs.overdueDays >= 0) {
      overdue = Date.now() - (inputs.overdueDays * (24 * 60 * 60 * 1000));
    }

    var idList = await PostLocation.find({
      where: {boardId: fetchedId},
      select: ['postId']
    }).skip(inputs.offset)
      .limit(inputs.limit);
    var postList = [];
    var c = 0;
    for(var i = 0; i < idList.length; i++) {
      var pst = await Post.findOne({
        id: idList[i].postId,
        dueDate: { '>': overdue }
      });
      if(pst) {
        delete pst['updatedAt'];
        postList[c] = pst;
        c++;
      }
    }
    return exits.success({
      offset: inputs.offset,
      limit: inputs.limit,
      loaded: postList.length,
      posts: postList
    });
  }
};


