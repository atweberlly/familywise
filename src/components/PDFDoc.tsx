import React from 'react'
import { createTw } from 'react-pdf-tailwind'
import { Document as PdfDocument, Page as PdfPage, Text, Image } from '@react-pdf/renderer'
import axios from 'axios'
import striptags from 'striptags'

// Create your tw object with your theme configuration
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
      thin: 100,
      hairline: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      'extra-bold': 800,
      black: 900,
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

  //This is incredibly hard! 'It gave me brain cancer' Quill Function
  const processTextWithFormatting = (text: string) => {
    const parsedText = striptags(text, ['b', 'i', 'u', 'em', 'strong', 'p', 's'])

    const segments = parsedText.split(
      /(<b>)|(<\/b>)|(<i>)|(<\/i>)|(<u>)|(<\/u>)|(<em>)|(<\/em>)|(<strong>)|(<\/strong>)|(<p>)|(<p\s+class="ql-align-center">)|(<p\s+class="ql-align-left">)|(<p\s+class="ql-align-right">)|(<p\s+class="ql-align-justify">)|(<\/p>)|(<s>)|(<\/s>)/g
    )

    let italicActive = false
    let boldActive = false
    let underlineActive = false
    let strikeThroughActive = false
    let alignment = ''
    let indexCount = 0

    const styledText = segments.map((segment) => {
      switch (segment) {
        case '<strong>':
          boldActive = true
          return null
        case '<em>':
          italicActive = true
          return null
        case '<u>':
          underlineActive = true
          return null
        case '<s>':
          strikeThroughActive = true
          return null
        case '</strong>':
          boldActive = false
          return null
        case '</em>':
          italicActive = false
          return null
        case '</u>':
          underlineActive = false
          return null
        case '</s>':
          strikeThroughActive = false
          return null
        case '<p class="ql-align-center">':
          alignment = 'ql-align-center'
          return null
        case '<p class="ql-align-left">':
          alignment = 'ql-align-left'
          return null
        case '<p class="ql-align-right">':
          alignment = 'ql-align-right'
          return null
        case '<p class="ql-align-justify">':
          alignment = 'ql-align-justify'
          return null
        case '<p>':
          alignment = ''
          return null
        case '</p>':
          alignment = ''
          return null
        default:
          if (segment) {
            const textStyle = tw(`
              ${alignment === 'ql-align-center' ? 'text-center' : ''}
              ${alignment === 'ql-align-right' ? 'text-right' : ''}
              ${alignment === 'ql-align-left' ? 'text-left' : ''}
              ${alignment === 'ql-align-justify' ? 'text-justify' : ''}  
              leading-loose 
              m-0 
              ${italicActive && boldActive ? 'font-bold font-sansItalic text-black' : ''}
              ${italicActive && !boldActive ? 'font-sansItalic' : ''}
              ${!italicActive && boldActive ? 'font-bold text-black' : ''}
              ${
                italicActive && boldActive && underlineActive
                  ? 'underline font-bold font-sansItalic text-black'
                  : ''
              }
              ${!italicActive && !boldActive && underlineActive ? 'underline' : ''}
              ${
                !italicActive && boldActive && underlineActive
                  ? 'underline font-bold text-black'
                  : ''
              }
              ${strikeThroughActive ? 'line-through' : ''}
            `)

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

  const defaultTextStyle = tw('text-xl text-[#3E3F5E] text-base leading-loose text-justify m-3')

  //Render PDF
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
              <Text style={tw('text-xl text-[#3E3F5E] text-base leading-loose text-justify  m-3')}>
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
