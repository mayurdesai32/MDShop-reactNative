const Product = require('../models/productSchema');
const Category = require('../models/categorySchema');
const AppError = require('../error_handler/AppError');
const wrapAsync = require('../error_handler/AsyncError');
const getDataUri = require('../utils/dataUri');

const cloudinary = require('cloudinary');
// to Create product

const createproduct = wrapAsync(async (req, res, next) => {
  const { name, description, category, price, stock } = req.body;

  if (!name || !description || !category || !price || !stock) {
    return next(new AppError('some of the input fields is missing', 404));
  }

  const file = getDataUri(req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await Product.create({
    name,
    description,
    category,
    price,
    stock,
    images: [image],
  });

  res.status(200).json({
    success: true,
    message: 'Product Created Successfully',
  });
});

// to read all the product
const readallproduct = wrapAsync(async (req, res) => {
  const { keyword, category } = req.query;

  const products = await Product.find({
    name: {
      $regex: keyword ? keyword : '',
      $options: 'i',
    },
    category: category ? category : undefined,
  });

  res.status(200).json({
    success: true,
    products,
  });
});

// to read  the product
const readsingleproduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.params._id).populate('category');
  if (!product) {
    return next(new AppError('product not found', 404));
  }
  res.status(200).json({ success: true, product });
});

// to update the product
const updateproduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params._id);

  if (!product) {
    return next(new AppError('product not found', 404));
  }

  const { name, description, category, price, stock } = req.body;

  if (name) product.name = name;
  if (description) product.description = description;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock) product.stock = stock;

  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product Updated Successfully',
  });
});

// add Product Image
const addProductImage = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError('Product not found', 404));

  if (!req.file) return next(new AppError('Please add image', 400));

  const file = getDataUri(req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  product.images.push(image);
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Image Added Successfully',
  });
});

const deleteProductImage = wrapAsync(async (req, res, next) => {
  const id = req.query._id;

  if (!id) return next(new AppError('Please Image Id', 400));
  const product = await Product.findById(req.params._id);

  if (!product) return next(new AppError('Product not found', 404));

  let isExist = -1;

  product.images.forEach((item, index) => {
    if (item._id.toString() === id.toString()) isExist = index;
  });

  if (isExist < 0) return next(new AppError("Image doesn't exist", 400));

  await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);

  product.images.splice(isExist, 1);

  await product.save();

  res.status(200).json({
    success: true,
    message: 'Image Deleted Successfully',
  });
});

// to delete product
const removeproduct = wrapAsync(async (req, res, next) => {
  let product = await Product.findById(req.params._id);
  if (!product) {
    return next(new AppError('product not found', 404));
  }

  for (let index = 0; index < product.images.length; index++) {
    await cloudinary.v2.uploader.destroy(product.images[index].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: 'Product Deleted Successfully',
  });
});

// to Admin Products
const getAdminProducts = wrapAsync(async (req, res, next) => {
  const products = await Product.find({}).populate('category');

  const outOfStock = products.filter((i) => i.stock === 0);

  res.status(200).json({
    success: true,
    products,
    outOfStock: outOfStock.length,
    inStock: products.length - outOfStock.length,
  });
});

// add category
const addCategory = wrapAsync(async (req, res, next) => {
  await Category.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Category Added Successfully',
  });
});

// get all category
const getAllCategories = wrapAsync(async (req, res, next) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    categories,
  });
});

const deleteCategory = wrapAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new AppError('Category Not Found', 404));
  const products = await Product.find({ category: category._id });

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    product.category = undefined;
    await product.save();
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: 'Category Deleted Successfully',
  });
});

module.exports = {
  createproduct,
  readallproduct,
  readsingleproduct,
  removeproduct,
  updateproduct,
  getAdminProducts,
  addProductImage,
  deleteProductImage,
  addCategory,
  getAllCategories,
  deleteCategory,
};
