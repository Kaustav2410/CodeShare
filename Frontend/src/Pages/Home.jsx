import React ,{useEffect}from 'react'
import { CodeEditior } from '../Components/CodeEditor'
import { Header } from '../Components/Header'
import backsvg from '../media/Hero-Background-notecode.svg'
import { useSelector,useDispatch} from 'react-redux'
import { Skeleton } from '../Components/Skeleton';
import { fetchSnippet } from '../Store/Slices/snippetSlice';
import { useParams } from 'react-router-dom';


export const Home = () => {
  const isLoading = useSelector((state) => state.SnippetData.loading);
  const dispatch = useDispatch();
  const {UniqueId} = useParams();  
  useEffect(()=>{
    // console.log(UniqueId);
    dispatch(fetchSnippet(UniqueId)) 
  },[UniqueId])
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
  )
}
