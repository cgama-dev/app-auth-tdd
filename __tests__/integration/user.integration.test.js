const { User } = require('../../src/app/models')
const supertest = require('supertest')
const app = require('../../src/app')
const { sequelize } = require('../../src/app/models')
const factory = require('./../factories')

const cleanDB = () => {
    return Promise.all(Object.keys(sequelize.models).map(key => {
        return sequelize.models[key].destroy({ truncate: true, force: true })
    }))
}

beforeEach(async () => {
    await cleanDB()
})

describe("MODULE::Authenticate", () => {

    test("should authenticate with valid crendentials", async () => {

        const user = await factory.create("User", {
            password: "123123"
        });

        //Pegando o método post do supertest
        const { post } = supertest(app)

        const data = await post('/users/authenticate')
            .send({
                email: user.email,
                password: "123123"
            })

        expect(data.status).toBe(200)
    })

    it("should not authenticate with invalid credentials", async () => {

        const user = await factory.create("User", {
            password: "123123"
        });
        //Pegando o método post do supertest
        const { post } = supertest(app)

        const data = await post('/users/authenticate')
            .send({
                email: user.email,
                password: "1212"
            })

        expect(data.status).toBe(401)
    })
    it("should  return JWT when authenticate with invalid credentials", async () => {

        const user = await factory.create("User", {
            password: "123456"
        });

        //Pegando o método post do supertest
        const { post } = supertest(app)

        const data = await post('/users/authenticate')
            .send({
                email: user.email,
                password: "123456"
            })

        expect(data.body.data).toHaveProperty('token')
    })


    it("should be able to access private routes when authenticated", async () => {
        const user = await factory.create("User", {
            password: "123123"
        });

        const { get } = supertest(app)

        const response = await get("/users/dashboard")
            .set("Authorization", `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it("should not be able to access private routes without jwt token", async () => {
        const { get } = supertest(app)

        const response = await get("/users/dashboard");

        expect(response.status).toBe(401);
    });

    it("should not be able to access private routes with invalid jwt token", async () => {

        const { get } = supertest(app)

        const response = await get("/users/dashboard")
            .set("Authorization", `Bearer 123123`);

        expect(response.status).toBe(401);
    });
})