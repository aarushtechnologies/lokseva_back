let express = require('express')
let app = express()

let RegisterRouter = require('./routes/registers.js')
app.use(express.json())


app.use('/',RegisterRouter)

app.listen(4000,()=>{
    console.log('server started')
})