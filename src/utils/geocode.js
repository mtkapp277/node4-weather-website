const request = require('postman-request')

const geocode = (address, callback) => {
    const api_key = 'pk.eyJ1IjoibXRrYXBwMjc3IiwiYSI6ImNsNGtid3RiMzBieHIzaWx4ZXczcTZrOHcifQ.TWzOat7jsF4Q9HpnwG8GqQ'
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + api_key + '&limit=1' 

    request({ url: geoCodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. try another search')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
    