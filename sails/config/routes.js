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

/*
    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
    'GET /':                   { action: 'view-homepage-or-redirect' },
    'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },

    'GET /faq':                { action:   'view-faq' },
    'GET /legal/terms':        { action:   'legal/view-terms' },
    'GET /legal/privacy':      { action:   'legal/view-privacy' },
    'GET /contact':            { action:   'view-contact' },

    'GET /signup':             { action: 'entrance/view-signup' },
    'GET /email/confirm':      { action: 'entrance/confirm-email' },
    'GET /email/confirmed':    { action: 'entrance/view-confirmed-email' },

    'GET /login':              { action: 'entrance/view-login' },
    'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
    'GET /password/new':       { action: 'entrance/view-new-password' },

    'GET /account':            { action: 'account/view-account-overview' },
    'GET /account/password':   { action: 'account/view-edit-password' },
    'GET /account/profile':    { action: 'account/view-edit-profile' },


    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
    '/terms':                   '/legal/terms',
    '/logout':                  '/api/v1/account/logout',


    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
    // …

    */

    //
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
    'POST   /api/boards/create': {
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


    //POSTS
    'POST   /api/boards/:boardId/new': {
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
        controller: 'posts/Post',
        action: 'getPost',
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
