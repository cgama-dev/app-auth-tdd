const bcrypt = require("bcrypt");
const { sequelize } = require('../../src/app/models')
const { User } = require("../../src/app/models");

const cleanDB = () => {
    return Promise.all(Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({ truncate: true, force: true })
    }))
}

beforeEach(async () => {
    // await cleanDB();
});

describe("TEST UNIT :: MODULE :: Authenticate", () => {
    test("Deve criptografar a senha do usuário", async () => {
        const user = await User.create({
            name: "Cleyton",
            email: "cleytongama@gmail.com",
            password: "123456",
            role: 'admin'
        });

        const compareHash = await bcrypt.compare("123456", user.password_hash);

        expect(compareHash).toBe(true);
    });
});