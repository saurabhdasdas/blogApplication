import React, { useRef } from 'react'
import AuthContext from '../context/AuthContext'

function Form() {
  // let store =useContext(AuthContext)
let NameRef=useRef()
let EmailRef=useRef()
let AddressRef=useRef()
let PasswordRef=useRef()

const handleSubmit=()=>{
  let obj={
    Name:NameRef.current.value,
    Email:EmailRef.current.value,
    Address:AddressRef.current.value,
    Password:PasswordRef.current.value,
 }
   console.log(obj)}
  return (
    <div>
      <label htmlFor="">Name</label>
        <input ref={NameRef} type="text" /><br/> <br/>
        <label htmlFor="">Email</label>
        <input ref={EmailRef} type="text" /><br/> <br/>
        <label htmlFor="">Address</label>
        <input ref={AddressRef} type="text" /><br/> <br/>
        <label htmlFor="">Password</label>
        <input ref={PasswordRef} type="text" /> <br/> <br/>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Form
