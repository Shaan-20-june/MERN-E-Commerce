import asyncHandler from '../middlewares/asyncHandler.js'
import Product from '../models/productModel.js'

// @desc    Fetch All Products
// @route   GET api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // pageSize = Number of products in one page
  const pageSize = process.env.PAGINATION_LIMIT

  const currentPage = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const totalProductCount = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (currentPage - 1))

  res.json({
    products,
    currentPage,
    totalPages: Math.ceil(totalProductCount / pageSize),
  })
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

// @desc    Create a Sample Product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a Product
// @route   PUT api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @desc    Delete a Product
// @route   DELETE api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await Product.deleteOne({ _id: req.params.id })
    res.json({ message: 'Product removed!' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @desc    Create a new review
// @route   POST api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed!')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, review) => review.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added!' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

// @desc    Get Top Rated Products
// @route   GET api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
}
