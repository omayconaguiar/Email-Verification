// Update with your config settings.
require('dotenv').config({path: __dirname + '/..env'})

module.exports = {
    client: 'mysql',
    connection: {
      database: process.env.database,
      user:     process.env.user,
      password: process.env.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
