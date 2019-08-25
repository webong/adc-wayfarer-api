const swagger = require('./swagger.json');
const register = require('./auth/register.json');
const login = require('./auth/login.json');

swagger.paths['/auth/register'] = register;
swagger.paths['/auth/login'] = login;

module.exports = swagger;
