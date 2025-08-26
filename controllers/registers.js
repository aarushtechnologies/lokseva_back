require('../dbConnect')

let Registers = require('../models/registers.js')

let allRegisters = async(req,res)=>{
    let data = await Registers.find()
    // res.send(data)    
    res.json(data)
}


let singleRegister = async(req,res)=>{
    let _id = req.params._id
    // res.send('Home Page')
    let data = await Registers.find({_id:  _id})
    res.json(data)
}



let deleteRegister= async(req,res)=>{
    let _id = req.params._id

    let result = await Registers.deleteOne({_id: _id})
    res.json({'status':'success'})
}

let insertRegister = async(req,res)=>{
    let body = req.body
    // console.log(body)
    await Registers.insertOne(body)  
    res.json({'status':'success'})
}


let updateRegister = async(req,res)=>{
    let body = req.body
    let _id = req.params._id
    
    await Registers.updateOne({_id:_id},{
        $set: body
    })  
    res.json({'status':'success'})

}


module.exports = {
    allRegisters,
    singleRegister,
    deleteRegister,
    insertRegister,
    updateRegister
}