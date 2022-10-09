//Import
import express from 'express'
import bodyParser from 'body-parser'

//App express
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//Listen
const PORT = 5000;
function listen() {
    app.listen(PORT, () => {
        console.log(`Server is connected to port : ${PORT}`)
    })
}
listen()