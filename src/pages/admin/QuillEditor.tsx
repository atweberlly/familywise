import { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

// Import the ReactQuillProps type

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

interface QuillEditorProps extends ReactQuillProps {
  // Extend ReactQuillProps
  value: string
  onChange: (value: string, delta: any, source: any, editor: any) => void // Update the onChange function signature
}

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  return (
    <div>
      {/* Refactor */}
      <style>
        {`
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
            content: 'Heading 1';
          }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
            content: 'Heading 2';
          }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
            content: 'Heading 3';
          }
        `}
      </style>
      <ReactQuill
        theme="snow"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:bg-dark dark:text-white"
        placeholder="Text here..."
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default QuillEditor
