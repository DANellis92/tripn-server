module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true
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
      allowNull: false,
      isUnique: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};
