import React from 'react'

interface MyComponentProps {
  user: string
  user_id: string
}

const PdfGen: React.FC<MyComponentProps> = ({ user, user_id }: { user: any; user_id: string }) => {
  const containerStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    padding: '29520px', // 29520px
    fontFamily: 'Arial, sans-serif',
  }

  const greetingStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: '10px',
  }

  const userIdStyle: React.CSSProperties = {
    fontSize: '16px',
    color: 'green',
  }

  return (
    <div style={containerStyle}>
      <div style={greetingStyle}>Hello, {user.firstname}!</div>
      <div style={userIdStyle}>User ID: {user_id}</div>
    </div>
  )
}

export default PdfGen
/*
import React, { useState, useEffect, HTMLProps } from 'react';
import axios from 'axios';

const PdfGen = ({ item, index, user_id, user }: any, props: HTMLProps<HTMLDivElement>) => {
  const pageSize = 500;

  const [data, setData] = React.useState<any[]>([]);

  const [currentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('/api/stories/getStories', { user_id: user_id });
        if (res.status === 200) {
          const limitedData = user.planType === 'Free-Trial' ? res.data.slice(0, 10) : res.data; // Set 10 limit for Free Trial
          setData(limitedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id]);

  // This is your modified processTextWithFormatting function to handle the HTML content
  const processTextWithFormatting = (html: string) => {
    // Use a library like 'dangerouslySetInnerHTML' to render HTML content
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const watermark = user.planType === 'Free-Trial' && (
    <div
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
      <img src="/member/watermark.png" style={{ width: '100%', height: '100%' }} alt="Watermark" />
    </div>
  );

  const renderPage = (pageIndex: number) => {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex).map(({ _id, heading, story, image, caption_img }) => (
      <div key={_id} style={{ margin: '20px', fontFamily: 'Helvetica', position: 'relative' }}>
        {watermark}
        {/* Render your content for each item /}
        {/* ... /}
        {/* HEADER /}
        <div style={{ fontSize: '12px', textAlign: 'center', color: '#888' }}>My Happy Life</div>
        {/* STORY TITLE /}
        <div
          style={{
            fontSize: '24px',
            lineHeight: '1.4',
            margin: '20px auto',
            textAlign: 'center',
            fontFamily: 'Times-Roman',
            color: '#3E3F5E',
          }}
        >
          {heading}
        </div>
        <img src="/member/border.png" style={{ width: '128px', margin: '10px auto', display: 'block' }} alt="Border" />
        {/* CONTENT /}
        {processTextWithFormatting(story)}
        {/* Render Image from quill here /}
        {/* FOOTER /}
        <div style={{ fontSize: '12px', textAlign: 'center', color: '#888', position: 'absolute', bottom: '8px', left: 0, right: 0 }}>
          Page {pageIndex + 1}
        </div>
        {/* IMAGE /}
        {image && (
          <>
            <img src={image} style={{ width: '100%' }} alt="Story Image" />
            <div style={{ fontSize: '12px', textAlign: 'center', fontFamily: 'Helvetica', color: '#888', marginTop: '5px' }}>
              {caption_img}
            </div>
          </>
        )}
      </div>
    ));
  };

  // Render PDF
  return (
    <div>
      <title>My Happy Life</title>
      {renderPage(currentPage)}
    </div>
  );
};

export default PdfGen;
*/
