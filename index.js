// Core Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Dependency Imports 

const {CONNECTION_URL,PORT} = require('./config')

const bookingRoutes = require('./routes/booking')
const showInfoRoute = require('./routes/showInfo')

//App Config

const app = express()

//Middleware

app.use(express.json())
app.use(cors())

//API Endpoints

app.get('/', (req,res) => {
    res.send("Welcome to  Backend Application")
})
app.use('/auth', bookingRoutes)
app.use('/profile', showInfoRoute)

// DB Config
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify:false
})

//Listners

app.listen(PORT,()=>{
    console.log('Server Running on port : ', PORT)
})
