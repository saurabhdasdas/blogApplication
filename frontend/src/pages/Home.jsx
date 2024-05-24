import React, { useContext, useEffect, useState} from 'react'
import { useRef } from 'react';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const[image,setimage]=useState("")
  const [posts, setposts] = useState([]);
  const[clicked,setclicked]=useState(false)

  let store=useContext(AuthContext)
  console.log(store)

  
  console.log(posts)
  let fetchNew= async()=>{
    let res =await fetch('http://localhost:8000/post/getAllUserPost')
   let post= await res.json()
    console.log(post)
    setposts(post.post)
  }
  useEffect(()=>{
    fetchNew()
  },[])

  let titleRef=useRef()
  let desciptionRef=useRef()

  const handleFileChange=(e)=>{
    let value= e.target.files[0];
    console.log(value)
    setimage (value)
  }

  function doConvert(img){
    return new Promise((resolve,reject)=>{
      var reader=new FileReader();
      reader.readAsDataURL(img);
      reader.onload=function(){
        resolve(reader.result)
      }
      reader.onerror=function(err){
        reject(reader.error)
      }

    })
  }

  const handlBlogSubmit=async(e)=>{
    e.preventDefault();
    let doConvertImage=await doConvert(image)
    console.log(doConvertImage)
    let obj={
      title:titleRef.current.value,
      description:desciptionRef.current.value,
      image:doConvertImage,
      author:store.userDetails._id
    }
    
  let res =await fetch('http://localhost:8000/post/create',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(obj)
  })
  let data=await res.json();
  console.log(data)
  fetchNew()
  setclicked(false)
  
  
  }



  return (
<div className='row'>
  <div className='col-2 bg-warning d-flex justify-contact-center' >
    <Sidebar clicked={clicked} setclicked={setclicked}/>
  </div>
   

<div className='col-10 bg-success'>
    <div className='row gap-2'>
      {posts.map((ele)=>{
        return<div className="card" style={{width: '18rem'}}>
  <img src={ele.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ele.title}</h5>
    <h5 className="card-title"> auther:{ele.auther
    }</h5>
{/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    <Link to="/Singla" state={ele} className="btn btn-primary">Go somewhere</Link>
  </div>
</div>

      })}
    </div>
</div>
<div className='formBox'>
 { clicked && <form action=''className='col-md-4'>
    <button onClick={()=>setclicked(false)}type='button'className='btn-close'aria-lable="Close"></button>
    <label htmlFor="">Title</label>
    <input ref={titleRef} type="text" />
    <label htmlFor="file"className='btn btn-primary'>uploadImage</label>
    <input onChange={handleFileChange} type="file"id='file'  hidden/>
    {! image &&<img src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-upload-cloud-vector-icon-png-image_1027251.jpg
    " alt="" />}
    {image &&<img src={URL.createObjectURL(image)} alt="" />}
    <label htmlFor="">desciption</label>
    <textarea ref={desciptionRef} name='' ></textarea>
    <button onClick={handlBlogSubmit} className='btn btn success'>Post Blog</button>
  </form>}
</div>
</div>



    

  )
}

export default Home
