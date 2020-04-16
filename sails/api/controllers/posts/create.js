module.exports = {

  friendlyName: 'Create post',

  description: 'Create a new Post. typeOfPost must match mime types.'
    + 'A copy of the created post is returned.',

  inputs: {
    boardId: {
      description: 'Board ID of the board to which to pin the post to',
      type: 'number'
    },
    title: {
      description: 'Displayed title of created post',
      type: 'string'
    },
    typeOfPost: {
      description: 'Type of the content to be uploaded',
      type: 'string'
    },
    dueDate: {
      description: 'Optional: Date in milliseconds, after which the post is no longer displayed',
      type: 'number'
    },
    InteractiveDueDate: {
      description: 'Optional: Date in milliseconds, after which interaction is no longer possible',
      type: 'number'
    },
    content: {
      description: 'Content to be uploaded to the server. Must be base64 encoded',
      type: 'ref'
    },
    skipReturn: {
      description: 'Optional: No post is returned if set to true',
      type: 'boolean'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 201
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    invalidParams: {
      description: 'Invalid parameters',
      statusCode: 400
    },
    authRequired: {
      description: 'Valid Authorization header required',
      statusCode: 401
    },
    nonExistent: {
      description: 'Board does not exist',
      statusCode: 404
    },
    serverError: {
      description: 'Unexpected server error',
      statusCode: 500
    }
  },

  fn: async function(inputs, exits) {
    var DefaultDueDates = require('../../../../configuration/DefaultDisplayTimes');
    let titleRegex = new RegExp(sails.config.custom.POSTTITLE_REGEX);

    /*if(!this.req.me) {
      return exits.authRequired();
    }*/
    if(!inputs.title || !inputs.typeOfPost || !inputs.boardId) {
      return exits.missingParams('Missing parameters');
    }
    if(!titleRegex.test(inputs.title)) {
      return exits.invalidParams('Title is too long/short or contains illegal characters');
    }
    const boardId = inputs.boardId;

    // Validate type
    if(![
      'application/calendar',
      'application/msword',
      'application/note',
      'application/pdf',
      'application/poll',
      'application/survey',
      'application/vnd.ms-excel',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ].includes(inputs.typeOfPost)) {
      return exits.invalidParams('Invalid type. Type must match MIME Types');
    }

    // Due date already expired
    if(inputs.dueDate && inputs.dueDate < Date.now()) {
      return exits.invalidParams('Invalid due date');
    }

    // Set default due date when no date is given
    var uDueDate = 0;
    var t = 0;
    if(!inputs.dueDate) {
      switch (inputs.typeOfPost) {
      case 'application/calendar':
        t = DefaultDueDates.DisplayTime.CALENDAR;
        break;
      case 'application/vnd.ms-excel':
        t = DefaultDueDates.DisplayTime.OFFICEFILE;
        break;
      case 'application/vnd.ms-powerpoint':
        t = DefaultDueDates.DisplayTime.OFFICEFILE;
        break;
      case 'application/msword':
        t = DefaultDueDates.DisplayTime.OFFICEFILE;
        break;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        t = DefaultDueDates.DisplayTime.OFFICEFILE;
        break;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        t = DefaultDueDates.DisplayTime.OFFICEFILE;
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        t = DefaultDueDates.DisplayTime.OFFICEFILE;
        break;
      case 'application/note':
        t = DefaultDueDates.DisplayTime.NOTE;
        break;
      case 'application/pdf':
        t = DefaultDueDates.DisplayTime.PDF;
        break;
      case 'application/poll':
        t = DefaultDueDates.DisplayTime.POLL;
        break;
      case 'application/survey':
        t = DefaultDueDates.DisplayTime.SURVEY;
        break;
      case 'image/jpeg':
        t = DefaultDueDates.DisplayTime.IMAGE;
        break;
      case 'image/png':
        t = DefaultDueDates.DisplayTime.IMAGE;
        break;
      default:
        sails.log.debug('POST_CREATE::: ERROR on creating board. There was a type mismatch'
              + 'between accepted types of posts and default due dates');
        return exits.serverError();
      }
      uDueDate = Date.now() + t * (60 * 60 * 1000);
    } else {
      uDueDate = inputs.dueDate;
    }
    // When type is not interactive, set interactive time to 0
    // When interactive time is already expired, return bad request
    var uInteractiveDueDate = 0;
    if(inputs.interactiveDueDate) {
      if([
        'application/calendar',
        'application/poll',
        'application/survey'
      ].includes(inputs.typeOfPost)) {
        if(inputs.interactiveDueDate < Date.now()) {
          return exits.invalidParams('Invalid interactive due date');
        }
        uInteractiveDueDate = inputs.interactiveDueDate;
      }
      // Set default interactive due date when no date is given, and the post is of interactive type
    } else {
      switch (inputs.typeOfPost) {
      case 'application/calendar':
        t = DefaultDueDates.ActiveTime.CALENDAR;
        break;
      case 'application/poll':
        t = DefaultDueDates.ActiveTime.POLL;
        break;
      case 'application/survey':
        t = DefaultDueDates.ActiveTime.SURVEY;
        break;
      default:
        t = 0;
      }
      if(t === 0) {
        uInteractiveDueDate = 0;
      } else {
        uInteractiveDueDate = Date.now() + t * (60 * 60 * 1000);
      }
    }


    var boardExists = await Board.findOne({id: boardId});
    if(!boardExists) {
      return exits.nonExistent();
    }

    sails.log.debug('POSTS_CREATE::: Creating new Post . . .');
    // Create entry in 'post' table
    var createData = {
      typeOfPost: inputs.typeOfPost,
      title: inputs.title,
      content: inputs.content,
      dueDate: uDueDate,
      interactiveDueDate: uInteractiveDueDate,
      creatorId: this.req.me['id']
    };

    var createdPost = await Post.create(createData).fetch();
    await PostLocation.create({
      boardId: boardId,
      postId: createdPost.id
    });

    // Send notifications to all subscribed members
    const recipent = 'brad.leffler58@ethereal.email'; // Delete it if recipent -> member.email
    const subject = 'New post on board #' + boardId;
    const plainText = 'Someone have created a new post on board #' + boardId + 
      '. Check it out! If you want to unsubscribe use the bell on the board!';
    const htmlText = 'Someone have created a new post on board #' + boardId + 
    '. Check it out!<br>If you want to unsubscribe use the bell on the board!';
    const subscribers = await BoardSubscription.find({boardId: boardId});
    for(const subscriber of subscribers) {
      const member = await Member.findOne({memberId: subscriber.memberId});
      if(member) {
        await sails.helpers.sendEmail(recipent, subject, plainText, htmlText) // Later, recipent -> member.email
        .then(() => {
          sails.log.verbose('POSTS_CREATE::: Send notification to user #' + member.id);
        })
        .catch(() => {
          sails.log.verbose('POSTS_CREATE::: Failed to send notification to user #' + member.id);
        });
      }
    }


    if(inputs.skipReturn && inputs.skipReturn === true) {
      return exits.success();
    }
    delete createdPost['updatedAt'];
    return exits.success(createdPost);
  }
};


