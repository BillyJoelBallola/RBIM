import React from 'react'
import { Dialog } from 'primereact/dialog';

const CustomDialog = ({ classStyle, header, visible, setVisible, content, footer }) => {
  return (
    <Dialog 
      header={header}
      visible={visible} 
      className={`${classStyle ? classStyle : 'w-[50vw]'}`} 
      onHide={() => setVisible(false)}
      draggable={false}
      footer={footer}
    >
      {
        typeof content === 'string' ? 
        <div dangerouslySetInnerHTML={{ __html: content }} />
        :
        content
      }
    </Dialog>
  )
}

export default CustomDialog