import React from 'react'
import noteCode from '../media/NoteCodeLogo.svg'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div className='flex flex-col gap-6 items-center justify-between my-7 font-Outfit'> 
        <div>
            <Link to={'/'}>
                <img src={noteCode} className='w-32' />
            </Link>
        </div>
        <div className='font-bold flex flex-col gap-4 items-center'>
            <p className='text-2xl'>Create & Share</p>
            <p className='text-3xl'> Your Code easily</p>
        </div>
    </div>
  )
}
