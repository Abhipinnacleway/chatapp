import React, { useEffect } from 'react'
import useCheckAuth  from '../hooks/useCheckAuth' 
import { Link  } from "react-router-dom"
import ChatUI from './ChatUI'
const Home = () => {

  const { isAuthenticated , loading , error , userData } = useCheckAuth()

  return  (
    <div>
        <div>
            <nav style={{display:'flex' , gap:'10px' ,   }} >
                <Link to="/register" >Sign Up</Link>  
                <Link to="/login" >Sign In</Link>  
                <Link to="/chat" >Chat</Link>  
      
            </nav>
        </div>
    </div>
  )
}

export default Home