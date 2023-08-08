import React from 'react'
import { createTw } from 'react-pdf-tailwind'
import { Document as PdfDocument, Page as PdfPage, Text, Image } from '@react-pdf/renderer'
import axios from 'axios'
import striptags from 'striptags'

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Helvetica'],
      sansItalic: ['Helvetica-Oblique'],
      title: ['Times-Roman'],
    },
    extend: {
      colors: {
        custom: '#bada55',
      },
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
  },
})

const PDFDoc = ({ item, index, user_id }: any) => {
  const [data, setData] = React.useState<any[]>([])

  React.useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/stories/getStories', { user_id: user_id })
      if (res.status === 200) {
        console.log(res.data)
        setData([...res.data])
      }
    })()
  }, [user_id])

  //This is incredibly hard!
  const processTextWithFormatting = (text: string) => {
    const parsedText = striptags(text, ['b', 'i', 'u', 'em', 'strong'])
    const segments = parsedText.split(
      /(<b>)|(<\/b>)|(<i>)|(<\/i>)|(<u>)|(<\/u>)|(<em>)|(<\/em>)|(<strong>)|(<\/strong>)/g
    )

    let italicActive = false
    let boldActive = false
    let indexCount = 0

    const styledText = segments.map((segment) => {
      switch (segment) {
        case '<strong>':
          boldActive = true
          return null
        case '<em>':
          italicActive = true
          return null
        case '</strong>':
          boldActive = false
          return null
        case '</em>':
          italicActive = false
          return null
        default:
          if (segment) {
            let textStyle = tw('text-base leading-loose text-justify m-0')
            if (italicActive && boldActive) {
              textStyle = tw('text-black font-semibold italic leading-loose text-justify m-0')
            } else if (italicActive) {
              textStyle = tw('text-[#3E3F5E] italic text-base leading-loose text-justify m-0')
            } else if (boldActive) {
              textStyle = tw('text-black font-semibold text-base leading-loose text-justify m-0')
            }

            return (
              <Text key={`text-${indexCount}`} style={textStyle}>
                {segment}
              </Text>
            )
          } else {
            return null
          }
      }
    })

    return styledText
  }

  return (
    <PdfDocument title="My Happy Life">
      {data?.map(({ _id, heading, story, image, caption_img }) => {
        return (
          <>
            <PdfPage size="A4" style={tw('px-20 py-12 font-sans')}>
              {/* HEADER */}
              <Text style={tw('text-sm text-center mb-5 text-gray-400')}>{'My Happy Life'}</Text>
              {/* STORY TITLE */}
              <Text
                style={tw(
                  'mx-auto w-2/3 text-3xl leading-snug mb-5 text-center font-title text-[#3E3F5E]'
                )}
              >
                {heading}
              </Text>
              <Image style={tw('mx-auto w-32 mb-10')} src={`/member/border.png`} />
              {/* CONTENT */}
              <Text
                style={tw(
                  'first-letter:text-xl text-[#3E3F5E] text-base leading-loose text-justify  m-3'
                )}
              >
                {processTextWithFormatting(story)}
              </Text>

              {/* FOOTER */}
              <Text
                style={tw('absolute text-sm text-gray-400 bottom-8 left-0 right-0 text-center')}
                render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                fixed
              />
              {/* IMAGE */}
              {image && (
                <>
                  <Image style={tw('w-full')} src={image} />
                  <Text style={tw('text-sm text-center font-sansItalic mt-5 text-gray-400')}>
                    {caption_img}
                  </Text>
                </>
              )}
            </PdfPage>
          </>
        )
      })}
    </PdfDocument>
  )
}

export default PDFDoc
