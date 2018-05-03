const { sequelize, Sequelize } = require('./config');
const Comment = sequelize.define('comments', {
    body: Sequelize.STRING,
    author: Sequelize.INTEGER,
    articleID: Sequelize.INTEGER
}, {
    timestamps: true
});
// Comment.sync({ force: true });
module.exports = Comment;