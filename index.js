require('dotenv').config();
let express = require('express')
let app = express()
app.use(express.json())

app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 4000;

let UserRouter = require('./routes/users.js')
let OffersRouter = require('./routes/offers.js')
let BirthdaysRouter = require('./routes/birthdays.js')
let SalesRouter = require('./routes/sales.js')
let PropertiesRouter = require('./routes/properties.js')



app.use('/api/users/',UserRouter)
app.use('/api/offers/',OffersRouter)
app.use('/api/birthdays/',BirthdaysRouter)
app.use('/api/sales/',SalesRouter)
app.use('/api/properties/',PropertiesRouter)

app.listen(port,()=>{
    console.log('server started')
})
