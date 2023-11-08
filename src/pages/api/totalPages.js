import ReactDOMServer from 'react-dom/server'
import PDFGen from '../../components/PDFGen'
import pdf from 'pdf-parse'
import puppeteer from 'puppeteer'

export default async (req, res) => {
  try {
    const { user } = req.body // You may need to pass user-related data
    const content = (
      <div style={{ width: '5.83in', height: '8.27in' }}>
        <PDFGen user_id={user._id} user={user} />
      </div>
    )

    const htmlContent = ReactDOMServer.renderToString(content)

    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()

    // Set the viewport and page size settings for A5
    await page.setViewport({ width: 420, height: 595 }) // A5 size in pixels (5.8in x 8.3in)

    // Set up a temporary HTML page with the content from PdfGen
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A5',
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
    })

    await browser.close()

    // Use pdf-parse to estimate the total number of pages
    const dataBuffer = Buffer.from(pdfBuffer)
    const data = await pdf(dataBuffer)

    if (data && data.numpages) {
      const totalPages = data.numpages // Get the number of pages
      res.status(200).json({ totalPages })
    } else {
      res.status(500).json({ error: 'PDF parsing failed' })
    }
  } catch (error) {
    console.error('Error getting total pages', error)
    res.status(500).json({ error: 'Error getting total pages' })
  }
}
