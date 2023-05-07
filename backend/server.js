import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('API is working!')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id
  const product = products.find((product) => product._id === productId)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})
