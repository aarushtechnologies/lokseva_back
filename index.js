let express = require('express')
let app = express()

let RegisterRouter = require('./routes/registers.js')
let OffersRouter = require('./routes/offers.js')
let BirthdaysRouter = require('./routes/birthdays.js')
app.use(express.json())


app.use('/api/register/',RegisterRouter)
app.use('/api/offers/',OffersRouter)
app.use('/api/birthdays/',BirthdaysRouter)

app.listen(4000,()=>{
    console.log('server started')
})