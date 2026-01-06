require('dotenv').config();
require('./dbConnect'); // good practice

let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// ✅ RATE LIMITING (NEW)
// ===============================
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,               // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limit to ALL APIs
app.use("/api", apiLimiter);

// ===============================
const port = process.env.PORT || 4000;

// ===============================
// ROUTES
// ===============================
let UserRouter = require('./routes/users.js');
let OffersRouter = require('./routes/offers.js');
let BirthdaysRouter = require('./routes/birthdays.js');
let SalesRouter = require('./routes/sales.js');
let PropertiesRouter = require('./routes/properties.js');
const r2Routes = require("./routes/r2");

// ===============================
// 🔁 LEGACY ROUTES (KEEP)
// ===============================
app.use('/api/users', UserRouter);
app.use('/api/offers', OffersRouter);
app.use('/api/birthdays', BirthdaysRouter);
app.use('/api/sales', SalesRouter);
app.use('/api/properties', PropertiesRouter);
app.use('/api/r2', r2Routes);

// ===============================
// 🚀 VERSIONED ROUTES (NEW)
// ===============================
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/offers', OffersRouter);
app.use('/api/v1/birthdays', BirthdaysRouter);
app.use('/api/v1/sales', SalesRouter);
app.use('/api/v1/properties', PropertiesRouter);
app.use('/api/v1/r2', r2Routes);

// ===============================
app.listen(port, () => {
  console.log('server started on port', port);
});
