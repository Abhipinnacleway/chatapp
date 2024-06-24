import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { LogIn } from '../api/Auth';
import { useNavigate } from 'react-router';
interface ILogin {
    password:string;
    email:string;

}


const Login = () => {
    const navigate = useNavigate()
    const [userData , setUserData] = useState<ILogin>({
        password:"",
        email:"",
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData , [e.target.name]:e.target.value });
    } 

    const Submit = async () =>{
        const res = await LogIn(userData);
        if(res.status === 200){
            toast.success(res.msg)
            if(res?.token){
                localStorage.setItem('token' , res?.token )
            }
            navigate('/chat')

        }else{
            toast.error(res.msg)
        }
    }




  return (
    <section className='register_container'  >
        <div className='register_container_box' >
        <span className='register_title_box' >
            <h3 className='register_title' >Create Account</h3>
        </span>
        <div className='register_form_box'>
            <form className='register_form' >
             
                <label className='register_form_lable'>Email</label>
                <input className='register_form_input' required={true} autoComplete='false' onChange={(e) => handleChange(e)  }  name='email' type='text' />
                <label className='register_form_lable'>Password</label>
                <input className='register_form_input' required={true} autoComplete='false' onChange={(e) => handleChange(e)  }  name='password' type='text' />
                <button className='register_btn_submit'  onClick={()=> Submit()}  type='button' >Sign In</button>
            </form>
        </div>
        </div>
    </section>
  )
}

export default Login