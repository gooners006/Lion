const { sequelize, Sequelize } = require('./config');
const Article = sequelize.define('articles', {
    slug: Sequelize.STRING,
    title: {
        type: Sequelize.STRING,

    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tagList: Sequelize.ARRAY(Sequelize.STRING),
    favorited: Sequelize.BOOLEAN,
    favoritesCount: Sequelize.BIGINT,
    author: Sequelize.JSON
}, {
    timestamps: true
});
// Article.sync({ force: true });

module.exports = Article;