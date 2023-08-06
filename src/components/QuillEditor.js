import React, { createContext, useState, useContext } from 'react'

const QuillEditorContext = createContext()

export function QuillEditorProvider({ children }) {
  const [editorContent, setEditorContent] = useState({ story: '' })

  return (
    <QuillEditorContext.Provider value={{ editorContent, setEditorContent }}>
      {children}
    </QuillEditorContext.Provider>
  )
}

export function useQuillEditorContext() {
  return useContext(QuillEditorContext)
}
