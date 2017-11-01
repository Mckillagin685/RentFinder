
exports.up = function(knex) {
  return knex.schema.createTable('links', (table) => {
    table.increments('id');
    table.string('filter_uuid').notNullable();
    table.json('links')
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('links');
};
