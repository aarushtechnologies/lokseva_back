require('dotenv').config();
let express = require('express')
let app = express()

const port = process.env.PORT || 4000;




let RegisterRouter = require('./routes/registers.js')
let OffersRouter = require('./routes/offers.js')
let BirthdaysRouter = require('./routes/birthdays.js')
let SalesRouter = require('./routes/sales.js')
let PropertiesRouter = require('./routes/properties.js')
app.use(express.json())


app.use('/api/register/',RegisterRouter)
app.use('/api/offers/',OffersRouter)
app.use('/api/birthdays/',BirthdaysRouter)
app.use('/api/sales/',SalesRouter)
app.use('/api/properties/',PropertiesRouter)

app.listen(port,()=>{
    console.log('server started')
})