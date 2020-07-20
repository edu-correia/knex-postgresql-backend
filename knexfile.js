const dotenv = require('dotenv')
dotenv.config();

module.exports =  {
  development: {
    client: 'pg',
    connection: {
      port: 5432,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
  onUpdateTrigger: table => `
  CREATE TRIGGER ${table}_update_at
  BEFORE UPDATE ON ${table} 
  FOR EACH ROW 
  EXECUTE PROCEDURE on_update_timestamp();
  `
};