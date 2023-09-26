import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { setUser } from '../../slices/slice'
import axios from 'axios'

// Import Quill styles

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['image'],
    [{ align: [] }],
    ['clean'],
  ],
}

const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'image', 'align']

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  editorLoading: boolean
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, editorLoading }) => {
  const resultRef = useRef<HTMLDivElement | null>(null)
  const [transcript, setTranscript] = useState<string>('')
  const [recording, setRecording] = useState<boolean>(false) // Added state for recording

  const speechRecognizer = useRef<SpeechRecognition | null>(null) // useRef for sTT
  const [duration, setDuration] = useState<number>(0) // added state for duration

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined
    if (recording) {
      timerId = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1)
      }, 1000)
    } else {
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [recording])

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      if (!recording) {
        const recognizer = new webkitSpeechRecognition() // Create a new instance
        recognizer.continuous = true
        recognizer.interimResults = true
        recognizer.lang = 'en-US'
        recognizer.start() // Start the STT

        let finalTranscripts = ''
        toast('Speak now!', {
          icon: '🎤',
          duration: 3000, // 3 seconds
        })

        recognizer.onresult = function (event) {
          let interimTranscripts = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript
            transcript.replace('\n', '<br>')
            if (event.results[i].isFinal) {
              finalTranscripts += transcript
            } else {
              interimTranscripts += transcript
            }
          }

          // Update the transcript with only the latest content
          setTranscript(interimTranscripts)

          // Insert the transcript into the editor
          const newEditorValue = `${value}${finalTranscripts}${interimTranscripts}\n`
          onChange(newEditorValue)
        }

        recognizer.onerror = function (event) {}

        // Save the recognizer instance in the ref
        speechRecognizer.current = recognizer

        // Update recording state
        setRecording(true)
        setDuration(0) // Reset the duration when starting a new Recording
      } else if (recording) {
        // Stop the recording and recognition
        const recognizer = speechRecognizer.current
        if (recognizer) {
          recognizer.stop() // Stop the STT
        }
        setRecording(false)

        toast('Recording stopped', {
          icon: '🛑',
          duration: 3000, // 3 seconds
        })
      }
    } else {
      if (resultRef.current) {
        toast.error(
          'Your browser is not supported. Please download Google Chrome or update your Google Chrome!',
          {
            duration: 3000, // Specify the duration in milliseconds (3 seconds)
          }
        )
      }
    }
  }

  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.userSlice.user)
  const [isSpeakToTextAvailable, setIsSpeakToTextAvailable] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respo = await axios.get('/api/users/getUser')
        const userData = respo.data.user[0]

        const planTypes = ['Free-Trial', 'Your-life-in-a-book', 'Premium']
        if (planTypes.includes(userData.planType)) {
          dispatch(setUser(userData))
          setIsSpeakToTextAvailable(true)
        } else {
          setIsSpeakToTextAvailable(false)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <div>
      <span className="font-normal dark:text-gray-600">Your story</span>
      <div className="h-100 mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none dark:border-dark dark:bg-white dark:text-white">
        {/*<button onClick={startRecording}
            className={`h-100 text-3l mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px]  px-[29px] py-[22px] text-white focus:border-none dark:border-white dark:bg-dark 
            dark:text-white
            ${
              recording
                ? 'bg-secondary-500 hover:border-red-400 hover:text-red-400'
                : 'bg-secondary-500 hover:border-red-400 hover:text-blue-400'
              }`}
          >
            {recording ? `Recording (${duration}s)` : 'Speak'}
            </button>*/}
        {isSpeakToTextAvailable ? (
          <button
            onClick={startRecording}
            className={`h-100 text-3l mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px]  px-[29px] py-[22px] text-white focus:border-none dark:border-white dark:bg-dark 
          dark:text-white
          ${
            recording
              ? 'bg-secondary-500 hover:border-red-400 hover:text-red-400'
              : 'bg-secondary-500 hover:border-red-400 hover:text-blue-400'
          }`}
          >
            {recording ? `Recording (${duration}s)` : 'Speak'}
          </button>
        ) : (
          <div className="disabled-button">
            <Link href="checkout/[id].tsx">
              <button
                className="h-100 text-3l mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px]  bg-secondary-500 px-[29px] py-[22px] text-white hover:border-red-200 hover:text-white-400 
            focus:border-none dark:border-white dark:bg-dark dark:text-white"
              >
                Unlock Speech-To-Text Feature{' '}
                <span className="mr-2 rounded border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-500 dark:bg-gray-700 dark:text-green-400">
                  Buy now
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
      {/* Display the transcript */}
      {recording && transcript.length > 0 && (
        <div className="h-100 text-3l dark.borderColor-white dark.bg-black mt-[12px] min-h-[5vh] w-full  rounded-[12px] border-[1.5px] px-[29px] py-[22px] text-xs text-gray-400 focus:border-none dark:bg-dark">
          {transcript}
        </div>
      )}

      {/* Display the Quill Editor*/}
      <ReactQuill
        theme="snow"
        className="h-100 dark.borderColor-white dark.bg-black dark.textColor-white mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-gray-500 focus:border-none dark:border-dark-500 dark:bg-white"
        placeholder="Write your story here..."
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
      <div ref={resultRef} />
    </div>
  )
}

export default QuillEditor
