require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require("./routes/PaymentRoute")
const connectDB = require("./utils/connection")

connectDB()

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.get('/api/getKey', (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID
    })
})

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`)
})
