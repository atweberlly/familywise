import ReactDOMServer from 'react-dom/server';
import PdfGen from '../../../components/CoverPDF';
import S3 from 'aws-sdk/clients/s3';
import puppeteer from 'puppeteer';

const s3 = new S3({
  region: 'ap-southeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  signatureVersion: 'v4',
});

export default async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Retrieve user, title, author, and cover image data from the request
    const { user, title, email, name, author, coverImage, selectedTemplate} = req.body;

    // Generate a unique file name for the PDF cover
    const folderName = `${email.split('.')[0]}`

    await page.setViewport({
      width: Math.round((305.54 * 96) / 25.4),
      height: Math.round((214.82 * 96) / 25.4),
    });

    // Generate the PDF cover using the PdfGen component
    const content =<PdfGen
    user={user}
    newTitle={title}
    newAuthor={author}
    newCoverImage={coverImage}
    selectedTemplate={selectedTemplate}
  />
  

    const html = ReactDOMServer.renderToString(content);

    console.log(html); // Log the HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      width: Math.round((305.54 * 96) / 25.4),
      height: Math.round((214.82 * 96) / 25.4),
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
    });

    await browser.close();

    // Set S3 parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `pdf-inventory/${folderName}/${name}`,
      Body: pdfBuffer,
      ContentType: 'application/pdf',
    };

    // Upload the PDF to Amazon S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading to S3', err);
        res.status(500).json({ error: 'Error uploading to S3' });
      } else {
        console.log('Cover uploaded and PDF generated successfully', data.Location);
        res.status(200).json({ location: data.Location });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while uploading the cover and generating PDF' });
  }
};
