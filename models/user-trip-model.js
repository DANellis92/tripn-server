module.exports = (sequelize, DataTypes) => {
  return sequelize.define("trip", {
    tripName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
