import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

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
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, defaultValue }) => {
  const resultRef = useRef<HTMLDivElement | null>(null)
  const [transcript, setTranscript] = useState<string>('')
  const [recording, setRecording] = useState<boolean>(false) // Added state for recording
  const speechRecognizer = new webkitSpeechRecognition()

  const startRecording = () => {
    if (!recording) {
      speechRecognizer.continuous = true
      speechRecognizer.interimResults = true
      speechRecognizer.lang = 'en-US'
      speechRecognizer.start()

      toast('Speak now!', {
        icon: '🎤',
      })

      speechRecognizer.onresult = function (event) {
        let interimTranscripts = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          let transcript = event.results[i][0].transcript
          transcript.replace('\n', '<br>')
          if (!event.results[i].isFinal) {
            interimTranscripts += transcript
          }
        }

        // Update the transcript with only the latest content
        setTranscript(interimTranscripts)

        // Insert the transcript into the editor
        const newEditorValue = `${value}${interimTranscripts}\n`
        onChange(newEditorValue)
      }

      speechRecognizer.onerror = function (event) {}

      // Update recording state
      setRecording(true)
    }
  }

  const stopRecording = () => {
    if (recording) {
      // Stop the recording and recognition
      speechRecognizer.stop()
      toast('Recording stopped', {
        icon: '🛑',
      })

      // Update recording state
      setRecording(false)
    }
  }

  return (
    <div>
      <span className="font-normal">Your story</span>
      <div className="dark:bg-dark h-100 mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none dark:border-white dark:bg-black dark:text-white">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
          className={`dark:bg-dark h-100 text-3l mt-[12px] min-h-[5vh] w-full rounded-[12px]  border-[1.5px] px-[29px] py-[22px] text-white focus:border-none dark:border-white dark:bg-black 
          dark:text-white
          ${
            recording
              ? 'bg-secondary-500 hover:border-red-400 hover:text-red-400'
              : 'bg-secondary-500 hover:border-red-400 hover:text-blue-400'
          }`}
        >
          {recording ? 'Speaking...' : 'Hold to Speak'}
        </button>
      </div>
      {/* Display the transcript */}
      {recording && transcript.length > 0 && (
        <div className="dark:bg-dark h-100 text-3l mt-[12px] min-h-[5vh] w-full rounded-[12px]  border-[1.5px] px-[29px] py-[22px] text-xs text-gray-400 focus:border-none dark:border-white dark:bg-black">
          {transcript}
        </div>
      )}

      {/* Display the Quill Editor*/}
      <ReactQuill
        theme="snow"
        className="dark:bg-dark h-100 mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none dark:border-white dark:bg-black dark:text-white"
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
