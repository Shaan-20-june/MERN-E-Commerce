import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

// import all routers
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())

// Use the routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

// Get the paypal client id
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

// Set up static folder for image upload
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // any route that is not handled by our api will be directed to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is working!')
  })
}

// Error handler middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})
