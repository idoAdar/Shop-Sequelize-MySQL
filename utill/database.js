const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '239738416', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;