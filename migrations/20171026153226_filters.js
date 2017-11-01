
exports.up = function(knex) {
  return knex.schema.createTable('filters', (table) => {
    table.increments('id');
    table.string('uuid').notNullable();
    table.string('user_name').notNullable().defaultTo('');
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
