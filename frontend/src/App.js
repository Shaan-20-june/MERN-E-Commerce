import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import all custom components here
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App
