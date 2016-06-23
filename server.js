var express = require('express')
var request = require('request')
var app = express()

const staging = 'http://solr-slave01-az1.staging.tescloud.com:8983/resource-intl/select?wt=json&indent=true&'
const local = 'http://localhost:8983/solr/resource-intl/select?wt=json&indent=true&'

app.use('/', require('cors')())
app.use("/solr", (req, res) => {
  request.get(staging + req.query.query, (err, result, body) => {
    res.send(JSON.parse(body))
  })
})

app.listen(5678, () => {
  console.log("app started on 5678")
})
