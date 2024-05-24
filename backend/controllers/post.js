let Post=require('../models/Post') 

const createpost=async(req,res)=>{
    let{title,description,image,author}=req.body
    try {
        let post =await Post.create({
            title:title,
            image:image,
            description:description,
            author:author
        })
        res.status(200).json({success:true,msg:"post create successfully",post})
    } catch (error) {
        res.status(500).json({success:false,msg:"error create creating post",error:error.message})
        
    }
}

const updatePost=async(req,res)=>{
   let {title,description}=req.body
   let id =req.params._id;
   try {
    let post =await Post.findByIdAndUpdate({_id:id},{$set:{title,description}},{new:true})
   res.status(200).json({success:true,msg:"post update successfully",post})
   } catch (error) {
    res.status(500).json({success:false,msg:"error post update ",error:error.message})
    
   }
}
const deletePost=async(req,res)=>{
    let _id =req.params._id;
    try {
        await  Post.findByIdAndDelete(_id)
        res.status(200).json({success:true,msg:"post delete successfully"})
    } catch (error) {
        res.status(500).json({success:false,msg:"error post delete ",error:error.message})
        
    }

}
const getAllPost=async(req,res)=>{
    let _id=req.params._id;
    try {
        let AllPost=await Post.find({author:_id})
        if(AllPost.length){
        res.status(200).json({success:true,msg:" fetched all post successfully",AllPost})
        }else{
            return res .status(404).json({success:false,msg:"no posts found"})
        }
    } catch (error) {
        res.status(500).json({success:false,msg:"error in getting all post ",error:error.message})   
    }
}
const getAllUserPost=async(req,res)=>{
    let _id=req.params._id;
    try {
        let post=await Post.find(_id)
        if(getAllPost.length){
        res.status(200).json({success:true,msg:"post fetched all successfully",post})
        }else{
            return res .status(404).json({success:false,msg:"no posts found"})
        }
    } catch (error) {
        res.status(500).json({success:false,msg:"error in getting all post ",error:error.message})  
    }
}
const getsinglePost=async(req,res)=>{
    let _id=req.params._id;
    try {
        let post=await Post.findById(_id)
        res.status(200).json({success:true,msg:"post fetched successfully",post})
    } catch (error) {
        res.status(500).json({success:false,msg:"error in getting post ",error:error.message})  
    }
}

module .exports={
    createpost,
    updatePost,
    deletePost,
    getsinglePost,
    getAllUserPost,
    getAllPost
}


