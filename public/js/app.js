const getWeather = async (address) => {
    const data = await fetch(`/weather?address=${address}`)
    return data.json()
}


const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const message1 = document.querySelectorAll('p')[1]
const message2 = document.querySelectorAll('p')[2]


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    getWeather(location).then((data) => {
        if (data.error) {
        message1.textContent = `Error - ${data.error}`
        } else {
            message1.textContent  = data.location
            message2.textContent = data.weather
        }
    })

})