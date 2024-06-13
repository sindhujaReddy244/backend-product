const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).send({ message: 'Product not created', error: error.message });
  }
};

// Get all products with optional filtering
exports.getProducts = async (req, res) => {
  const { name, category } = req.query;
  const filter = {};
  
  if (name) filter.name = new RegExp(name, 'i');
  if (category) filter.category = category;

  try {
    const products = await Product.find(filter);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.status(200).send({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).send({ message: 'Product not updated', error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};
