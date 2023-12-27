import React from 'react'
import moment from 'moment'

const ViewEventsAndProgram = () => {
  return (
    <div>
      <div className='w-full h-[250px] bg-gray-400 rounded-lg mb-5' />
      <h2 className='font-semibold text-lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h2>
      <div className='flex items-center text-gray-400 gap-2 text-sm my-2'>
        <span>Ibabang Butnong • {moment(new Date()).format("ll")}</span>
      </div>
      <div className='grid gap-4 text-sm text-gray-500'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum impedit alias nesciunt sed possimus fugiat voluptatibus porro sit nobis architecto dolorem adipisci quod delectus eligendi veniam, rerum soluta optio dolor. Minus maiores possimus voluptatum nobis inventore labore quidem facilis, ad, molestias esse ipsum ut libero fugiat deserunt porro reiciendis in.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum impedit alias nesciunt sed possimus fugiat voluptatibus porro sit nobis architecto dolorem adipisci quod delectus eligendi veniam, rerum soluta optio dolor. Minus maiores possimus voluptatum nobis inventore labore quidem facilis, ad, molestias esse ipsum ut libero fugiat deserunt porro reiciendis in.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum impedit alias nesciunt sed possimus fugiat voluptatibus porro sit nobis architecto dolorem adipisci quod delectus eligendi veniam, rerum soluta optio dolor. Minus maiores possimus voluptatum nobis inventore labore quidem facilis, ad, molestias esse ipsum ut libero fugiat deserunt porro reiciendis in.</p>
      </div>
    </div>
  )
}

export default ViewEventsAndProgram