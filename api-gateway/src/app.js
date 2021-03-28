const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())
app.use('/trips', require('./route/tripsRoute'))


app.listen(port, () => {
    console.log(`Start server at port ${port}`)
})