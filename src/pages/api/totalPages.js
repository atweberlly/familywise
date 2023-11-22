import PdfGen from '../../components/PDFGen'
import { renderToBuffer } from '@react-pdf/renderer'
import pdf from 'pdf-parse'

export default async (req, res) => {
  try {
    const { user, stories } = req.body

    const pdfBuffer = await renderToBuffer(
      <PdfGen user_id={user._id} user={user} stories={stories} />
    )

    // Use pdf-parse to estimate the total number of pages
    const data = await pdf(pdfBuffer)

    if (data && data.numpages) {
      const totalPages = data.numpages
      res.status(200).json({ totalPages })
    } else {
      res.status(500).json({ error: 'PDF parsing failed' })
    }
  } catch (error) {
    console.error('Error getting total pages', error)
    res.status(500).json({ error: 'Error getting total pages' })
  }
}
