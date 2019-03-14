const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        role: {
            type: DataTypes.STRING,
            default: 'user'
        },
        password: {
            type: DataTypes.VIRTUAL
        },
        password_hash: DataTypes.STRING,

    }, {
            hooks: {
                beforeSave: async user => {
                    if (user.password) {
                        user.password_hash = await bcrypt.hash(user.password, 10)
                    }
                }
            }
        })

    User.prototype.checkPassword = function (password) {
        return bcrypt.compare(password, this.password_hash)
    }

    User.prototype.generateToken = function () {
        return jsonwebtoken.sign({
            id: this.id,
            email: this.email,
            name: this.name,
            role: this.role
        }, process.env.JWT_TOKEN)
    }

    return User
}