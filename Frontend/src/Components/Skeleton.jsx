import React from 'react'

export const Skeleton = () => {
  return (
    <div className='container bg-blackish flex flex-col gap-8 max-w-[1100px] xl:max-w-[min(700px,90%)] mx-auto mb-10 h-[35rem] p-4 rounded-xl font-Outfit'>
        
        <div className='max-w-[1100px] xl:max-w-[min(700px,90%)] mx-auto mb-10 h-4/6 p-4 rounded-xl'>
        </div>

        <div className='flex justify-between px-4 text-sm '>
            
            <div className='dropDownContainer flex gap-4 sm:flex-col justify-between'>

                <div className='languageDiv flex bg-greyish text-blackish rounded-xl px-2 relative w-[6.5rem] h-[2rem]'></div>
                <div className=' themeDiv flex bg-greyish text-blackish rounded-xl px-2 relative w-[6.5rem] h-[2rem]'></div>

            </div >

            <div className='w-[6rem] bg-blue text-white flex rounded-3xl px-4 py-2 gap-3'>

            </div>


            </div>
    </div>
  )
}
