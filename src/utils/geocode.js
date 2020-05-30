const request = require('request')
const getGeoCode = (address, callback) => {
    const GeoUrl =
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtzaGF0aDEwIiwiYSI6ImNrYWpoenRyMTA2aWsydWxzcHo4bng3amgifQ.g-Sq2g3W-t9pAHsOLoTKkA`

    request({
        url: GeoUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to the Server.')
        } else if (response.body.features.length === 0) {
            callback('Unable to Fetch data for the location, try another!')
        } else {
            const data = response.body.features[0]
            const placeName = data.place_name
            const longitude = data.center[0]
            const latitude = data.center[1]
            callback(undefined, {
                longitude,
                latitude,
                placeName,
            })
        }
    })
}
module.exports = getGeoCode