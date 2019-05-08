module.exports =(sequelize, DataTypes) => {

     return sequelize.define('trip', {
        tripName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
}