import { EditorProvider } from '@tiptap/react'
import { useCallback } from 'react';
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar';

const TextEditor = ({ content, setContent }) => {
    const extensions = [
        Underline,
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        })
    ]

    const onUpdate = useCallback(({ editor }) => {
        const newContent = editor.getHTML();
        setContent(current => ({
            ...current,
            content: newContent,
        }));
    }, [setContent]);

    return (
        <EditorProvider
            onUpdate={onUpdate} 
            slotBefore={<MenuBar />} 
            extensions={extensions} 
            content={content}
        ></EditorProvider>
    )
}

export default TextEditor