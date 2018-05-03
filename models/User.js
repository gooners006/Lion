const { sequelize, Sequelize } = require('./config');
const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    bio: Sequelize.STRING,
    image: Sequelize.STRING,

}, {
    timestamps: true
});
// User.sync({ force: true });
module.exports = User;