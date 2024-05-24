import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import AuthContext from'../context/AuthContext'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


export default function YourPosts() {
  let store=useContext(AuthContext)
  let id = store.userDetails._id
  const [data, setdata] = useState([]);
  console.log(data)



let title=useRef()
let description=useRef()

  let Yourpost=async()=>{
    let res= await fetch(`http://localhost:8000/post/getAllpost/${id}`)
    let data=await res.json()
    console.log(data)
    setdata(data.AllPost)
  } 
useEffect(()=>{
  Yourpost()
},[])


const deletePost=async(ans)=>{
  let alertans=window.confirm('Are you sure you want to delete this')
 if(alertans){
  let res=await fetch(`http://localhost:8000/post/delete/${ans._id}`,{
    method:"DELETE",
     })
     let data =await res.json()
     console.log(data)
     Yourpost()
 }
  
}

// i am workin on edit post
const [postid,setpostid]=useState('');
const [showForm, setshowForm] = useState(false);
console.log(postid)

const Editpost=(ans)=>{
  console.log(ans)
  setpostid(ans._id)
  setshowForm(true)
  
}

const submitEdit=async(e)=>{
  e.preventDefault()
  let obj={
    title:title.current.value,
    description:description.current.value,
  }
  
  console.log(obj)
  let res=await fetch(`http://localhost:8000/post/update/${postid}`,{
    method:'PUT',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
  })
  let data=await res.json()
  console.log(data)
  Yourpost()
  setshowForm(false)
  }


  return (

    <div className='row row-cols-3 gap-3'>
      {data?.map((ele)=>{
        return<div className="card" style={{width: '18rem'}}>
        <img src={ele.image} className="card-img-top" alt="..." />
        <MdDelete  onClick={()=>deletePost(ele)} className='Delete'/>
        <FaEdit  onClick={()=>Editpost(ele)} style={{marginRight:"40px"}} className='Delete' />
        <div className="card-body">
          <h5 className="card-title">{ele.title}</h5>
          <h5 className="card-title">{ele.description}</h5>
        </div>
        </div>
      })}
    { showForm && <div className='col-md-4 p-3 formYourPost'>
        <form>
          <button onClick={()=>setshowForm(false)}type='button'className='btn-close bg-white'aria-label='Close'></button>
          <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">title</label>
  <input ref={title} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
</div>
<div class="form-floating">
  <textarea ref={description} class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
  <label for="floatingTextarea">description</label>
</div>
<button type='submit'onClick={submitEdit}className='btn btn-primary mt-3'>Submit</button>

        </form >
        </div>
}   
</div>



     
  )
}
