const express = require("express")
const router = express.Router()

const User = require("../schemas/User")


// CREATE USER
router.post("/",async(req,res)=>{

const user = new User(req.body)

await user.save()

res.json(user)

})


// GET ALL USER
router.get("/",async(req,res)=>{

const users = await User.find({
isDeleted:false
}).populate("role")

res.json(users)

})


// GET USER BY ID
router.get("/:id",async(req,res)=>{

const user = await User.findById(req.params.id)
.populate("role")

res.json(user)

})


// UPDATE USER
router.put("/:id",async(req,res)=>{

const user = await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(user)

})


// SOFT DELETE USER
router.delete("/:id",async(req,res)=>{

const user = await User.findByIdAndUpdate(
req.params.id,
{isDeleted:true},
{new:true}
)

res.json(user)

})


// ENABLE USER
router.post("/enable",async(req,res)=>{

const {email,username} = req.body

const user = await User.findOne({
email:email,
username:username
})

if(!user){
return res.json({message:"User not found"})
}

user.status = true

await user.save()

res.json(user)

})


// DISABLE USER
router.post("/disable",async(req,res)=>{

const {email,username} = req.body

const user = await User.findOne({
email:email,
username:username
})

if(!user){
return res.json({message:"User not found"})
}

user.status = false

await user.save()

res.json(user)

})

module.exports = router