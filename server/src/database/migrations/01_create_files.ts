import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('files', table => {
        table.increments('id').notNullable();

        table.string('id_url')
            .notNullable()
            .references('id_url')
            .inTable('id_url')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.string('filename').notNullable();
        table.string('type').notNullable();
        table.binary('file').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('files');
}
