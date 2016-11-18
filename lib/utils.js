function weekDistance (date1, date2) {
  var WEEK = 1000 * 60 * 60 * 24 * 7

  var date1ms = date1.getTime()
  var date2ms = date2.getTime()

  var diff = Math.abs(date2ms - date1ms)

  return Math.floor(diff / WEEK)
}

module.exports = {
  weekDistance: weekDistance
}
