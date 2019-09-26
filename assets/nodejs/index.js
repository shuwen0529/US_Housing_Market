const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get( '/', (request, response) => {
    response.json({info: 'Node.js, Express and Postgres API'})
})

app.get('/rankings', db.getRankings)
app.get('/rankings/:state', db.getRankingsByState)
app.get('/population/:state', db.getPopulationByState)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})