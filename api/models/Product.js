const mongoose = require('mongoose')

const { Schema } = mongoose

const ProductSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
    type: String,
    required: { message: 'Введите название' },
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  description: {
    type: String,
  },
  price: {
    type: Number
  },
  image: {
    type: String
  }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
