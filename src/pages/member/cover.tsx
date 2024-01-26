import React, { ChangeEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BarLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { book_templates, Props as BookTemplateProps } from '../../components/Lib/book_templates'
import MemberLayout from '../../layouts/MemberLayout'
import { setUser } from '../../slices/slice'
import '../../styles/CustomStyle.css'
import * as Ariakit from '@ariakit/react'
import axios from 'axios'
import { push } from 'files'
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'
import ButtonV2 from '~/components/_member/Button'

const Cover = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  //Debug
  const [printID, setprintID] = useState('')
  const [printPath, setprintPath] = useState('')
  const [open, setOpen] = useState(false)

  const [isUploading, setIsUploading] = useState(false)
  const [totalPages, setTotalPages] = useState(null)
  const [storiesExist, setStoriesExist] = useState(true)

  //Publish Properties
  const [publishError, setpublishError] = useState('Publish')
  const [errorPresent, setErrorPresent] = useState(false)
  const [isApplying, setisApplying] = useState(false)

  const [uploadedFile, setUploadedFile] = useState<any>()
  const [defaultContent] = useState({
    title: 'A Happy Life',
    author: 'Alex Green',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783',
  })

  //Publish

  const handlePublishClick = async (user: any) => {
    setIsUploading(true)

    try {
      const storiesResponse = await axios.get(`/api/stories/getStories?user_id=${user._id}`)
      if (storiesResponse.status === 200) {
        const storiesData =
          user.planType === 'Free-Trial' ? storiesResponse.data.slice(0, 10) : storiesResponse.data

        const data = {
          title: title,
          pages: totalPages,
          email: user.email,
          user,
          name: user.firstname + '_Book.pdf',
          type: 'application/pdf',
          stories: storiesData,
        }

        try {
          const response = await fetch('/api/s3/uploadPDF', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })

          console.log('Response status code:', response.status)

          if (response.ok) {
            const responseData = await response.json()
            console.log('PDF uploaded to S3:', responseData.location)
            setprintID(responseData.printJobId)
            setprintPath(responseData.location)
            toast.success('PDF upload successful!')
          } else {
            const errorText = await response.text()
            console.error('Failed to upload PDF to S3. Server response:', errorText)
            toast.error(`Failed to upload PDF: ${errorText}`)
          }
        } catch (error) {
          console.error('Error during PDF upload:', error)
          toast.error('Failed to upload PDF')
        } finally {
          setIsUploading(false)
        }
      } else {
        console.error('Unexpected status code:', storiesResponse.status)
        setIsUploading(false)
        toast.error('Failed to fetch stories data')
      }
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused. Make sure the server is running.')
      } else {
        console.error('Error fetching stories data:', error.message)
      }
      setIsUploading(false)
      toast.error('Failed to fetch stories data')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coverResponse = await axios.get(`/api/cover/getCover?userId=${user._id}`)
        const coverData = coverResponse.data

        if (coverData && coverData.length > 0) {
          const data = coverData[0]
          setTitle(data.title)
        } else {
          return // No cover data, exit useEffect
        }

        const storiesResponse = await axios.get(`/api/stories/getStories?user_id=${user._id}`)
        if (storiesResponse.status === 200) {
          const storiesData =
            user.planType === 'Free-Trial'
              ? storiesResponse.data.slice(0, 10)
              : storiesResponse.data

          if (storiesData && storiesData.length > 0) {
            setStoriesExist(true)
            const totalPagesResponse = await fetch('/api/totalPages', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user, stories: storiesData }),
            })

            if (totalPagesResponse.ok) {
              const data = await totalPagesResponse.json()
              const totalPages = data.totalPages
              setTotalPages(totalPages)
            } else {
              console.error('Error getting total pages:', totalPagesResponse.statusText)
            }
          } else {
            setStoriesExist(false)
          }
        } else {
          console.error('Unexpected status code:', storiesResponse.status)
        }
      } catch (error: any) {
        if (error.code === 'ECONNREFUSED') {
          console.error('Connection refused. Make sure the server is running.')
        } else {
          console.error('Error fetching data:', error.message)
        }
      }
    }

    if (user._id) {
      fetchData()
    }
  }, [user._id, user.planType])

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
        {
          toast.success('Cover data saved successfully', {
            position: 'bottom-right',
          })
        }
      } else {
        // Show an error toast
        {
          toast.error('Failed to save cover data')
        }
      }
    } catch (error) {
      // Show an error toast if saving fails
      {
        toast.error('Failed to save cover data: ' + error, {
          position: 'bottom-right',
        })
      }
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
        firstname: user.firstname,
        title: title,
        email: user.email,
        author: author,
        name: user.firstname + '_Cover.pdf',
        coverImage: coverImage,
        selectedTemplate: selectedTemplate, // Include selectedTemplate
      }

      // Wrap the asynchronous operation in a promise
      const uploadCoverPromise = new Promise((resolve, reject) => {
        setisApplying(true)
        setpublishError('Please Wait')
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
            setprintPath(data.location)
            resolve(data) // Resolve the promise with the data
          })
          .catch((error) => {
            console.error('Error:', error)
            reject(error) // Reject the promise with the error
          })
          .finally(() => {
            setisApplying(false) // Reset loading after the cover upload is complete
            setpublishError('Publish')
          })
      })

      // Use toast.promise to display notifications based on promise state.
      const promise = toast.promise(
        uploadCoverPromise,
        {
          loading: 'Applying, please wait...',
          success: 'Saved!',
          error: 'Oops! Failed to apply changes.',
        },
        {
          //I used primary-600 / #9e7558
          position: 'bottom-right',
          style: {
            border: '4px solid #9e7558',
            padding: '16px',
            color: '#9e7558',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#9e7558',
          },
        }
      )

      promise.then((result) => {
        // Handle the result if needed
        console.log('Promise resolved:', result)
      })
    }
  }, [user._id, title, author, coverImage, selectedTemplate])

  return (
    <>
      <MemberLayout>
        {/*
          //Debug use only
          <div className="pb-[67px]">
            <h1 className="text-danger-400">Debug Use Only</h1>
            <p>Current Order ID: {printID}</p>
            <p>Pages: {totalPages}</p>
            <p>Path: {printPath}</p>
          </div>
  */}

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
                        {/*<span>{template.item}</span>*/}
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
            <div className="mx-auto mt-20 text-center">
              <h2 className="mb-4 text-2xl font-bold">Ready to Publish?</h2>
              {isUploading ? (
                // Show a loading indicator or progress bar
                <div className="text-primary-600">
                  Uploading...
                  <BarLoader className="py-auto mx-auto items-center" />
                </div>
              ) : (
                <div>
                  <ButtonV2
                    text={publishError}
                    className={`my-4 inline-flex w-[50%] justify-center !rounded-md bg-primary-600 px-6 py-3 text-black transition-all dark:text-gray-200 ${
                      errorPresent || isApplying ? 'cursor-not-allowed' : ''
                    }`}
                    disabled={errorPresent || isApplying}
                    onClick={() => {
                      if (totalPages !== null && totalPages !== undefined && totalPages < 32) {
                        setpublishError('Total pages must be 32 or more.')
                        setErrorPresent(true)
                      } else if (
                        user.city === '' ||
                        user.phoneNumber === '' ||
                        user.stateCode === '' ||
                        user.postCode === '' ||
                        user.street === ''
                      ) {
                        setpublishError('Oh Snap! 🥲')
                        setOpen(true)
                      } else {
                        handlePublishClick(user)
                        setpublishError('Publish')
                        setErrorPresent(false)
                      }
                    }}
                  />
                  <Ariakit.Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    className="dialog"
                    style={{
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '8px',
                      maxWidth: '400px',
                      width: '100%',
                      backgroundColor: '#fff',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      zIndex: '1000',
                    }}
                  >
                    <div style={{ padding: '16px' }}>
                      <Ariakit.DialogHeading
                        className="heading"
                        style={{ fontSize: '1.5rem', marginBottom: '8px' }}
                      >
                        Failed
                      </Ariakit.DialogHeading>
                      <p
                        className="description"
                        style={{ fontSize: '1rem', color: '#555', marginBottom: '16px' }}
                      >
                        Oops! Looks like you haven't set up your preferences yet. Let's take care of
                        that now.
                        <div
                          className="mt-4 rounded-md border border-gray-500 p-4"
                          style={{ fontFamily: 'monospace', color: '#ff0000' }}
                        >
                          <code>
                            {/* Display errors in a code-like format */}
                            {user.city === '' && (
                              <div>
                                ❌ <span className="text-danger-400"> Error:</span> City field
                                empty.
                              </div>
                            )}
                            {user.phoneNumber === '' && (
                              <div>
                                ❌ <span className="text-danger-400"> Error:</span> Phone number
                                missing.
                              </div>
                            )}
                            {user.stateCode === '' && (
                              <div>
                                ❌ <span className="text-danger-400"> Error:</span> State code not
                                provided.
                              </div>
                            )}
                            {user.postCode === '' && (
                              <div>
                                ❌ <span className="text-danger-400"> Error:</span> Post code
                                absent.
                              </div>
                            )}
                            {user.street === '' && (
                              <div>
                                ❌ <span className="text-danger-400"> Error:</span> Street
                                information not available.
                              </div>
                            )}
                          </code>
                        </div>
                      </p>
                      <div style={{ textAlign: 'right' }}>
                        <Ariakit.DialogDismiss
                          className="button cursor-pointer rounded-md bg-primary-400 px-4 py-2 text-white hover:bg-primary-600"
                          type={'button'}
                          onClick={() => {
                            setOpen(false)
                            router.push('/member/publish')
                          }}
                        >
                          Sure
                        </Ariakit.DialogDismiss>
                      </div>
                    </div>
                  </Ariakit.Dialog>

                  {isApplying && (
                    <div className="text-primary-600">
                      <p>Setting up. Just a moment...</p>
                      <BarLoader className="py-auto mx-auto items-center" />
                    </div>
                  )}
                </div>
              )}
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
