import React from 'react'
import { FacebookProvider, CustomChat } from 'react-facebook'

const Messenger = () => {
  return (
    <FacebookProvider appId="425360743160761" chatSupport>
        <CustomChat pageId="260146513839290" minimized="true" />
    </FacebookProvider>    
  )
}

export default Messenger