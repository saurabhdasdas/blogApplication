import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from '../context/AuthContext';

const Login = () => {

  let store=useContext(AuthContext)
  console.log(store)
  let emailRef=useRef()
  let passwordRef=useRef()
  let navigate = useNavigate()


  const handleSubmit=async()=>{
    let obj={
      email:emailRef.current.value,
      password:passwordRef.current.value,
    }
    console.log(obj)
    let req = await fetch('http://localhost:8000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })

        let datas = await req.json();
        console.log(datas)
        
        if(datas.success){
          localStorage.setItem('login',JSON.stringify({
            name:datas.userDetails.name,
            _id:datas.userDetails._id,
            login:true
          }))
          store.setuserDetail({
            name:datas.userDetails.name,
            _id:datas.userDetails._id,
            login:true
          })

            navigate('/home')
            toast.success(datas.msg,{position: "top-center"});
        }
        else{
            toast.error(datas.msg,{position: "top-center"}); 
        }
  }
  return (
    <div className='loginPage'>
        <h1>Login Page</h1>
    
        <label htmlFor="">Email</label>
        <input ref={emailRef} type="email" />
        <label htmlFor="">Password</label>
        <input ref={passwordRef} type="password" />
         <p>Not a user?  <Link to="/register">Signup?</Link>   </p>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login
