/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
    //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
    //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
    //#region APIs
    //AUTH
    'POST   /api/users/register': {
        controller: 'authentication',
        action: 'register',
        skipAssets: true
    },
    'POST   /api/users/login': {
        controller: 'authentication',
        action: 'login',
        skipAssets: true
    },
    'DELETE   /api/users/logout': {
        controller: 'authentication',
        action: 'logout',
        skipAssets: true
    },
    'POST   /api/users/refresh': {
        controller: 'authentication',
        action: 'refresh',
        skipAssets: true
    },

    //USERS
    'GET    /api/users/:userId': {
        controller: 'users',
        action: 'get',
        skipAssets: true
    },
    'DELETE   /api/users/:userId': {
        controller: 'users',
        action: 'delete',
        skipAssets: true
    },
    'PUT   /api/users/:userId': {
        controller: 'users',
        action: 'update',
        skipAssets: true
    },
    'PUT   /api/users/:userId/updatepassword': {
        controller: 'users',
        action: 'update-password',
        skipAssets: true
    },
    'PUT   /api/users/:userId/updateemail': {
        controller: 'users',
        action: 'update-email',
        skipAssets: true
    },

    //BOARDS
    'GET    /api/boards/:boardId': {
        controller: 'boards',
        action: 'get',
        skipAssets: true
    },
    'POST   /api/boards': {
        controller: 'boards',
        action: 'create',
        skipAssets: true
    },
    'DELETE   /api/boards/:boardId': {
        controller: 'boards',
        action: 'delete',
        skipAssets: true
    },
    'PUT   /api/boards/:boardId': {
        controller: 'boards',
        action: 'update',
        skipAssets: true
    },

    //POLLS
    'POST   /api/polls': {
        controller: 'polls',
        action: 'create',
        skipAssets: true
    },
    'GET   /api/polls': {
        controller: 'polls',
        action: 'get',
        skipAssets: true
    },
    'DELETE   /api/polls': {
        controller: 'polls',
        action: 'delete',
        skipAssets: true
    },
    'PUT   /api/posts': {
        controller: 'polls',
        action: 'update',
        skipAssets: true
    },

    //POSTS
    'POST   /api/boards/:boardId': {
        controller: 'posts',
        action: 'create',
        skipAssets: true
    },
    'GET   /api/posts/all/:boardId': {
        controller: 'posts',
        action: 'get-all',
        skipAssets: true
    },
    'GET   /api/posts/:postId': {
        controller: 'posts',
        action: 'get',
        skipAssets: true
    },
    'DELETE   /api/posts/:postId': {
        controller: 'posts',
        action: 'delete',
        skipAssets: true
    },
    'PUT   /api/posts/:postId': {
        controller: 'posts',
        action: 'update',
        skipAssets: true
    },
    //#endregion

    //Default
    '/*': {
        controller: 'App',
        action: 'serve',
        skipAssets: true,
        skipRegex: /^\/api\/.*$/
    }
};
