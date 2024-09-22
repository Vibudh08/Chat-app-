import { createContext, useState } from "react";
import run from '../config/gemini'

export const context = createContext()

const ContextProvider = (props)=>{

    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setLoading] = useState(false)
    const [resultData,setResultData] = useState("")
    const [isOpen, setIsOpen] = useState(true);


    const delayPara = (index,nextword)=>{
        setTimeout(function(){
            setResultData(prev=> prev+nextword)
        },50*index)
    }
    
    const newChat = ()=>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent =async (prompt)=>{

        setResultData("")
        setLoading(true)
        setShowResult(true)

        let response;
        if(prompt !== undefined){
            setRecentPrompt(prompt)
            response = await run(prompt) 
        }else{
            setRecentPrompt(input)
            setPrevPrompts(prev=>[...prev,input])
            response = await run(input) 
        }

        let responseArray = response.split("**")
        let newResponse ="" ;
        for(let i =0; i < responseArray.length; i++){
            if(i%2==0){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>")
        let newResponseArray = newResponse2.split(" ")
        for(let i=0; i<newResponseArray.length; i++){
            const nextword = newResponseArray[i]
            delayPara(i,nextword+" ")
        }
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        isOpen,
        setIsOpen
    }
    return(
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider