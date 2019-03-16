const jsonwebtoken = require('jsonwebtoken')

const authorized = async (req, res, next) => {

    console.log(req.headers.authorization)
    if (!req.headers.authorization || req.headers.authorization.indexOf("Bearer ") < 0) {
        return res.status(401).send({ message: 'Acesso restrito' })
    }

    const token = req.headers.authorization.split("Bearer ").join("")

    try {
        await jsonwebtoken.verify(token, process.env.JWT_TOKEN)
        return next()
    } catch (err) {
        return res.status(401).send({ message: 'Token inválido' })
    }
}

const isAdmin = async (req, res, next) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf("Bearer ") < 0) {
        return res.status(401).send({ message: 'Acesso restrito' })
    }

    const token = req.headers.authorization.split("Bearer ").join("")

    try {
        const userDecoded = await jsonwebtoken.verify(token, process.env.JWT_TOKEN)
        if (userDecoded.role === 'admin') {
            return next()
        } else {
            return res.status(403).send({ message: 'Acesso restrito, você não possui permissão' })
        }
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido' })
    }

}

module.exports = { authorized, isAdmin }