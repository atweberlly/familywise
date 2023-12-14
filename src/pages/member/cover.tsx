import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { book_templates, Props as BookTemplateProps } from '../../components/Lib/book_templates'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import '../../styles/CustomStyle.css'
import axios from 'axios'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'

const Cover = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<any>()
  const [defaultContent] = useState({
    title: 'A Happy Life',
    author: 'Alex Green',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783',
  })

  const [selectedTemplate, setSelectedTemplate] = useState<BookTemplateProps>(book_templates[0])

  useEffect(() => {
    // Fetch existing cover data when user changes
    const fetchCoverData = async () => {
      try {
        const response = await axios.get(`/api/cover/getCover?userId=${user._id}`)
        const coverData = response.data
        // Update the content state with cover data
        if (coverData && coverData.length > 0) {
          const data = coverData[0]
          setTitle(data.title)
          setAuthor(data.author)
          setCoverImage(data.image)
        }
      } catch (error) {
        console.error('Failed to fetch cover data:', error)
      }
    }

    if (user._id) {
      fetchCoverData()
    }
  }, [user._id])

  let autoSaveTimeout: ReturnType<typeof setTimeout> | undefined

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    setTitle(newTitle)

    clearTimeout(autoSaveTimeout)
    autoSaveTimeout = setTimeout(() => {
      handleAutoSave(newTitle, author, coverImage)
    }, 3000)
  }

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newAuthor = event.target.value
    setAuthor(newAuthor)

    clearTimeout(autoSaveTimeout)
    autoSaveTimeout = setTimeout(() => {
      handleAutoSave(title, newAuthor, coverImage)
    }, 3000)
  }

  const BUCKET_URL = 'https://familyfortunate.s3.ap-southeast-2.amazonaws.com/'

  const handleImageChange = async (event: any) => {
    if (event.target.files[0] === undefined) {
      return
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      let { data } = await axios.post('/api/s3/uploadFile', {
        name: 'cover_' + file.name,
        type: file.type,
      })

      const url = data.url
      await axios.put(url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      const image_url = BUCKET_URL + 'cover_' + file.name
      /*await axios.post('/api/questions/saveImage', {
        id: id,
        image: image_url,
      })*/
      setUploadedFile(image_url)
      setCoverImage(image_url)
      handleAutoSave(title, author, image_url)
    }
  }

  const handleAutoSave = (newTitle: string, newAuthor: string, newCoverImage: string) => {
    if (isSaving) {
      return // Skip auto-saving if a save is already in progress
    }

    const shouldAutoSave = user._id !== null && newTitle && newAuthor && newCoverImage

    if (shouldAutoSave) {
      setIsSaving(true) // Set saving to true

      // Automatically save after a delay (adjust the delay time as needed)
      setTimeout(() => {
        saveCoverData(user._id, newTitle, newAuthor, newCoverImage)
        setIsSaving(false) // Reset saving after the save is complete
      }, 3000) // 2 seconds (adjust as needed)
    }
  }

  const saveCoverData = async (userId: any, title: string, author: string, image: string) => {
    try {
      // Perform input validation
      if (!userId || !title || !author || !image) {
        throw new Error('Invalid input. Please check your data.')
      }

      // Make an HTTP POST request to your API
      const response = await axios.post('/api/cover/saveCover', {
        userId,
        title,
        author,
        image,
      })

      if (response.status === 200) {
        // Show a success toast
        toast.success('Cover data saved successfully', {
          position: 'bottom-right',
        })
      } else {
        // Show an error toast
        toast.error('Failed to save cover data')
      }
    } catch (error) {
      // Show an error toast if saving fails
      toast.error('Failed to save cover data: ' + error, {
        position: 'bottom-right',
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      const user = await axios('/api/users/getUser')
      dispatch(setUser(user.data.user[0]))
    })()
  }, [dispatch])

  useEffect(() => {
    // Check if all the required parameters are available
    if (user._id && title && author && coverImage) {
      // Create the data object for the cover image upload
      const data = {
        user: { _id: user._id },
        title: title,
        author: author,
        coverImage: coverImage,
      }

      // Perform the cover image upload
      fetch('/api/s3/uploadCover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [user._id, title, author, coverImage])

  return (
    <>
      <MemberLayout>
        <div className="cover-container">
          <div className="form-group">
            <>
              <div className="form-group">
                <label htmlFor="template">Choose a Template</label>
                <div className="mt-3  max-h-80 overflow-auto">
                  <div className="grid grid-cols-2 gap-1">
                    {book_templates.map((template) => (
                      <div
                        key={template.id}
                        className={`flex cursor-pointer flex-col items-start rounded-md border border-secondary-300 p-6 ${
                          selectedTemplate.id === template.id ? 'bg-primary-100' : ''
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <img
                          src={template.showcaseImage}
                          alt={`Template ${template.item}`}
                          className="mb-2 max-h-32 w-auto rounded-md object-cover"
                        />
                        {<span>{template.item}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="Title mt-3 block w-full rounded-xl border-2 px-4 py-3 text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                id="title"
                placeholder="eg. Happy Life Book"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author Name</label>
              <input
                type="text"
                className="Author mt-3 block w-full rounded-xl border-2 px-4 py-3 text-secondary-600 outline-none transition-all placeholder:text-secondary-300 invalid:border-danger-500 hover:border-secondary-500 focus:border-primary-300 disabled:border-secondary-200 disabled:bg-primary-100"
                id="author"
                placeholder="eg. Alex Green"
                value={author}
                onChange={handleAuthorChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cover-photo">Cover photo</label>
              <div className="flex min-h-[159px] w-[520px] items-center justify-center rounded-[12px] border-[2px] border-dashed border-secondary-500">
                <div className="text-center">
                  {uploadedFile ? (
                    <img
                      src={uploadedFile}
                      alt=""
                      className="mx-auto max-h-32 w-auto object-cover"
                    />
                  ) : coverImage ? (
                    <img
                      src={coverImage}
                      alt={title}
                      className="mx-auto max-h-32 w-auto object-cover"
                    />
                  ) : (
                    <CloudArrowUpIcon className="mx-auto h-8 w-8 text-primary-600" />
                  )}
                  <label
                    htmlFor="cover-photo"
                    className="mt-[8px] cursor-pointer whitespace-nowrap text-secondary-300"
                  >
                    {'Upload a picture'}
                  </label>
                  <input
                    type="file"
                    id="cover-photo"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                  <p className="mb-8 text-xs text-primary-600">
                    Only JPEG and PNG files with max size of 8MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="preview">
            <h1>Preview</h1>
            <div className={selectedTemplate.coverStyle}>
              {coverImage ? (
                <img className={selectedTemplate.imageStyle} src={coverImage} alt="Cover" />
              ) : (
                <img src={defaultContent.image} alt="Default Cover" />
              )}
              <div className={selectedTemplate.backgroundOverlay}>
                <div className={selectedTemplate.divContainer}>
                  <div className={selectedTemplate.divContainer}>
                    <div className={selectedTemplate.divContainer}>
                      {title && title.length > 12 ? (
                        <h3 className={selectedTemplate.sTitle}>
                          {title.slice(0, 25) || 'A Happy Life'}
                        </h3>
                      ) : (
                        <h3 className={selectedTemplate.title}>{title || 'A Happy Life'}</h3>
                      )}
                    </div>
                  </div>
                </div>

                <div className={selectedTemplate.authorContainer}>
                  <h4 className={selectedTemplate.author}>{author || 'Alex Green'}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isSaving && (
          <div className="saving-toast">
            <p>Saving...</p>
          </div>
        )}
      </MemberLayout>
    </>
  )
}

export default Cover
