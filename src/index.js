const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoCode = require('./utils/geocode')
const getWeather = require('./utils/weather')

const app = express()

//Defining The Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting the Paths and the Templates
app.set('views',viewsPath )
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setting the Static Directory
app.use(express.static(publicPath))

//Handling All the ROUTES
app.get('/', (req,res) => {
    res.render('index', {
        title:'Weather App',
        name:'Akshath'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'Entrepreneur',
        name:'Akshath'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        name:'Our Customer Care Services are Available 24/7.'
    })
})

app.get('/help/*' ,(req,res) => {
    res.render('error', {
        title:'Help',
        name:'Akshath',
        errorMessage:'HELP ARTICLE NOT FOUND'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    getGeoCode(req.query.address, (error, {
        latitude,
        longitude,
        placeName
    } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        getWeather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location:placeName,
                weather:weatherData
            })
        })
    })
})

app.get('*',(req,res) => {
    res.render('error', {
        title:'404',
        name:'Akshath',
        errorMessage:'PAGE NOT FOUND'
    })
})

const PORT = process.env.PORT || 1303
//LISTENING to the Server at PORT
app.listen(PORT, () => {
    console.log(`Server is up and running on port:${PORT}`)
})
