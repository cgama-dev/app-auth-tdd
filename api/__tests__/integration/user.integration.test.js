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

describe("TEST INTEGRATION :: MODULE:::Authenticate", () => {

    test("Deve autenticar com crendencias válidas", async () => {

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

    test("Não deve autenticar com password inválido", async () => {

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

        expect(data.status).toBe(404)
    })

    test("Não deve autenticar com email inválido", async () => {

        const user = await factory.create("User");

        //Pegando o método post do supertest
        const { post } = supertest(app)

        const data = await post('/users/authenticate')
            .send({
                email: '',
                password: user.password
            })

        expect(data.status).toBe(404)
    })

    test("Deve retornar um token JWT quando autenticar com credenciais inválidas", async () => {

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

    test("Deve ser capaz de acessar rotas privadas quando autenticado", async () => {
        const user = await factory.create("User", {
            password: "123123"
        });

        const { get } = supertest(app)

        const response = await get("/users/dashboard")
            .set("Authorization", `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    test("Não deve ser possível acessar rotas privadas sem token jwt", async () => {
        const { get } = supertest(app)

        const routeDashboard = await get("/users/dashboard");
        const routeAdmin = await get("/users/restricted");

        expect(routeDashboard.status).toBe(401);
        expect(routeAdmin.status).toBe(401);
    });

    test("Não deve poder acessar rotas privadas com token jwt inválido", async () => {

        const { get } = supertest(app)

        const routeDashboard = await get("/users/dashboard")
            .set("Authorization", `Bearer 123123`);
            
        const routeAdmin = await get("/users/restricted")
            .set("Authorization", `Bearer 123123`);

        expect(routeDashboard.status).toBe(401);
        expect(routeAdmin.status).toBe(401);
    });

    test("Deve ser capaz de acessar rotas privadas com permissão", async () => {

        const user = await factory.create("User", {
            password: "123123",
            role: 'admin'
        });
        const { get } = supertest(app)

        const response = await get("/users/restricted")
            .set("Authorization", `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    test("Não deve conseguir acessar rotas privadas sem permissão", async () => {

        const user = await factory.create("User", {
            password: "123123",
            role: 'user'
        });
        const { get } = supertest(app)

        const response = await get("/users/restricted")
            .set("Authorization", `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(403);
    });
})