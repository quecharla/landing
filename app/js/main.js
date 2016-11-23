import './countdown'
import './timeZone'
import $ from 'jquery'

const arrow = $('#scroll-header')
const windowHeight = $(window).height()

$('[data-href]').on('click', (e) => {
  window.open($(e.target).data('href'))
  return false
})

function actionScroll () {
  scrollTo(document.body, windowHeight, 200)
}

function scrollTo (elem, to, duration) {
  if (duration <= 0) return

  let diff = to - elem.scrollTop
  let add = diff / duration * 10

  setTimeout(function () {
    elem.scrollTop = elem.scrollTop + add
    if (elem.scrollTop === to) return
    scrollTo(elem, to, duration - 10)
  }, 10)
}

arrow.on('click', actionScroll)
