import { useEffect } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { setUser } from '../../slices/slice'
import PDFDoc from '../PDFDoc'

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
      <PDFDoc user_id={user._id} />
    </PDFViewer>
  )
}

export default PDFPreview
