require('dotenv').config()
require('express-async-errors')

// dependencies
const express = require('express');
const app = express();
const path = require('path'); 
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const db = require('./db');
app.use(cors(corsOptions))
const PORT = process.env.PORT || 3500

// middleware
app.use(logger)

app.use(express.json())
app.use(cookieParser())

// routes
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/player', require('./routes/playerRoutes'))
app.use('/avg', require('./routes/avgRoutes'))

// css, images, html files
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))