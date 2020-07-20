const { onUpdateTrigger } = require('../../../knexfile');

exports.up = async function(knex) {
    return knex.schema.createTable('projects', function(table){
        table.increments('id')
        table.text('title')

        table.integer('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')

        table.timestamps(true, true)
    }).then(() => knex.raw(onUpdateTrigger('projects')))
};

exports.down = async function(knex) {
    return knex.schema.dropTable('projects')
};

