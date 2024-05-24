import React from 'react'
import { useLocation } from 'react-router-dom'

const Singlapage = () => {
    let location=useLocation()
    console.log(location)
  return (
   
    <div className='bg-warning'>
         <h1 style={{textAlign:'center',color:"purple"}}>Singlapage</h1>
      <img style={{width:'300px',height:"300px"}} src={location.state.image} alt="" />
      <h1>{location.state.title}</h1>
      <p>{location.state.description}</p>
    </div>
  )
}

export default Singlapage
