const express = require('express')
const app = express()
const port = 5003
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const orderRoutes = require('./order-framework/express/routes/orderRoutes')

app.use('/orders/v1/order', orderRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

