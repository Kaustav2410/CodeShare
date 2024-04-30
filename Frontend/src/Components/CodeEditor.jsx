import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Editor from '@monaco-editor/react';
import { addSnippet, updateSnippet } from '../Store/Slices/snippetSlice';
import {useNavigate} from 'react-router-dom'
import shareIcon from '../media/Share.svg'
import dropDown from '../media/down arrow.svg'
import link from '../media/link.svg'
import { fetchSnippet } from '../Store/Slices/snippetSlice';
import { useParams } from 'react-router-dom';
// The monaco editor fails to initialize issue
// Check if there is a folder named monaco-editor in node modules or not 
// https://github.com/suren-atoyan/monaco-react/issues/169

// import { fetchSnippet } from '../Store/Slices/snippetSlice';
// import { useParams } from 'react-router-dom';
// https://www.npmjs.com/package/@monaco-editor/react#onvalidate
// console.log(defaultCode?.data?.SuccessResponse?.data?.[0]?.LanguageType);
// The onMount prop in the @monaco-editor/react library allows you to define a callback function that will be called when the editor component mounts. You can use this callback function to perform actions such as setting up the editor, accessing its instance, or performing any other initialization tasks.
export const CodeEditior = () => {
    // const {UniqueId} = useParams();  
    // console.log(UniqueId);
    // const defaultCode = useSelector((state)=>state.SnippetData)
    // console.log(defaultCode.data.SuccessResponse.data[0].Code)
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [languageType, setLanguageType] = useState('html');
    const [theme,setTheme] = useState('light');
    const [isDisabled, setIsDisabled] = useState(false);
    const Code = useSelector((state) => state.SnippetData.Code);
    const LangType = useSelector((state) => state.SnippetData.LangType);
    const currentTheme = useSelector((state)=>state.SnippetData.theme)
    const [currentCode,setCurrentCode] = useState(null);

    const {UniqueId} = useParams();  
    
    useEffect(() => {
        if (LangType !== null) setLanguageType(LangType);
        if (currentTheme !== null) setTheme(currentTheme);
    
        // Set currentCode based on the fetched code or the default HTML string
        if (Code !== null) {
            setCurrentCode(Code);
        } else {     
            setCurrentCode(`<html>
                <head>
                <title>HTML Sample</title>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <style type="text/css">
                    h1 {
                            color: #CCA3A3;
                        }
                    </style>
                    <script type="text/javascript">
                        alert("I am a sample... visit devChallengs.io for more projects");
                    </script>
                </head>
                <body>
                <h1>Heading No.1</h1>
                <input disabled type="button" value="Click me" />
                </body>
                </html>`);
        }
    }, [LangType, currentTheme, Code]);   
    
   

    useEffect(()=>{
        if(UniqueId!==null && LangType===languageType && Code===currentCode && currentTheme===theme){
            setIsDisabled(true) 
        } 
        else {
            setIsDisabled(false);  
        } 
        // console.log(currentCode,Code,UniqueId,languageType,LangType);
    },[currentCode,languageType,LangType,Code,UniqueId,currentTheme,theme]) 

    function handleLanguageType(value) {
        setLanguageType(value);
    }

    function handleTheme(value){
        setTheme(value);
    }

    function handleEditorChange(value, event) {
        console.log('here is the current model value:', value);
        setCurrentCode(value); 
      }

    function handleSnippet(e) {
        e.preventDefault();
        if(UniqueId!==null){
            dispatch(
                updateSnippet({
                    UniqueId: UniqueId,
                    snippetData: {
                        LanguageType: languageType,
                        Code: currentCode,
                        theme: theme,
                    }
                })
            ).then(()=>{
                alert("Updated has been saved!");
            })
        }
        else{
            dispatch(
                addSnippet({
                    LanguageType: languageType,
                    Code: currentCode,
                    theme: theme,
                })
            ).then((result) => {
                // Extract the unique ID from the response
                const uniqueId = result.payload.SuccessResponse.data.UniqueId;
                // Show the unique ID to the user in an alert
                alert(`Snippet created successfully! Unique ID: ${uniqueId}`);
                // Optionally, you can redirect the user to the page with the unique ID
                // history.push(`/${uniqueId}`);
                
                navigate(`/${uniqueId}`)
            }).catch((err)=>{
                alert("Cant redirect since snippet was not created")
            }); 
        }
    }
    return (
        <div className={`${theme==='light'?'bg-white':'bg-blackish'} flex flex-col gap-8 max-w-[1100px] xl:max-w-[min(700px,90%)] mx-auto mb-10 h-[35rem] p-4 rounded-xl font-Outfit`}>
            {/* <button >Show value</button> */}  
            <Editor
               height="80%" 
               width="100%" 
                defaultLanguage={languageType} 
                defaultValue={currentCode}  
                onChange={handleEditorChange}
                theme={theme} 
                language={languageType}
            />
            <div className='flex justify-between px-4 text-sm '>
            <div className='flex gap-4 sm:flex-col justify-between'>

            <div className='flex bg-greyish text-blackish rounded-xl px-2 relative w-[6.5rem] h-[2rem]'>
                <select value={languageType} onChange={(e) => handleLanguageType(e.target.value)} className='focus:border-none appearance-none bg-greyish rounded-xl w-8/12 outline-none '>
                    <option value="cpp">C++</option>
                    <option value="javascript">JavaScript</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                    <option value="java">JAVA</option>
                </select>
                <img src={dropDown} className='absolute right-1 w-[2rem] '/>
            </div>

            <div className='flex bg-greyish text-blackish rounded-xl px-2 relative w-[6.5rem] h-[2rem]'>
                <select value={theme} onChange={(e) => handleTheme(e.target.value)} className='focus:border-none appearance-none bg-greyish rounded-xl w-8/12 outline-none'>
                    <option value="light">Light</option>
                    <option value="vs-dark">Vs-dark</option>
                </select>
                <img src={dropDown} className='absolute right-1 top-0 w-[2rem] '/>
            </div>

            </div >
            <div className='flex gap-5 sm:flex-col'>
            {UniqueId!==null && <div className='flex items-center gap-1 cursor-pointer ' onClick={() => {navigator.clipboard.writeText(window.location.origin + '/' + UniqueId);alert("url copied")}}> 
                <img src={link} />
                <p className='w-[6rem] overflow-hidden text-greyish '>../{UniqueId}</p>
            </div>} 
            <div className={`${isDisabled?'bg-grey ':'bg-blue '}text-white flex rounded-3xl px-4 py-2 gap-3`}>
                <img src={shareIcon} /> 
                <button disabled={isDisabled} onClick={handleSnippet} >
                    Share 
                </button>
            </div>
            </div>
            </div>
           
        </div>
    );
};