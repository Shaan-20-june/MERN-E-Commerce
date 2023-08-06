import React from 'react'
import { Row, Col } from 'react-bootstrap'

import { useGetProductsQuery } from '../slices/productsApiSlice'

// Import all files/Components here
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

// Import all CSS files here

const HomeScreen = (props) => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
