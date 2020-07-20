require('custom-env').env('development')

module.exports = {

  development: {
    client: 'pg',
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
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
