import React from 'react'
import { createTw } from 'react-pdf-tailwind'
import { Props } from './Lib/book_templates'
import { Document, Page, Text, View, Image } from '@react-pdf/renderer'

const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: '#bada55',
      },
    },
  },
})

interface MyComponentProps {
  newTitle: string
  newAuthor: string
  newCoverImage: string
  selectedTemplate: Props
}

const PdfGen: React.FC<MyComponentProps> = ({
  newTitle,
  newAuthor,
  newCoverImage,
  selectedTemplate,
}: MyComponentProps) => {
  return (
    <Document>
      <Page size="A5">
        <View style={tw(`w-full h-full flex flex-column justify-center`)}>
          {/* Back Cover */}
          <View>
            <Image
              style={tw('w-[5.5in] h-full object-cover flex column justify-center')}
              src={newCoverImage}
            />
          </View>

          {/* Spine */}
          <View style={tw(`w-[5%] bg-gray-500 border-4 border-solid border-black`)}></View>

          {/* Front Cover */}
          <View style={tw(selectedTemplate.coverStylePdf)}>
            <Image style={tw(selectedTemplate.imageStylePdf)} src={newCoverImage} />

            <View style={tw(selectedTemplate.backgroundOverlayPdf)}>
              <View style={tw(selectedTemplate.divContainerPdf)}>
                <View style={tw(selectedTemplate.divContainerPdf)}>
                  <View style={tw(selectedTemplate.divContainerPdf)}>
                    {newTitle && newTitle.length > 12 ? (
                      <Text style={tw(selectedTemplate.sTitlePdf)}>
                        {newTitle.slice(0, 25) || 'A Happy Life'}
                      </Text>
                    ) : (
                      <Text style={tw(selectedTemplate.titlePdf)}>
                        {newTitle || 'A Happy Life'}
                      </Text>
                    )}
                  </View>
                  <View style={tw(selectedTemplate.authorContainerPdf)}>
                    <Text style={tw(selectedTemplate.authorPdf)}>{newAuthor || 'Alex Green'}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PdfGen
