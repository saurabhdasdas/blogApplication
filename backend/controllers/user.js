let User = require('../models/User')
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    let { name, email, password } = req.body;

    try {
        let userDetails = await User.findOne({ email: email })

        if (!userDetails) {
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(password
                , salt);
            // console.log(hash)
            // res.send(hashpassword)
            let details = await User.create({
                name,
                email,
                password:hashpassword
            })
            return res.status(200).json({ success: true, msg: "user created successfully", details })
        }
        else {
            return res.status(200).json({ success: false, msg: "user already exists!" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, msg: "error in creating user", error: error.message })
    }
}
const loginUser = async (req, res) => {
    let {email,password}  = req.body;
   try {
    let userDetails = await User.findOne({email:email})
    console.log(userDetails)
    if(userDetails){
        let comparePassword=await bcrypt.compareSync(password,userDetails.password)
        console.log(comparePassword)
            if(comparePassword){
              return  res.status(200).json({success:true,msg:"user logged in successfully",userDetails})
            }
            else{
                return  res.status(200).json({success:false,msg:"Wrong password"})
            }
    }
    else{
        return res.status(404).json({success:false,msg:"user not found"})
    }
   } catch (error) {
    return res.status(500).json({ success: false, msg: "error in log in user", error: error.message })
   }

}
const updateUser = async (req, res) => {
    let {name,password}=req.body
    let id=req.params._id;
    let hashpassword;
    try {
        if(password){
            const salt= await bcrypt.genSaltSync(10);
            hashpassword= await bcrypt.hashSync(password,salt);
        }
        console.log(id)
        let userExists =await User.findByIdAndUpdate(id,{$set:{name:name,password:hashpassword}})
        return res.status(200).json({success:true,msg:"user updated successfully"})
    } catch (error) {
        return res.status(500).json({success:false,msg:" error in user updated ",error:error.m})
        
    }
}
const deleteUser = async (req, res) => {
    try {
        let user =await User.findByIdAndDelete(req.params._id)
        return res.status(200).json({success:true,msg:"user delete successfully"})
    } catch (error) {
        return res.status(500).json({success:false,msg:" error in user deleteing ",error:error.m})
         
    }
}
const getAllusers=async(req,res)=>{
  let getAllusers =await User.find({})
  if(getAllusers){
     return res.status(200).json({success:true,msg:"  all user successfully" ,getAllusers})
  }
  else{
    return res.status(404).json({success:false,msg:" user noy found ",error:error.m})
         
  }
}
module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllusers,
}