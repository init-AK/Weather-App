const request = require('request')

const getWeather = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0acaa7f11334037a7f28df5ebf60193b&query=${lon},${lat}&units=f`
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to Network Service')
        } else if (response.body.error) {
            callback(response.body.error.info)
        } else {
            const data = response.body.current
            callback(undefined, `${data.weather_descriptions[0]}. It is ${data.temperature} degrees out , but feels like ${data.feelslike}.`
            )
        }
    })
}

module.exports = getWeather