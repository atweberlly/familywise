import Heading from '../../components/Heading'
import Title from '../../components/Title'
import MemberLayout from '../../layouts/MemberLayout'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const StoryPDF = dynamic(() => import('../../components/_member/PDFPreview'), {
  ssr: false,
})

const Preview = () => {
  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <MemberLayout>
      <Title>Membership</Title>
      <Heading className="mb-10" size={3}>
        Book Preview
      </Heading>
      {client && <StoryPDF />}
    </MemberLayout>
  )
}

export default Preview
