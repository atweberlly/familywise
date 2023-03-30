import { useState, useEffect, SetStateAction } from 'react'
import Heading from '../../components/Heading'
import Pagination from '../../components/Paginations'
import TableLayout from '../../components/TableLayout'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import axios from 'axios'
import dateFormat from 'dateformat'
import { Table, TextInput } from 'flowbite-react'
import { NextPage } from 'next'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const MemberList: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [Subscribers, setSubscribers] = useState<Array<any>>([])
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)
  const subscriberHeader = ['Email', 'Full Name', 'Country', 'Date Subscribed', 'Plan', 'Status']

  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
      setLoading(true)
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/users',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          const data = response.data.result
          setSubscribers(data)
          setLoading(false)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    fetchData()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = Subscribers.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber)

  return (
    <AdminLayout>
      <div>
        <Heading size={3}>Members</Heading>
        <p className="text-base">Lists of subscribers</p>
        <div className="my-10 text-center">
          <Title>Members</Title>
          <div className="max-w-auto relative overflow-x-auto rounded-lg bg-white p-6 dark:bg-[#323337]">
            <div className="mt-3 flex justify-between">
              <TextInput
                id="search"
                type="text"
                placeholder="Search"
                required={true}
                icon={MagnifyingGlassIcon}
              />
            </div>
            <div className="mt-8">
              <TableLayout
                header={subscriberHeader.map((title) => {
                  return <Table.HeadCell key={title}>{title}</Table.HeadCell>
                })}
                body={currentPosts?.map(
                  ({ _id, email, firstname, lastname, country, createdAt, planType, status }) => {
                    return (
                      <Table.Row className="bg-white" key={_id}>
                        <Table.Cell>{email}</Table.Cell>
                        <Table.Cell>
                          {firstname} {lastname}
                        </Table.Cell>
                        <Table.Cell>{country}</Table.Cell>
                        <Table.Cell>{dateFormat(createdAt, 'longDate')} </Table.Cell>
                        <Table.Cell>{planType}</Table.Cell>
                        <Table.Cell>
                          <span
                            className={`rounded-full px-4 py-2 font-semibold ${
                              status === true
                                ? 'bg-teal-100 text-primary-500'
                                : 'bg-gray-100 text-gray-500'
                            } capitalize`}
                          >
                            {status ? 'Active' : 'Inactive'}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    )
                  }
                )}
                loader={loading}
              />

              <div className="mt-4 flex items-center justify-center text-center">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={Subscribers.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default MemberList
