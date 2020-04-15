/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
    '*': true,

    'board/get': true,
    'board/get-all': true,
    'boards/create': 'is-logged-in',
    'boards/delete': 'is-board-owner',
    'boards/update': 'is-board-owner',

    'posts/get-all': true,
    'posts/get': 'is-logged-in',
    'posts/create': 'is-logged-in',
    'posts/delete': 'is-post-owner',
    'posts/update': 'is-post-owner',

    'users/*': 'is-logged-in',
    'users/delete': 'is-self',
    'users/update': 'is-self',
    'users/update-email': 'is-self',
    'users/update-password': 'is-self',
    'users/subscribe-board': true,
    'users/unsubscribe-board': true,

    'polls/*': 'is-logged-in',

    'surveys/*': 'is-logged-in',
    
    'authentication/*': true
};
