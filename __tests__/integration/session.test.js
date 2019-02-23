const { User } = require('./../../src/app/models')

describe("Authenticate", () => {
    test("should authenticate with valid crendentials", async () => {
        const user = {
            email: 'cleytongama@gmail.com',
            password_hash: '123123'
        }

        const data = await User.create(user)

        expect(data.email).toBe('cleytongama@gmail.com')
    })
})