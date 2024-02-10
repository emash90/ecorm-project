const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 5003
const orderRoutes = require('./order-framework/express/routes/orderRoutes')

app.use('/api/v1/order', orderRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

