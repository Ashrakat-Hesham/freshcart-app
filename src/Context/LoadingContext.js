import { createContext, useState } from 'react'

 export let LoadingContext = createContext(false)


 export default function LoadingProvider(props){
    const [isLoading, setIsLoading] = useState(true)



return<LoadingContext.Provider value={{isLoading,setIsLoading}}>{props.children}</LoadingContext.Provider>
 }