const Sequelize = require('sequelize');
const users = Sequelize.import("./models/user-model")
const trips = Sequelize.import("./models/user-trip-model")
const expenses = Sequelize.import("./models/expense-model")


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to red badge project database');
    },
    function(err){
        console.log(err);
    }
    );
    
    users.hasMany(trips)
    trips.belongsTo(users)
    
    trips.hasMany(expenses)
    expenses.belongsTo(trips)
    
    module.exports = sequelize; 