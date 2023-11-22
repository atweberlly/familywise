import React, { HTMLProps } from 'react'
import { createTw } from 'react-pdf-tailwind'
import {
  Document as PdfDocument,
  Page as PdfPage,
  Text,
  Image,
  View,
  Font,
} from '@react-pdf/renderer'
import striptags from 'striptags'

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
})

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

interface Story {
  _id: string
  heading: string
  story: string
  image: string
  caption_img: string
}

interface PDFDocProps {
  stories: Story[]
  user_id: string
  user: any // Adjust the type accordingly
}

const PDFDoc: React.FC<PDFDocProps & HTMLProps<HTMLDivElement>> = ({ stories, user_id, user }) => {
  const pageSize = 500

  const currentPage = 0

  const processTextWithFormatting = (text: string) => {
    const parsedText = striptags(text, [
      'b',
      'i',
      'u',
      'em',
      'strong',
      'p',
      's',
      'img',
      'h1',
      'h2',
      'h3',
    ])

    const segments = parsedText.split(
      /(<b>)|(<\/b>)|(<i>)|(<\/i>)|(<u>)|(<\/u>)|(<em>)|(<\/em>)|(<strong>)|(<\/strong>)|(<p>)|(<p\s+class="ql-align-center">)|(<p\s+class="ql-align-left">)|(<p\s+class="ql-align-right">)|(<p\s+class="ql-align-justify">)|(<\/p>)|(<s>)|(<\/s>)|(<img>)|(<h1>)|(<h1\s+class="ql-align-center">)|(<h1\s+class="ql-align-left">)|(<h1\s+class="ql-align-right">)|(<h1\s+class="ql-align-justify">)|(<\/h1>)|(<h2>)|(<h2\s+class="ql-align-center">)|(<h2\s+class="ql-align-left">)|(<h2\s+class="ql-align-right">)|(<h2\s+class="ql-align-justify">)|(<\/h2>)|(<h3>)|(<h3\s+class="ql-align-center">)|(<h3\s+class="ql-align-left">)|(<h3\s+class="ql-align-right">)|(<h3\s+class="ql-align-justify">)|(<\/h3>)/g
    )

    let heading1 = false
    let heading2 = false
    let heading3 = false
    let italicActive = false
    let boldActive = false
    let underlineActive = false
    let strikeThroughActive = false
    let alignment = ''
    let indexCount = 0

    const styledText = segments.map((segment, segmentIndex) => {
      if (segment && segment.startsWith('<img')) {
        //Upload Image S3
        const srcMatch = segment.match(/src="(.*?)"/)

        if (srcMatch) {
          const imageUrl = srcMatch[1]

          return <Image key={`image-${segmentIndex}`} style={tw('w-full')} src={imageUrl} />
        } else {
          return null
        }
      } else if (segment) {
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

          case '<h1>':
            heading1 = true
            return null
          case '<h1 class="ql-align-center">':
            heading1 = true
            alignment = 'ql-align-center'
            return null
          case '<h1 class="ql-align-left">':
            heading1 = true
            alignment = 'ql-align-left'
            return null
          case '<h1 class="ql-align-right">':
            heading1 = true
            alignment = 'ql-align-right'
            return null
          case '<h1 class="ql-align-justify">':
            heading1 = true
            alignment = 'ql-align-justify'
            return null

          case '<h2>':
            heading2 = true
            return null
          case '<h2 class="ql-align-center">':
            heading2 = true
            alignment = 'ql-align-center'
            return null
          case '<h2 class="ql-align-left">':
            heading2 = true
            alignment = 'ql-align-left'
            return null
          case '<h2 class="ql-align-right">':
            heading2 = true
            alignment = 'ql-align-right'
            return null
          case '<h2 class="ql-align-justify">':
            heading2 = true
            alignment = 'ql-align-justify'
            return null

          case '<h3>':
            heading3 = true
            return null
          case '<h3 class="ql-align-center">':
            heading3 = true
            alignment = 'ql-align-center'
            return null
          case '<h3 class="ql-align-left">':
            heading3 = true
            alignment = 'ql-align-left'
            return null
          case '<h3 class="ql-align-right">':
            heading3 = true
            alignment = 'ql-align-right'
            return null
          case '<h3 class="ql-align-justify">':
            heading3 = true
            alignment = 'ql-align-justify'
            return null

          case '<p>':
            alignment = ''
            return null
          case '</p>':
            alignment = ''
            return null
          case '</h1>':
            heading1 = false
            return null
          case '</h2>':
            heading2 = false
            return null
          case '</h3>':
            heading3 = false
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
                ${italicActive && boldActive ? 'text-base font-bold font-roboto text-black' : ''}
                ${italicActive && !boldActive ? 'text-base font-roboto text-[#3E3F5E]' : ''}
                ${!italicActive && boldActive ? 'text-base font-bold text-black ' : ''}
                ${
                  italicActive && boldActive && underlineActive
                    ? 'text-base underline font-bold font-roboto text-black text-[#3E3F5E]'
                    : 'text-base'
                }
                ${!italicActive && !boldActive && underlineActive ? 'underline text-[#3E3F5E]' : ''}
                ${
                  !italicActive && boldActive && underlineActive
                    ? 'text-base underline v font-bold text-black'
                    : ''
                }
                ${strikeThroughActive ? 'text-base line-through' : ''}
                ${heading1 ? 'text-5xl leading-snug font-extrabold' : ''}
                ${heading2 ? 'text-4xl leading-snug  font-bold' : ''}
                ${heading3 ? 'text-3xl leading-snug font-bold' : ''}
              `)

              if (boldActive) {
                // Apply your styling for bold text here
                return (
                  <Text key={`text-${indexCount}`} style={{ ...textStyle, fontWeight: 'bold' }}>
                    {segment}
                  </Text>
                )
              } else {
                // Default text style
                return (
                  <Text key={`text-${indexCount}`} style={{ ...textStyle, fontFamily: 'Roboto' }}>
                    {segment}
                  </Text>
                )
              }
            } else {
              return null
            }
        }
      }
    })

    return styledText
  }

  const watermark = user.planType === 'Free-Trial' && (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.58, // Adjust the opacity as needed (0.0 to 1.0)
        zIndex: -1, // Place the watermark behind other content
      }}
    >
      <Image src={'/member/watermark.png'} style={{ width: '100%', height: '100%' }} />
    </View>
  )

  const renderPage = (pageIndex: number) => {
    const startIndex = pageIndex * pageSize
    const endIndex = startIndex + pageSize

    return stories
      .slice(startIndex, endIndex)
      .map(({ _id, heading, story, image, caption_img }) => (
        <PdfPage key={_id} size="A5" style={tw('px-20 py-12 font-roboto')}>
          {watermark}
          {/* Render your content for each item */}
          {/* ... */}
          {/* HEADER */}
          <Text style={tw('text-sm text-center mb-5 text-gray-400')}>{'My Happy Life'}</Text>
          {/* STORY TITLE */}
          <Text
            style={tw(
              'mx-auto w-2/3 text-3xl leading-snug mb-5 text-center font-roboto text-[#3E3F5E]'
            )}
          >
            {heading}
          </Text>
          <Image style={tw('mx-auto w-32 mb-10')} src={`/member/border.png`} />
          {/* CONTENT */}

          {processTextWithFormatting(story)}

          {/* Render Image from quill here*/}
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
              <Text style={tw('text-sm text-center font-roboto mt-5 text-gray-400')}>
                {caption_img}
              </Text>
            </>
          )}
        </PdfPage>
      ))
  }
  return <PdfDocument title="My Happy Life">{renderPage(currentPage)}</PdfDocument>
}

export default PDFDoc
