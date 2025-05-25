require('../dbConnect.js')

let Inquiries = require('../models/inquiries.js')

let allInquires = async(req,res)=>{
    let data = await Inquiries.find()
    res.send(data)    
}

let singleInquiry = async(req,res)=>{
    let rno = req.params.rno
    // res.send('Home Page')
    let data = await Inquiries.find({rno: +rno})
    res.send(data)    
}

let deleteInquiry= async(req,res)=>{
    let rno = req.params.rno

    let result = await Inquiries.deleteOne({rno: +rno})
    res.json({'status':'success'})
}

let insertInquiry = async(req,res)=>{
    let body = req.body
    // console.log(body)
    await Inquiries.insertOne(body)  
    res.json({'status':'success'})
}

let updateInquiry = async(req,res)=>{
    let body = req.body
    let rno = +req.params.rno
    
    await Inquiries.updateOne({rno:rno},{
        $set: body
    })  
    res.json({'status':'success'})

}

module.exports = {
    allInquires,
    singleInquiry,
    deleteInquiry,
    insertInquiry,
    updateInquiry
}