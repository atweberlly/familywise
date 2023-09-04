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

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const resultRef = useRef<HTMLDivElement | null>(null)
  const [transcript, setTranscript] = useState<string>('')

  const handleStartConverting = () => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognizer = new webkitSpeechRecognition()
      speechRecognizer.continuous = true
      speechRecognizer.interimResults = true
      speechRecognizer.lang = 'en-US'
      speechRecognizer.start()

      let finalTranscripts = ''
      toast('Speak now!', {
        icon: '🎤',
      })

      speechRecognizer.onresult = function (event) {
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

        setTranscript((prevTranscript) => prevTranscript + finalTranscripts + interimTranscripts)

        // Insert the transcript into the editor
        const newEditorValue = `${value}${finalTranscripts}${interimTranscripts}\n`
        onChange(newEditorValue)
      }
      speechRecognizer.onerror = function (event) {}
    } else {
      if (resultRef.current) {
        toast.error(
          'Your browser is not supported. Please download Google Chrome or update your Google Chrome!'
        )
      }
    }
  }

  return (
    <div>
      <span className="font-normal">Your story</span>
      <button
        onClick={handleStartConverting}
        className="dark:bg-dark h-100 mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none dark:border-white dark:bg-black dark:text-white"
      >
        Speak
      </button>
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
