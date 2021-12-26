const express = require('express')
const app = express()

// app.use(express.static('public', { maxAge: 1000 * 3600 }))
app.use('/dist', express.static('dist', { maxAge: 1000 * 3600 }))

app.listen(3001)