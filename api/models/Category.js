const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: { message: 'Введите название категории' },
    unique: true,
  },
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
