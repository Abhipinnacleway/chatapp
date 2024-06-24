import React, { useState } from 'react'
import '../styles/Register.css'
import { toast } from 'react-toastify';
import { createAccount } from '../api/Auth';
import { useNavigate } from 'react-router';
interface IRegister {
    name:string;
    password:string;
    confimPassword:string;
    email:string;

}

const Register = () => {
    const navigate = useNavigate();
    const [userData , setUserData] = useState<IRegister>({
        name:"",
        password:"",
        confimPassword:"",
        email:"",
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData , [e.target.name]:e.target.value });
    } 

    const Submit = async () =>{
        if(userData.confimPassword !== userData.password){
            toast.error("Password does not match")
            return ;
        }
        const res = await createAccount(userData);
        console.log(res)
        if(res.status === 200){
            toast.success(res.msg)
            if(res?.data?.token !== null){
                localStorage.setItem('token' , res?.data?.token )
                navigate('/chat')
            }   
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
                <label className='register_form_lable'>Name</label>
                <input className='register_form_input' autoComplete='false' onChange={(e) => handleChange(e)  }  name='name' type='text' />
                <label className='register_form_lable'>Email</label>
                <input className='register_form_input' autoComplete='false' onChange={(e) => handleChange(e)  }  name='email' type='text' />
                <label className='register_form_lable'>Password</label>
                <input className='register_form_input' autoComplete='false' onChange={(e) => handleChange(e)  }  name='password' type='text' />
                <label className='register_form_lable'>Confirm Password</label>
                <input className='register_form_input' autoComplete='false' onChange={(e) => handleChange(e)  }  name='confimPassword' type='text' />
                <button className='register_btn_submit'  onClick={()=> Submit()}  type='button' >Sign Up</button>
            </form>
        </div>
        </div>
    </section>
  )
}

export default Register