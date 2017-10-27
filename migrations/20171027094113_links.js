
exports.up = function(knex) {
  return knex.schema.createTable('liks', (table) => {
    table.increments('id');
    table.integer('filter_id').notNullable();
    table.json('links')
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('links');
};
