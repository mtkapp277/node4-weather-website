const request = require('postman-request')

//const forecast = (lat, long, callback) => {
const forecast = ({ latitude, longitude }, callback) => {
    //http://api.weatherstack.com/current?access_key=f802a24bed3e422a1411694682d6a4c2&query=37.8267,-122.4233
    const url = 'http://api.weatherstack.com/current?access_key=f802a24bed3e422a1411694682d6a4c2&query=' + latitude + ','+ longitude + '&units=f'
    //bad on purpose: const url = 'http://api.weatherstack.com/current?access_key=f802a24bed3e422a1411694682d6a4c2&query=1&units=f'

    //console.log(lat, long)
    //request({ url: wxurl, json: true}, (error, response) => {
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feels: body.current.feelslike,
                desc: body.current.weather_descriptions[0]
            })
            //console.log(desc + '. It is currently ' + temp + '. it feels like ' + feels)
        }
    })
}

module.exports = forecast