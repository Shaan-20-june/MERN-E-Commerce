import asyncHandler from '../middlewares/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc    Fetch All Products
// @route   GET api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc    Fetch Single Product
// @route   GET api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)

  // If product found
  if (product) return res.json(product)

  // If product not found
  res.status(404)
  throw new Error('Resource Not Found')
})

export { getProductById, getProducts }
