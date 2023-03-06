import Title from '../../components/Title'
import AdminLayout from '../../layouts/AdminLayout'
import axios from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Administrator: NextPage = () => {
  const [Newsletter, setNewsletter] = useState<Array<any>>([])

  //fetch all data
  useEffect(() => {
    //setLoading(true)
    const fetchData = async () => {
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
          console.log(data)
          setNewsletter(data)
        })
        .catch((error) => {
          error = new Error()
        })
    }
    // fetch data
    fetchData()
  }, [])
  return (
    <AdminLayout>
      <Title>Admin</Title>

      <h1>Hi, Joe. Welcome back!</h1>

      <div className="mt-4" role="grid">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2" role="row">
          <div role="gridcell">
            <div className="rounded-lg bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Subscribers</h2>
                <Link
                  className="rounded-full bg-primary-500 px-4 py-2 text-center text-sm text-white"
                  href="/admin/newsletter"
                >
                  View all
                </Link>
              </div>

              <hr className="my-2" />

              <div className="children:pt-2 space-y-2 divide-y">
                {Newsletter?.map(({ id, full_name, email_address }) => {
                  return (
                    <div key={id}>
                      <div>{full_name}</div>
                      <p className="text-sm text-secondary-500">{email_address}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div role="gridcell">
            <div className="rounded-lg bg-white px-6 py-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Activity Logs</h2>
                <div className="rounded-full bg-primary-500 px-2 py-1 text-center text-sm text-white">
                  15
                </div>
              </div>

              <hr className="my-2" />

              <div className="children:pt-2 space-y-2 divide-y">
                <div>
                  <div>Chris Fox</div>
                  <p className="text-sm text-secondary-500">chrisfox@gmail.com</p>
                </div>

                <div>
                  <div>Chris Fox</div>
                  <p className="text-sm text-secondary-500">chrisfox@gmail.com</p>
                </div>

                <div>
                  <div>Chris Fox</div>
                  <p className="text-sm text-secondary-500">chrisfox@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-auto text-center">Copyright &copy; familyfortunate 2022 | Privacy Policy</p>
    </AdminLayout>
  )
}

export default Administrator
