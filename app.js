const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const session = require("express-session")

const route = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true },
    })
)

app.use(route)

app.listen(PORT, ()=>{
    console.log('connected')
})