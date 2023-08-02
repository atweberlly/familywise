import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { setUser } from '../../slices/slice'
import PDFDoc from '../PDFDoc'
import { PDFViewer } from '@react-pdf/renderer'
import axios from 'axios'

const PDFPreview = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  return (
    <PDFViewer className="min-h-screen">
      <PDFDoc user_id={user._id} user={user} />
    </PDFViewer>
  )
}

export default PDFPreview
