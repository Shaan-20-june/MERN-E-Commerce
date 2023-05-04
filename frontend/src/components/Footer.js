import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Import all Components here

// Import all CSS files here

const Footer = (props) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; E-Commerce</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
