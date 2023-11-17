import React from 'react'

interface MyComponentProps {
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
    //width: '98.5vw',
    //height: '98vh',
    position: 'relative',
    fontFamily: 'Roboto',
    margin: 0,
    display: 'flex',
    border: '0.25in solid cyan',
    alignContent: 'center',
  }

  const frontCoverStyle: React.CSSProperties = {
    width: '5.5in', // Set the width to match the Live Area width
    height: '7.8in', // Set the height to match the Live Area height
    backgroundImage: `url(${newCoverImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Adjusted to position a little bit towards the bottom
  }

  const spineStyle: React.CSSProperties = {
    width: '5%',
    backgroundColor: 'gray', // Adjusted to a gray color for the spine
    borderLeft: '1px solid #000', // Added border to simulate a book spine
    borderRight: '1px solid #000', // Added border to simulate a book spine
  }

  const backCoverStyle: React.CSSProperties = {
    width: '5.5in', // Set the width to match the Live Area width
    height: '7.8in', // Set the height to match the Live Area height
    backgroundImage: `url(${newCoverImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Adjusted to position a little bit towards the bottom
  }

  const infoContainer: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    textAlign: 'center',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '40px',
  }

  const authorStyle: React.CSSProperties = {
    fontSize: '24px',
  }

  return (
    <div style={containerStyle}>
      <div style={backCoverStyle}></div>
      <div style={spineStyle}></div>
      <div style={frontCoverStyle}>
        <div style={infoContainer}>
          <h1 style={titleStyle}>{newTitle}</h1>
          <h3 style={authorStyle}>{newAuthor}</h3>
        </div>
      </div>
    </div>
  )
}

export default PdfGen
