'use strict';

module.exports = (hook) => {
  if(!hook.params.user || !hook.params.user.isAdmin) {
    throw new Error('You need to be a logged-in admin!');
  }
};