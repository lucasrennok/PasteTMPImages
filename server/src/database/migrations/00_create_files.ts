import Knex from 'knex';

//Create a 'files' table
export async function up(knex: Knex){
    return knex.schema.createTable('files', table => {
        table.increments('id').primary();

        table.string('id_url').notNullable();

        table.string('filename').notNullable();
        table.string('type').notNullable();
        table.binary('file').notNullable();
    });
}

//Drop table when something gone wrong
export async function down(knex: Knex){
    return knex.schema.dropTable('files');
}
