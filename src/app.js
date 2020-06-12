const path = require('path');
const express = require('express')
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/weatherapi")
const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//set handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setting up static directory to serve
app.use(express.static(publicDir))
 
app.get(['','/','/index'],(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'saikiran gonugunta'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'App Creator',
        name:'saikiran gonugunta'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help page',
        name:'saikiran gonugunta'
    })
})
app.get('/help/*',(req,res) => {
    res.send('Help Article not found')
})

app.get("/weather",(req,res)=>{
    console.log(req.query) 
    if (!req.query.address) {
        return res.send({
            error:'You must provide a search term'
        })   
    }
    else {
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if (error){return res.send({error:error})}
            forecast(latitude,longitude,(error,{description,temp,maxtemp,mintemp})=>{
              if (error){return res.send({error:error})}
            //   return res.render('index') 
              return res.send({
                    location:location,
                    description:description,
                    temp,
                    maxtemp,
                    mintemp,
                })
            })
        })
    }
})

app.get('*',(req,res)=>{
    res.render('notfound')
})

app.listen(port,() => {
    console.log('Server is up on port '+port)
})