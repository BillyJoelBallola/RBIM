import { EditorContent, useEditor } from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

const TextEditor = ({ content, isReadOnly }) => {
    const editor = useEditor({
        editable: false,   
        content: content,
        extensions: [Underline, StarterKit],
    })

    return (
        <EditorContent editor={editor} />
    )
}

export default TextEditor