const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const http = require('http').createServer(app)

app.use(cors())
app.use('/trips', require('./route/tripsRoute'))


http.listen(port, () => {
    console.log(`Start server at port ${port}`)
})