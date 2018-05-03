const { sequelize, Sequelize } = require('./config');
const TagReference = sequelize.define('tagReferences', {
    // articleID: Sequelize.INTEGER,
    // tagID: Sequelize.INTEGER
}, {
    timestamps: true
});
const Tag = require('./Tag');
const Article = require('./Article');

Article.belongsToMany(Tag, { through: 'TagReference', foreignKey: 'articleId' });
Tag.belongsToMany(Article, { through: 'TagReference', foreignKey: 'tagId' });

// sequelize.sync({ force: true });
// TagReference.drop();

module.exports = TagReference;