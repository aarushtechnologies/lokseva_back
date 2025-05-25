let express = require('express')
let app = express()

let InquiriesRouter = require('./routes/inquiries.js')
app.use(express.json())

app.use('/',InquiriesRouter)

app.listen(3000,()=>{
    console.log('server started')
})