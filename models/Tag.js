const { sequelize, Sequelize } = require('./config');

const Tag = sequelize.define(
  'tags',
  {
    name: Sequelize.STRING,
  },
  {
    timestamps: true,
  },
);
// Tag.sync({ force: true });
module.exports = Tag;
