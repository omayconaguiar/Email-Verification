
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.integer('cpf').notNull().unique()
        table.string('password').notNull()
        table.string('name').notNull()
        table.integer('cell').notNull()
        table.string('email').notNull().unique()
        table.date('birthday')
        table.integer('cep').notNull()
        table.string('place').notNull()
        table.integer('number').notNull()
        table.string('complement').notNull()
        table.string('neighborhood').notNull()
        table.string('city').notNull()
        table.string('state').notNull()
        table.integer('rg').notNull().unique()
        table.date('expedition')
        table.string('whereexpedition').notNull()
        table.string('civilstate').notNull()
        table.string('category').notNull()
        table.string('company').notNull()
        table.string('profission').notNull()
        table.string('salary').notNull()
        table.boolean('admin').notNull().defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
