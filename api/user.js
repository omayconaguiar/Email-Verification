const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
 
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = {...req.body}
        if(req.params.id) user.id= req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.cpf, 'Cpf não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.name, 'Nome não informada')
            existsOrError(user.cell, 'Telefone não informada')
            existsOrError(user.email, 'Email não informada')
            existsOrError(user.birthday, 'Nascimento não informada')
            existsOrError(user.cep, 'Cep não informada')
            existsOrError(user.place, 'Logradouro não informada')
            existsOrError(user.number, 'Número não informada')
            existsOrError(user.complement, 'Complemento não informada')
            existsOrError(user.neighborhood, 'Bairro não informada')
            existsOrError(user.city, 'Cidade não informada')
            existsOrError(user.state, 'Estado não informada')
            existsOrError(user.rg, 'Rg não informada')
            existsOrError(user.expedition, 'Expedição não informada')
            existsOrError(user.whereexpedition, 'Orgão Expedidor não informada')
            existsOrError(user.civilstate, 'Estado Civil não informada')
            existsOrError(user.category, 'Categoria não informada')
            existsOrError(user.company, 'Empresa não informada')
            existsOrError(user.profission, 'Profissao não informada')
            existsOrError(user.salary, 'Renda Bruta não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

                const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    
    

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name','admin', 'email', 'cpf','cell','birthday','cep','place','number','complement','neighborhood','city','state','rg','expedition','whereexpedition','civilstate','category','company','profission','salary')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
        .select('id', 'name', 'email','admin', 'cpf','cell','birthday','cep','place','number','complement','neighborhood','city','state','rg','expedition','whereexpedition','civilstate','category','company','profission','salary')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }


    return { save, get, getById }
}