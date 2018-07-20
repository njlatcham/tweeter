"use strict"

// Basic express setup:
const PORT          = 3000
const express       = require("express")
const bodyParser    = require("body-parser")
const app           = express()
var sassMiddleware = require('node-sass-middleware')

// Requires external DB, MongoDB
const MongoClient = require("mongodb").MongoClient
const MONGODB_URI = "mongodb://localhost:27017/tweeter"

const srcPath = __dirname + '/../sass'
const destPath = __dirname + '/../public/styles'

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/styles', sassMiddleware({
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed',
}))
app.use(express.static("public"))

MongoClient.connect(MONGODB_URI, (err, client) => {
  	if (err) {
	    console.error(`Failed to connect: ${MONGODB_URI}`)
	    throw err
  	}

  	const db = client.db('tweeter')
  	const DataHelpers = require("./lib/data-helpers.js")(db)
  	const tweetsRoutes = require("./routes/tweets")(DataHelpers)

  	app.use("/tweets", tweetsRoutes)

	app.listen(PORT, () => {
	  	console.log("Example app listening on port " + PORT)
	});

  	console.log(`Connected to mongodb: ${MONGODB_URI}`)
})
