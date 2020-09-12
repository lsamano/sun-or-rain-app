import moment from 'moment';

export const formatDt = (dt, weekday) => {
  let date = new Date();
  const time = dt * 1000
  date.setTime(time)
  if (weekday) return moment(date).format('dddd');
  return date;
}

export const getTemp = temp => Math.round(parseInt(temp))

const key = process.env.REACT_APP_API_KEY
const lat = process.env.REACT_APP_LAT
const lon = process.env.REACT_APP_LON

export const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${key}`
