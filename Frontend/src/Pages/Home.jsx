import React from 'react'
import { CodeEditior } from '../Components/CodeEditor'
import { Header } from '../Components/Header'
import background from '../media/Hero-Background-notecode@2x.png'
import backsvg from '../media/Hero-Background-notecode.svg'
import {useDispatch, useSelector} from 'react-redux'
import { Skeleton } from '../Components/Skeleton';
export const Home = () => {
  const isLoading = useSelector((state) => state.SnippetData.loading);

  return (
    <div className='min-h-screen w-full'>
      <img src={backsvg} className='fixed -z-10 w-full'/>

        <Header/>
        {/* Conditionally render based on loading state */}
        {isLoading ? (
                <Skeleton/>
            ) : (
                <CodeEditior />
            )}
        <div className='bg-gradient-to-br from-violet to-dark_violet w-full h-[390px] sticky bottom-0 -z-10' >
        <div className="absolute bottom- left-0 w-full h-3/6 bg-white rounded-b-full bg-hero-pattern "></div>
        </div>  
    </div>
  )
}
