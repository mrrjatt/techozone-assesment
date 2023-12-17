const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json');
const database = config.environment == 'development' ? config.databaseDevelopment : config.databaseProduction ;

const sequelize = new Sequelize(database.database, database.user, database.password, {
  host: database.host,
  port: database.port,
  sslmode : "REQUIRED",
  dialect: 'mysql',  /* one of| 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  dialectOptions: {
    connectTimeout: 70000,
  },
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 5000
  }
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require('./user')(sequelize, DataTypes);
db.forGotPassword = require('./forgotPassword')(sequelize, DataTypes);
db.category = require('./category')(sequelize, DataTypes);
db.support = require('./support')(sequelize, DataTypes);
db.vehicle = require('./vehicle')(sequelize, DataTypes);


//Relations
db.vehicle.hasOne(db.category, { foreignKey: 'id', sourceKey: 'categoryId' })
db.category.hasMany(db.vehicle, { foreignKey: 'categoryId', sourceKey: 'id' })


module.exports = db;