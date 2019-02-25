require('dotenv')
  .config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './__tests__/database.sqlite',
  operatorsAliases: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
