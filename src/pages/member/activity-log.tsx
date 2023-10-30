import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Heading from '../../components/Heading'
import Title from '../../components/Title'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
// Import moment for date formatting
import '../../styles/Activity.css'
import axios from 'axios'
import moment from 'moment'

// Import custom styles

const Activity = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const maxDisplayPages = 5
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const [loading, setLoading] = useState(false)
  const [activityLogs, setActivityLogs] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  useEffect(() => {
    // Make sure user._id is available
    if (user._id) {
      const fetchData = async () => {
        setLoading(true)
        try {
          // Set the API endpoint with the user._id as a query parameter
          const configuration = {
            method: 'get',
            url: `/api/activity?email=${user.email}`,
          }

          // Assuming that the response contains an 'activityLogs' property
          await axios(configuration)
            .then((response) => {
              // console.log(response)
              setActivityLogs(response.data.result)
              setLoading(false)
            })
            .catch((error) => {
              console.log(error)
            })
        } catch (error) {
          console.log(error) // Log the error for debugging
          setLoading(false)
        }
      }

      // Fetch data
      fetchData()
    } else {
      setLoading(false)
    }
  }, [user.email])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = activityLogs.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(activityLogs.length / itemsPerPage)
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
    const startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 3))
    const endPage = Math.min(totalPages, startPage + maxDisplayPages - 3)

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
      <Title>Activity Log</Title>
      <div className="activity-container dark:bg-transparent dark:text-white-700 dark:outline">
        <Heading className="activity-heading dark:text-white-700" size={3}>
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
              {loading ? (
                <div>Loading...</div>
              ) : (
                currentItems.map(({ _id, description, date }) => (
                  <tr key={_id}>
                    <td className="activity-description">
                      {shortenDescription(description, 100)}{' '}
                      {description.length > 100 && (
                        <button
                          className="see-more-button"
                          onClick={() => alert(description)} // Replace with your modal logic
                        >
                          See More
                        </button>
                      )}
                    </td>
                    <td className="activity-date">{moment(date).format('MMMM D, YYYY h:mm A')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button onClick={() => paginate(currentPage - 1)} className="page-link">
                  {`<`}
                </button>
              </li>
              {renderPageNumbers()}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button onClick={() => paginate(currentPage + 1)} className="page-link">
                  {`>`}
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
