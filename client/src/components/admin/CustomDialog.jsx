import React from 'react'
import { Dialog } from 'primereact/dialog';

const CustomDialog = ({ header, visible, setVisible, content }) => {
  return (
    <Dialog 
      header={header}
      visible={visible} 
      style={{ width: '50vw' }} 
      onHide={() => setVisible(false)}
      draggable={false}
    >
      {content}
    </Dialog>
  )
}

export default CustomDialog