export const formatDt = dt => {
  let date = new Date();
  const weekday = dt * 1000
  date.setTime(weekday)
  return date
}

export const getTemp = temp => Math.round(parseInt(temp))
