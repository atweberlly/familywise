import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import { setUser } from '../../slices/slice'
import axios from 'axios'
import type { NextPage } from 'next'

const Administrator: NextPage = () => {
  const [Newsletter, setNewsletter] = useState<Array<any>>([])
  const [Subscribers, setSubscribers] = useState<Array<any>>([])

  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchNewsletter = async () => {
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/newsletter',
        params: {
          count: 10,
        },
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          const data = response.data.newsletter.members
          setNewsletter(data)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    fetchNewsletter()
    const fetchSubscribers = async () => {
      // set configurations
      const configuration = {
        method: 'get',
        url: '/api/users',
      }

      // make the API call
      await axios(configuration)
        .then((response) => {
          const data = response.data.result
          console.log(data)
          setSubscribers(data)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    fetchSubscribers()
  }, [])
  return (
    <AdminLayout>
      <Title>Admin</Title>

      <h1>Hi, {user.firstname}. Welcome back!</h1>

      <div className="mt-4 " role="grid">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 " role="row">
          <div role="gridcell">
            <div className="rounded-lg bg-white px-6 py-5 dark:bg-[#323337]">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Subscribers</h2>
                <Link
                  className="rounded-full bg-[#B99D7E] px-4 py-2 text-center text-sm text-white dark:bg-[#9E7558]"
                  href="/admin/newsletter"
                >
                  View all
                </Link>
              </div>

              <hr className="my-2" />

              <div className="children:pt-2 space-y-2 divide-y ">
                {Newsletter?.map(({ id, full_name, email_address }) => {
                  return (
                    <div key={id}>
                      <div>{full_name}</div>
                      <p className="text-sm text-secondary-500 dark:text-[#E2E2E2]">
                        {email_address}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div role="gridcell">
            <div className="rounded-lg bg-white px-6 py-5 dark:bg-[#323337] ">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">10 Active Members</h2>
                <Link
                  className="rounded-full bg-[#B99D7E] px-4 py-2 text-center text-sm text-white dark:bg-[#9E7558] "
                  href="/admin/subscribed-members"
                >
                  View all
                </Link>
              </div>

              <hr className="my-2" />

              <div className="children:pt-2 space-y-2 divide-y ">
                {Subscribers?.map(
                  ({ _id, firstname, lastname, email, roles, planType, status }) => {
                    return (
                      status === true && (
                        <div className="flex items-center justify-between" key={_id}>
                          <div>
                            <p>
                              {firstname} {lastname}
                            </p>
                            <p className="text-sm text-secondary-500 dark:text-[#E2E2E2] ">
                              {email}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#B99D7E] px-3 py-1 text-sm text-white dark:bg-[#a07b60] dark:text-white">
                            {planType}
                          </span>
                        </div>
                      )
                    )
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Administrator
