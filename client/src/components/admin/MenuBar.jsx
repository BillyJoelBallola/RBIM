import { useCurrentEditor } from '@tiptap/react'

import { GoBold } from "react-icons/go";
import { BiItalic } from "react-icons/bi";
import { MdFormatListBulleted } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";
import { MdFormatUnderlined } from "react-icons/md";

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className='tiptap_controls'>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleBold()
                    .run()
                }
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <GoBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                !editor.can()
                    .chain()
                    .focus()
                    .toggleItalic()
                    .run()
                }
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <BiItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <MdFormatUnderlined />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <MdFormatListBulleted />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <VscListOrdered />
            </button>
        </div>
    )
}

export default MenuBar