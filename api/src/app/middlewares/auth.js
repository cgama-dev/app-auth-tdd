const jsonwebtoken = require('jsonwebtoken')

const authorized = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Acesso restrito' })
    }

    const token = req.headers.authorization.split("Bearer ").join("")

    try {
        const decoded = await jsonwebtoken.verify(token, process.env.JWT_TOKEN)
        return next()
    } catch (err) {
        return res.status(401).send({ message: 'Token inválido' })
    }
}

module.exports = { authorized }