const mongoose = require('mongoose')
const { urlDb } = require('../config')
mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
})
const db = mongoose.connection
module.exports = db
