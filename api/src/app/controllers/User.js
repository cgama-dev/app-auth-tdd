const { User } = require('./../models')

class UserController {

    async authenticate(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).send({ message: 'Usuário não encontrado', error: true })
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).send({ message: 'Senha inválida', error: true })
        }

        return res.status(200).send({
            message: 'User authenticate',
            data: { user, token: user.generateToken() }
        })
    }
}

module.exports = new UserController()