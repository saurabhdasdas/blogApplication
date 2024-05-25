import React from 'react'
import { useLocation } from 'react-router-dom'

const Singlapage = () => {
    let location=useLocation()
    console.log(location)
  return (
   
    <div className='bg-warning'>
         <h1 style={{textAlign:'center',color:"purple"}}>Singlapage</h1>
      <img style={{width:'300px',height:"300px",marginLeft:'500px'}} src={location.state.image} alt="" />
      <h1 style={{textAlign:'center'}}>{location.state.title}</h1>
      <p style={{textAlign:'center'}}>{location.state.description}</p>
    </div>
  )
}

export default Singlapage
