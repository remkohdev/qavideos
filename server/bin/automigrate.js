var app = require('../server');
var dataSource = app.dataSources.postgresdb;
dataSource.automigrate([
  /**'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'Note',*/
  'Video'
], function(err) {
  if (err) throw err;
});