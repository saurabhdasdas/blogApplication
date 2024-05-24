import React, { useState } from 'react'
import AuthContext from './AuthContext';
const AuthState = (props) => {
  let details = JSON.parse(localStorage.getItem('login'))
    const [userDetails,setuserDetail]=useState({
        name:details?details.name:"",
        _id:details?details._id:"",
        login:details?true:false
    });
  return (
    <AuthContext.Provider value={{userDetails,setuserDetail}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState


