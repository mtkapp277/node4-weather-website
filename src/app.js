const path = require('path')
const express = require('express')
const hbs = require('hbs')

// const geocode = require('../src/utils/geocode.js')
// const forecast = require('../src/utils/forecast.js')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000  //Set only by HEROKU

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michael Kapp'
    })
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: 'About Me',
        name: 'Michael Kapp'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Michael Kapp',
        helpText: 'This is the help page... good luck'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address...'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
            if (error) {
                //return console.log(error)
                return res.send({
                    error
                })
            } 
        
            //forecast(geodata.latitude, geodata.longitude, (error, forecastdata) => {
            forecast({ latitude, longitude }, (error, forecastdata) => {
                if (error) {
                    //return console.log(error)
                    return res.send({
                        error
                    })
                }
                // console.log('Error', error)
                // console.log('Data', forecastdata)
                res.send({
                    forecast: forecastdata,
                    location,
                    address: req.query.address
                })
              })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('/help', (req, res) => {
//     res.send(help.html)
//     res.send([{
//         name: 'Andrew'
//     }, {
//         name: 'sarah'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Michael Kapp',
        errorMessage: 'Help Article not found.'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Michael Kapp',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})