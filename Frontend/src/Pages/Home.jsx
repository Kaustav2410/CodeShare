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
    console.log(UniqueId);
    // Only make a db call if the url has an unqiue id since using render(backend host provider) takes time to process in the backend upto 50 seconds
    if(UniqueId!==undefined){
        dispatch(fetchSnippet(UniqueId))
    }
  },[UniqueId])
  return (
    <div className='w-full min-h-screen'>
      <img src={backsvg} className='fixed w-full -z-10' fetchpriority="high"/>

        <Header/>
        {isLoading ? (
                <Skeleton/>
            ) : (
               <CodeEditior/>
            )}
        <div className='bg-gradient-to-br from-violet to-dark_violet w-full h-[390px] fixed bottom-0 -z-10' >
        <div className="absolute left-0 w-full bg-white rounded-b-full bottom- h-3/6 ">
        </div>
        </div>
    </div>
  )
}
