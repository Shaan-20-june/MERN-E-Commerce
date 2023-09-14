import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ totalPages, currentPage, isAdmin = false }) => {
  return (
    totalPages > 1 && (
      <Pagination>
        {[...Array(totalPages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!isAdmin ? `/page/${x + 1}` : `/admin/productList/${x + 1}`}
          >
            <Pagination.Item active={x + 1 === currentPage} activeLabel=''>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate