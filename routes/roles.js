const express = require("express")
const router = express.Router()

const Role = require("../schemas/Role")
const User = require("../schemas/User")

// CREATE ROLE
router.post("/",async(req,res)=>{

const role = new Role(req.body)

await role.save()

res.json(role)

})


// GET ALL ROLE
router.get("/",async(req,res)=>{

const roles = await Role.find({isDeleted:false})

res.json(roles)

})


// GET ROLE BY ID
router.get("/:id",async(req,res)=>{

const role = await Role.findById(req.params.id)

res.json(role)

})


// UPDATE ROLE
router.put("/:id",async(req,res)=>{

const role = await Role.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(role)

})


// SOFT DELETE ROLE
router.delete("/:id",async(req,res)=>{

const role = await Role.findByIdAndUpdate(
req.params.id,
{isDeleted:true},
{new:true}
)

res.json(role)

})


// GET USERS BY ROLE
router.get("/:id/users",async(req,res)=>{

const users = await User.find({
role:req.params.id,
isDeleted:false
}).populate("role")

res.json(users)

})

module.exports = router