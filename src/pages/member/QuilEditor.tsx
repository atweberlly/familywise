import 'react-quill/dist/quill.snow.css'
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
  return (
    <div>
      <span className="font-normal">Your story</span>
      <ReactQuill
        theme="snow"
        className=" dark:bg-dark h-100 mt-[12px] min-h-[5vh] w-full rounded-[12px] border-[1.5px] border-secondary-500 px-[29px] py-[22px] text-[14px] text-secondary-600 focus:border-none dark:border-white dark:bg-black dark:text-white"
        placeholder="Write your story here..."
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  )
}

export default QuillEditor
