import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('id_url', table => {
        table.string('id_url').primary();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('id_url');
}
