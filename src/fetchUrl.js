const API_KEY = process.env.REACT_APP_API_KEY
const lat = process.env.REACT_APP_LAT
const lon = process.env.REACT_APP_LON

export const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${API_KEY}`
