import './countdown'
import './timeZone'

const arrow = document.getElementById('scroll-header'),
      topBar = document.getElementsByClassName('top-bar'),
      windowHeight = window.innerHeight

function actionScroll() {
  scrollTo(document.body, windowHeight, 200)
}

function scrollTo(elem, to, duration) {
  if (duration <= 0) return

  let diff = to - elem.scrollTop,
      add = diff / duration * 10

  setTimeout(function() {
    elem.scrollTop = elem.scrollTop + add
    if (elem.scrollTop === to) return
    scrollTo(elem, to, duration - 10)
  }, 10)
}


if (arrow) {
  arrow.addEventListener('click', actionScroll , false)
}
