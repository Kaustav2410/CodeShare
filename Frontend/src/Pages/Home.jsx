import React from 'react'
import { CodeEditior } from '../Components/CodeEditor'
import { Header } from '../Components/Header'
import background from '../media/Hero-Background-notecode@2x.png'

export const Home = () => {
  return (
    <div className='min-h-screen '>
      <img src={background} className='fixed -z-10'/>

        <Header/>
        <CodeEditior/> 
        <div className='bg-gradient-to-br from-violet to-dark_violet w-full h-[30rem] sticky bottom-0 -z-10 ' >
        <div class="absolute top-0 left-0 w-full h-3/6 bg-white rounded-b-full"></div>
        </div>  
    </div>
  )
}
