import React from 'react'

interface MyComponentProps {
  user: {
    _id: string
  }
  newTitle: string
  newAuthor: string
  newCoverImage: string
}

const PdfGen: React.FC<MyComponentProps> = ({
  newTitle,
  newAuthor,
  newCoverImage,
}: MyComponentProps) => {
  const containerStyle: React.CSSProperties = {
    width: '148mm', // A5 width in millimeters
    height: '210mm', // A5 height in millimeters
    backgroundImage: `url(${newCoverImage})`, // Set the cover image as background
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: '10px',
  }

  const authorStyle: React.CSSProperties = {
    fontSize: '16px',
    color: 'green',
  }

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>{newTitle}</div>
      <div style={authorStyle}>{newAuthor}</div>
    </div>
  )
}

export default PdfGen
