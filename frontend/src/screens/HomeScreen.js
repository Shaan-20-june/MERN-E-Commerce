import React from 'react'
import { Row, Col } from 'react-bootstrap'

// Import all files/Components here
import Product from '../components/Product'
import products from '../products'

// Import all CSS files here

const HomeScreen = (props) => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
