const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});

sequelize.authenticate().then(
  function() {
    console.log("Connected to red badge project database");
  },
  function(err) {
    console.log(err);
  }
);
const users = sequelize.import("./models/user-model");
const trips = sequelize.import("./models/user-trip-model");
const expenses = sequelize.import("./models/expense-model");

users.hasMany(trips, {
  onDelete: "CASCADE",
  hooks: true
});
trips.belongsTo(users, {
  onDelete: "CASCADE",
  hooks: true
});

trips.hasMany(expenses, {
  onDelete: "CASCADE",
  hooks: true
});
expenses.belongsTo(trips, {
  onDelete: "CASCADE",
  hooks: true
});

users.hasMany(expenses, {
  onDelete: "CASCADE",
  hooks: true
});
expenses.belongsTo(users, {
  onDelete: "CASCADE",
  hooks: true
});

module.exports = sequelize;
