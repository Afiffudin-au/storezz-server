const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'email harus diisi'],
    },
    name: {
      type: String,
      require: [true, 'nama harus diisi'],
      maxlength: [225, 'panjang nama harus antara 3 - 225 karakter'],
      minlength: [3, 'panjang nama harus antara 3 - 225 karakter'],
    },
    username: {
      type: String,
      require: [true, 'username harus diisi'],
      maxlength: [225, 'panjang username harus antara 3 - 225 karakter'],
      minlength: [3, 'panjang username harus antara 3 - 225 karakter'],
    },
    password: {
      type: String,
      require: [true, 'password harus diisi'],
      maxlength: [225, 'panjang password max 225 karakter'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'Y',
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, 'nomer telephon harus diisi'],
      maxlength: [18, 'panjang nomer telephon harus antara 9 - 18 karakter'],
      minlength: [9, 'panjang nomer telephon harus antara 9 - 18 karakter'],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },

  { timestamps: true }
)
playerSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('Player').countDocuments({ email: value })
      return !count
    } catch (err) {
      throw err
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
)

playerSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND)
  next()
})
module.exports = mongoose.model('Player', playerSchema)
