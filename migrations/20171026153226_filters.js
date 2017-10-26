
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('team_id').notNullable().defaultTo('');
    table.string('team_domain').notNullable().defaultTo('');
    table.string('channel_id').notNullable().defaultTo('');
    table.string('channel_name').notNullable().defaultTo('');
    table.string('user_name').notNullable().defaultTo('');
    table.string('user_id').notNullable().defaultTo('');
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.integer('beds').notNullable();
    table.integer('baths').notNullable();
    table.string('zip').notNullable().defaultTo('');
    table.string('min').notNullable().defaultTo('');
    table.string('max').notNullable().defaultTo('');
    table.boolean('pet_friendly').notNullable();
    table.boolean('photo').notNullable();
    table.boolean('notify').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('filters');
};
