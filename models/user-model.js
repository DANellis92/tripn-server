module.exports = (sequelize, DataTypes) => {

    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

    });
    };