import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('files', table => {
        table.increments('id').notNullable();

        table.string('id_url')
            .notNullable()
            .references('id')
            .inTable('id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.binary('file').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('files');
}
