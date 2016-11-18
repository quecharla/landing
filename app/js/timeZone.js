import $ from 'jquery'
import moment from 'moment-timezone'

const timeZone = moment.tz(new Date(), moment.tz.guess()).format('z')

if (timeZone !== 'COT') {
  $('.to-timezone').each((i, el) => addTimezone(el))
}

function addTimezone (el) {
  const $el = $(el)
  const separator = $el.data('time-separator') || ' / '
  const date = moment.tz($el.data('time'), moment.tz.guess())
  $el.append(`${separator}${date.format('h:mmA z')}`)
  return false
}

export default addTimezone
