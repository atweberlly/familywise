import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
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
  const [defaultContent, setDefaultContent] = useState({
    title: 'A Happy Life',
    author: 'Alex Green',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783',
  })

  useEffect(() => {
    ;(async () => {
      try {
        // Make an API request to get the user's cover data
        const response = await axios.get(`/api/cover/getCover?userId=${user._id}`)
        const coverData = response.data

        // Update the content state with cover data
        if (coverData && coverData.length > 0) {
          const data = coverData[0] // Assuming you only expect one cover data for a user
          setTitle(data.title)
          setAuthor(data.author)
          setCoverImage(data.image)
        }
      } catch (error) {
        // Handle any errors if the API request fails
        console.error('Failed to fetch cover data:', error)
      }
    })()
  }, [user._id])

  let autoSaveTimeout: string | number | NodeJS.Timeout | undefined

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    setTitle(newTitle)
    clearTimeout(autoSaveTimeout)
    autoSaveTimeout = setTimeout(() => {
      handleAutoSave(newTitle, author, coverImage)
    }, 3000)
  }

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <MemberLayout>
        <style>
          {`
            /* CSS */
            .cover-container {
              display: flex;
              justify-content: space-between;
              margin-bottom: 150px;
            }
            
            .preview {
                flex: .5;
                padding: 20px;
                background-color: #ffffff;
                position: relative;
                height: 105%;
                font-family: roboto;
                max-width: 650px;
            }
            
            .preview h1 {
                font-size: 50px;
                text-align: center;
                width: 35%;
                margin-bottom: 70px;
            }
            
            .cover {
                position: relative;
                width: 100mm; /* A5 width 148mm */
                height: 150mm; /* A5 height 210mm */
                margin: 0 auto;
                overflow: hidden;
                box-shadow: 0px 5px 15px 10px rgba(0, 0, 0, 0.5);
            }

            .cover img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 140%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: rgba(0, 0, 0, 0.5);
              color: black;
            }
            
            .overlay h3{
                font-size: 50px;
                font-family: roboto;
            }

            .info-container {
                background-color: white;
                padding: 20px;
                text-align: center;
                bottom: 0;
                left: 0;
                width: 100%;
            }

            .Title,
            .Author{
                width: 73%;
                height: 70px;
            }
            .form-container {
              flex: .5;
              padding: 20px;
              margin-top: 300px;
            }
            
            .form-group {
              margin: 10px 0;
            }
            
            label {
              display: block;
              font-weight: bold;
            }
                     
            `}
        </style>
        <div className="cover-container">
          <div className="form-container">
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
                    <img src={coverImage} className="mx-auto max-h-32 w-auto object-cover" />
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
            <div className="cover">
              {coverImage ? (
                <img src={coverImage} alt="Cover" />
              ) : (
                <img src={defaultContent.image} alt="Default Cover" />
              )}
              <div className="overlay">
                <div className="info-container">
                  <h3 className="title">{title || 'A Happy Life'}</h3>
                  <h4 className="author">{author || 'Alex Green'}</h4>
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
