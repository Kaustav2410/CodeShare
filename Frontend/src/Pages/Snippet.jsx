import React ,{ useEffect } from 'react'
import { CodeEditior } from '../Components/CodeEditor'
import { useParams } from 'react-router-dom';
import { fetchSnippet } from '../Store/Slices/snippetSlice';
import {useDispatch, useSelector} from 'react-redux'
import backsvg from '../media/Hero-Background-notecode.svg'
import { Header } from '../Components/Header';

import { Skeleton } from '../Components/Skeleton';
export const Snippet = () => {
    const dispatch = useDispatch();
    const {UniqueId} = useParams();  
    useEffect(()=>{
      // console.log(UniqueId);
      dispatch(fetchSnippet(UniqueId)) 
    },[UniqueId])
    const isLoading = useSelector((state) => state.SnippetData.loading);

    return (
        <div className='min-h-screen w-full'>
      <img src={backsvg} className='fixed -z-10 w-full' fetchpriority="high"/>

        <Header/>
        {isLoading ? (
                <Skeleton/>
            ) : (
                <CodeEditior/>
            
            )}
        <div className='bg-gradient-to-br from-violet to-dark_violet w-full h-[390px] fixed bottom-0 -z-10' >
        <div className="absolute bottom- left-0 w-full h-3/6 bg-white rounded-b-full  ">
        </div>
        </div>  
    </div>
    );
}
