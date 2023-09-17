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
import ShippingScreen from './screens/ShippingScreen'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import Profilescreen from './screens/Profilescreen'
import OrderListScreen from './screens/admin/OrderListScreen'
import ProductListScreen from './screens/admin/ProductListScreen'
import ProductEditScreen from './screens/admin/ProductEditScreen'
import UserListScreen from './screens/admin/UserListScreen'
import UserEditScreen from './screens/admin/UserEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/search/:keyword' element={<HomeScreen />} exact />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              element={<HomeScreen />}
            />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />

            {/* User private routes starts */}
            <Route path='' element={<PrivateRoute />}>
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/profile' element={<Profilescreen />} />
            </Route>
            {/* User private routes ends */}

            {/* Admin Routes starts */}
            <Route path='' element={<AdminRoute />}>
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route
                path='/admin/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            </Route>
            {/* Admin Routes ends */}
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App
