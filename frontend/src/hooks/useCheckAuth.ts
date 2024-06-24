import { useEffect, useState } from "react"
import { checkAuth } from "../api/Auth"



const useCheckAuth = () =>{
    const [userData , setUserData] = useState({
        email:'',
        id:'',
    })
    const [ loading , setLoading ] = useState(false);
    const [isAuthenticated , setIsAuthenticated] = useState(false);
    const [error , setError] = useState('');
    useEffect(()=>{
        setLoading(true)
         const isAuth = async () => {
            let token = localStorage.getItem('token')
            if(token){
                const res = await checkAuth(token)
                if(res?.msg === 'valid'){
                    setIsAuthenticated(true)
                    if(res.data){
                        setUserData({email:res.data?.user , id:res.data?.id})
                    }
                }else{
                    return 
                }
                
            }else{
                setError('Please Login')
            }
            setLoading(false);
         }
         isAuth();
    },[])
    console.log(isAuthenticated)
    return { isAuthenticated , error , loading , userData }
}
export default useCheckAuth