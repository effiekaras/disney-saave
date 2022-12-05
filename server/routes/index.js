/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/users', require('./users.js')(router));
    app.use('/api/users/:username', require('./users.js')(router));
    app.use('/api/lists', require('./lists.js')(router));
    app.use('/api/lists/:id', require('./lists.js')(router));
};


