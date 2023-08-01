const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
  await mongoose.connect(config.mongo.db);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {

    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [admin, user] = await User.create(
    {
      username: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
      token: nanoid(),
      role: 'admin',
      avatar: '',
    },
    {
      username: 'User',
      email: 'user@gmail.com',
      password: 'user',
      token: nanoid(),
      role: 'user',
      avatar: '',
    },
  )


  const [furniture, tehnologes, accessuars] = await Category.create(
    {
      title: 'Фурнитура',
    },
    {
      title: 'Технология',
    },
    {
      title: 'Акссусуары',
    },
  );

  const [product1, product2, product3] = await Product.create(
    {
      title: 'Лампа',
      category: accessuars._id,
      user: user._id,
      description:
        'Красивая лампа.',
      price: 5500,
      image: ''
    },
    {
      title: 'Гаджет',
      category: tehnologes._id,
      user: admin._id,
      description:
        'Удивительный гаджет.',
      price: 3000,
      image: ''
    },
    {
      title: 'Пуговки',
      category: furniture._id,
      user: user._id,
      description:
        'Сверкающие пуговицы.',
      price: 500,
      image: ''
    },
  )

  await mongoose.connection.close()
}

run().catch(console.error)
