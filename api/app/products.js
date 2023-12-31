const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
  const sort = {};
  const query = {};

  if (req.query.orderBy === 'price' && req.query.direction === 'desc') {
    sort.price = -1;
  }

  if (req.query.filter === 'image') {
    query.image = {$ne: null};
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  try {
    const products = await Product
      .find(query)
      .sort(sort)
      .populate('category', 'title description');

    res.send(products);
  } catch {
    res.sendStatus(500);
  }
});

router.get('/myproducts', auth, async (req, res) => {
    const user = req.user;
    try {
        const products = await Product.find({user: user._id}).populate('category user');
        res.send(products);
    
    } catch {
      res.sendStatus(500);
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category user');

    if (!product) {
      res.status(404).send({message: 'Product not found!'});
    }

    res.send(product);
  } catch {
    res.sendStatus(500);
  }
});


router.post('/', auth, permit('user', 'admin'), upload.single('image'), async (req, res) => {
    const user = req.user; 
  try {
    const {title, price, category, description, publish} = req.body;
    const productData = {
      title,
      price,
      category,
      description: description || null,
      image: null,
      publish,
      user: user._id
    };

    if (req.file) {
      productData.image = 'uploads/' + req.file.filename;
    }

    const product = new Product(productData);
    await product.save();

    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put('/:id', auth, permit('user', 'admin'), upload.single('image'), async (req, res) => {
  try {
    const {title, description, price, category, publish} = req.body;
    
    const productData = {
      title,
      price,
      description,
      publish,
      category
    };

    if (req.file) {
      productData.image = 'uploads/' + req.file.filename;
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).send({message: 'Product not found!'});
    }

    const updateProduct = await Product.findByIdAndUpdate(req.params.id, productData, {new: true});
    
    res.send(updateProduct);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;