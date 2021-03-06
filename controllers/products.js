const Product = require('../models/Product');
const catchAsync = require('../middleware/catchAsync');
const ErrorResponse = require('../utils/ErrorResponse');

/**
 * Route:       GET /api/products
 * Description: Get all products
 * Access:      Public
 */
exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  return res.status(200).json({success: true, count: products.length, data: products});
})

/**
 * Route:       GET /api/products/:id
 * Description: Get single product
 * Access:      Public
 */
 exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404))
  }

  return res.status(200).json({success: true, data: product});
})

/**
 * Route:       POST /api/products
 * Description: Create a new product
 * Access:      Private/Admin
 */
 exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  return res.status(201).json({success: true, data: newProduct});
})

/**
 * Route:       PUT /api/products/:id
 * Description: Update product
 * Access:      Private/Admin
 */
 exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  return res.status(200).json({success: true, data: product});
})

/**
 * Route:       DELETE /api/products/:id
 * Description: Delete product
 * Access:      Private/Admin
 */
 exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Product not found with id ${req.params.id}`, 404));
  }

  await product.remove();
  
  return res.status(200).json({success: true, data: {}});
})