import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import Title from '../../components/Title'
import MemberLayout from '../../layouts/MemberLayout'
// Import moment for date formatting
import '../../styles/Activity.css'
import moment from 'moment'

// Import custom styles

const Activity = () => {
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const maxDisplayPages = 5

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/activity/getData')
        const result = await response.json()
        if (result.success) {
          setData(result.data)
        } else {
          console.error('Failed to fetch data.')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const maxPage = Math.min(totalPages, maxDisplayPages)

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1) {
      setCurrentPage(1)
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages)
    } else {
      setCurrentPage(pageNumber)
    }
  }

  const shortenDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description
    return description.substring(0, maxLength) + '...'
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2))
    const endPage = Math.min(totalPages, startPage + maxDisplayPages - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button onClick={() => paginate(i)} className="page-link">
            {i}
          </button>
        </li>
      )
    }

    return pageNumbers
  }

  return (
    <MemberLayout>
      <div className="activity-container">
        <Title>Activity Log</Title>
        <Heading className="activity-heading" size={3}>
          Activity Log
        </Heading>

        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id}>
                  <td className="activity-description">
                    {shortenDescription(item.description, 100)}{' '}
                    {item.description.length > 100 && (
                      <button
                        className="see-more-button"
                        onClick={() => alert(item.description)} // Replace with your modal logic
                      >
                        See More
                      </button>
                    )}
                  </td>
                  <td className="activity-date">
                    {moment(item.date).format('MMMM D, YYYY h:mm A')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button onClick={() => paginate(currentPage - 1)} className="page-link">
                  Previous
                </button>
              </li>
              {renderPageNumbers()}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button onClick={() => paginate(currentPage + 1)} className="page-link">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </MemberLayout>
  )
}

export default Activity
