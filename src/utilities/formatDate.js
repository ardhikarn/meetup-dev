export default date => {
  const newDate = new Date(date)
  const formatDate = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute }
  ] = formatDate.formatToParts(newDate)

  return `${day} ${month} ${year} ${hour}:${minute} WIB` // WIB = Waktu Indonesia Barat => West Indonesia Time (zone)
}
