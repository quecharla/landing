import test from 'ava'
import addTimezone from '../../../app/js/timeZone'
import moment from 'moment-timezone'

test('Test timezone', async t => {
  const el = document.createElement('div')
  const time = '2016-11-15T20:00:00-05:00'

  t.plan(2)

  el.innerHTML = ''
  el.setAttribute('data-time', time)

  addTimezone(el)

  const date = moment.tz(time, moment.tz.guess())
  t.is(el.innerHTML, ` / ${date.format('h:mmA z')}`)

  el.innerHTML = ''
  el.setAttribute('data-time-separator', '++')

  addTimezone(el)

  t.is(el.innerHTML, `++${date.format('h:mmA z')}`)
})
