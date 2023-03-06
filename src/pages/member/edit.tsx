import ButtonV2 from '../../components/_member/Button'
import { CheckIcon } from '@heroicons/react/24/outline'
import { CloudArrowUpIcon, PencilIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'

interface Props extends React.AllHTMLAttributes<HTMLElement> {
  question: string
  setQuestion?: (val: string) => void
  id: string
}

const BUCKET_URL = 'https://familyfortunate.s3.ap-southeast-2.amazonaws.com/'

const Edit = ({ question, id }: Props) => {
  const [saving, setSaving] = useState(false)
  const [isDisabled, setDisabled] = useState(true)
  const router = useRouter()
  const [content, setContent] = useState({ heading: '', story: '', caption: '' })
  const [image, setImage] = useState(null)
  const [defaultContent, setDefaultContent] = useState({ heading: '', story: '', caption: '' })
  const [uploadedFile, setUploadedFile] = useState<any>()

  useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/stories/getEditStories', { id: id })
      if (res.status === 200) {
        setDefaultContent({
          heading: res.data.heading,
          story: res.data.story,
          caption: res.data.caption_img,
        })
        console.log(res.data)
        setImage(res.data.image)
      }
    })()
  }, [id])

  useEffect(() => {
    if (content.heading === '' && content.story === '' && content.caption === '') return
    ;(async () => {
      setSaving(true)

      if (isDisabled) {
        content.heading = defaultContent.heading ? defaultContent.heading : question
      }
      console.log(content)
      const res = await axios.post('/api/questions/saveStory', {
        id: id,
        content: content,
      })
      if (res.status === 200) {
        setSaving(false)
      }
    })()
  }, [content, id, defaultContent.heading, isDisabled, question])

  const uploadFile = async (event: any) => {
    if (event.target.files[0] === undefined) {
      return
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      let { data } = await axios.post('/api/s3/uploadFile', {
        name: file.name,
        type: file.type,
      })

      const url = data.url
      await axios.put(url, file, {
        headers: {
          'Content-type': file.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      const image_url = BUCKET_URL + file.name.split(' ').join('+')
      await axios.post('/api/questions/saveImage', {
        id: id,
        image: image_url,
      })
      setUploadedFile(image_url)
    }
  }

  return (
    <div className="w-full">
      <span className="font-normal">Heading</span>
      <div className="relative w-full">
        <div className="absolute inset-y-0 right-6 flex items-center pl-3">
          <span
            className="cursor-pointer"
            onClick={() => {
              if (isDisabled) {
                setDisabled(false)
                setContent((prev) => ({
                  ...prev,
                  heading: defaultContent.heading ? defaultContent.heading : question,
                }))
                setContent((prev) => ({ ...prev, story: defaultContent.story }))
                setContent((prev) => ({ ...prev, caption: defaultContent.caption }))
              } else {
                setDisabled(true)
              }
            }}
          >
            {isDisabled ? (
              <PencilIcon className="h-6 w-6 text-primary-500" />
            ) : (
              <CheckIcon className="h-6 w-6 text-primary-500" />
            )}
          </span>
        </div>
        <input
          type="text"
          className={`mt-2 w-full rounded-xl border-secondary-600 ${
            isDisabled ? 'bg-secondary-200' : 'bg-white'
          } px-8 py-6 text-sm text-secondary-600 outline-none`}
          defaultValue={defaultContent.heading ? defaultContent.heading : question}
          disabled={isDisabled}
          onChange={(e) => {
            setContent((prev) => ({ ...prev, heading: e.target.value }))
            // saveStory(e, 'heading')
          }}
        />
      </div>

      <div className="flex">
        <div className="w-[60%]">
          <div className="hidden py-[25px]">
            <input
              type="text"
              className="mt-3 w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none"
              placeholder="Please enter your story heading here..."
              defaultValue={defaultContent.heading}
              onChange={(e) => {
                setContent((prev) => ({ ...prev, heading: e.target.value }))
                // saveStory(e, 'heading')
              }}
            />
          </div>
          <div className="py-[25px]">
            <span className="font-normal">Your story</span>
            <textarea
              className="mt-[12px] min-h-[65vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none"
              placeholder="Write your story here..."
              defaultValue={defaultContent.story}
              onChange={(e) => {
                setContent((prev) => ({ ...prev, story: e.target.value }))
                // saveStory(e, 'story')
              }}
            />
          </div>
        </div>
        <div className="w-[40%] py-[25px] px-[20px]">
          <div className="flex min-h-[159px] w-full items-center justify-center rounded-[12px] border-[1px] border-dashed border-secondary-500">
            <div className="text-center">
              {uploadedFile ? (
                <img src={uploadedFile} alt="" className="mx-auto max-h-32 w-auto object-cover" />
              ) : image ? (
                <img
                  src={image}
                  alt={defaultContent.heading}
                  className="mx-auto max-h-32 w-auto object-cover"
                />
              ) : (
                <CloudArrowUpIcon className="mx-auto h-8 w-8 text-primary-500" />
              )}
              <label
                htmlFor="avatar"
                className="mt-[8px] cursor-pointer whitespace-nowrap text-secondary-300"
              >
                {'Browse to upload'}
              </label>
              <input
                type="file"
                id="avatar"
                // onChange={(e) => setValue('heading',(e.target as HTMLInputElement).value)}
                onChange={uploadFile}
                hidden
              />
              <p className="mb-8 text-xs text-primary-500">
                Only JPEG and PNG files with max size of 8MB.
              </p>
            </div>
          </div>
          <div className="py-[25px]">
            <textarea
              className="mt-[12px] min-h-[359px] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none"
              placeholder="Add a caption for your image. The caption will appear below your image."
              defaultValue={defaultContent.caption}
              onChange={(e) => {
                setContent((prev) => ({ ...prev, caption: e.target.value }))
                // saveStory(e, 'caption')
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 px-[25px]">
        <div className="flex items-center justify-center gap-3">
          {saving ? (
            <>
              <ClipLoader color="#21C0AD" loading={true} size={20} />
              <span className="text-[20px] text-[#21C0AD]">saving</span>
            </>
          ) : (
            <>
              <FaCheck color="#21C0AD" />
              <span className="text-[20px] text-[#21C0AD]">saved</span>
            </>
          )}
        </div>
        <ButtonV2
          text="See Preview"
          onClick={() => {
            router.push('/member/preview')
          }}
        />
        {/* <Button text="Done Writing" onClick={saveStory} /> */}
      </div>
    </div>
  )
}

export default Edit
