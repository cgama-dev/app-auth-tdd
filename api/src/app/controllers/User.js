const { User } = require('./../models')

class UserController {

    async query(req, res, next) {
        try {
            
            const users = await User.findAll({ limit: 10 })
            
            return res.status(200).send({
                message: 'Usuários encontrados com sucesso',
                data: users
            })

        } catch (error) {
            return res.status(400).send({ message: 'Erro ao buscar usuários', error })
        }
    }

    async authenticate(req, res, next) {

        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado', error: true })
        }

        if (!(await user.checkPassword(password))) {
            return res.status(404).send({ message: 'Usuário ou senha inválidos', error: true })
        }

        return res.status(200).send({
            message: 'User authenticate',
            data: { user, token: user.generateToken() }
        })
    }
}

module.exports = new UserController()