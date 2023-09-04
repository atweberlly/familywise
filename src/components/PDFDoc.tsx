import React, {
  ClassType,
  Component,
  ComponentClass,
  ComponentProps,
  HTMLProps,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { createTw } from 'react-pdf-tailwind'
import { Image, Document as PdfDocument, Page as PdfPage, Text } from '@react-pdf/renderer'
import axios from 'axios'

// I renamed `Page` to `PdfPage` on import, and here assigning itto a variable named `Page`
// so that the code here is aligned with `react-pdf` documentation examples,
// same goes with `Document` import.
const Page: ClassType<
  ComponentProps<typeof PdfPage> & { children?: ReactNode },
  Component<ComponentProps<typeof PdfPage> & { children?: ReactNode }>,
  ComponentClass<ComponentProps<typeof PdfPage> & { children?: ReactNode }>
> = PdfPage as any

const Document: ClassType<
  ComponentProps<typeof PdfDocument> & {
    children: ReactNode
  },
  Component<
    ComponentProps<typeof PdfDocument> & {
      children: ReactNode
    }
  >,
  ComponentClass<
    ComponentProps<typeof PdfDocument> & {
      children: ReactNode
    }
  >
> = PdfDocument as any

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
  },
})

const PDFDoc = ({ item, index, user_id }: any, props: HTMLProps<HTMLDivElement>) => {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/stories/getStories', { user_id: user_id })
      if (res.status === 200) {
        console.log(res.data)
        setData([...res.data])
      }
    })()
  }, [user_id])
  return (
    <Document title="My Happy Life">
      {data?.map(({ _id, heading, story, image, caption_img }) => {
        return (
          <>
            <Page size="A4" style={tw('px-20 py-12 font-sans')}>
              {/* HEADER */}
              <Text style={tw('text-sm text-center mb-5 text-gray-400')}>{'My Happy Life'}</Text>
              {/* STORY TITLE */}
              <Text
                style={tw(
                  'mx-auto w-2/3 text-3xl leading-snug mb-5 text-center font-title text-[#3E3F5E]',
                )}
              >
                {heading}
              </Text>
              <Image style={tw('mx-auto w-32 mb-10')} src={`/member/border.png`} />
              {/* 
             CONTENT
             Note: first-letter doesn't working in react-pdf-tailwind
             */}
              <Text
                style={tw(
                  'first-letter:text-xl text-[#3E3F5E] text-base leading-loose text-justify m-3',
                )}
              >
                {story}
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
            </Page>
          </>
        )
      })}
    </Document>
  )
}

export default PDFDoc
