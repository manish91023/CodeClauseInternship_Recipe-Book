

import React from 'react'

const Avtar = ({banner,title}) => {
  return (
    <>
   
    <div className='flex justify-center items-center   mb-7 w-[400px ] h-[400px] mx-5 ' >
        <div className=' bg-green-700 px-7 py-5 w-[360px] h-[400px] rounded-lg cursor-pointer'>
            <div className=' w-[300px] h-[300px] '>

            <img src={banner} alt={title} className=' object-cover rounded-lg'/>
            <hr className=' h-[2px] bg-black mt-2'/>
            </div>
        
            <div className=' mt-4 '>
                <h2 className=' font-bold  text-black'>{title}</h2>
            </div>
        </div>
    </div>
    </>
  )
}

export default Avtar