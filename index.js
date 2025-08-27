let express = require('express')
let app = express()

let RegisterRouter = require('./routes/registers.js')
let OffersRouter = require('./routes/offers.js')
let BirthdaysRouter = require('./routes/birthdays.js')
let SalesRouter = require('./routes/sales.js')
app.use(express.json())


app.use('/api/register/',RegisterRouter)
app.use('/api/offers/',OffersRouter)
app.use('/api/birthdays/',BirthdaysRouter)
app.use('/api/sales/',SalesRouter)

app.listen(4000,()=>{
    console.log('server started')
})