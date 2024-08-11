require('dotenv').config()

const { Sequelize, Op } = require('sequelize')
var initModels = require('./models/init-models')

console.log(
  process.env.DATABASE_NAME,
  process.env.DATABASE_HOST,
  process.env.DATABASE_PASSWORD,
  'name,host,password'
)

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'ls-9ba3eb7576eaa8e049c5a97cd1ec376fc53e68ce.c7gywdnmat61.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    port: '3306',
  }
)

sequelize
  .authenticate()
  .then((res) => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

var models = initModels(sequelize)
module.exports = { models, sequelize }
