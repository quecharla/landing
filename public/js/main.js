function actionScroll() {
  scrollTo(document.body, window.innerHeight, 200)
}

function scrollTo(elem, to, duration) {
    if (duration <= 0) return

    var diff = to - elem.scrollTop,
    	add = diff / duration * 10

    setTimeout(function() {
        elem.scrollTop = elem.scrollTop + add

        if (elem.scrollTop === to) return

        scrollTo(elem, to, duration - 10)

    }, 10)
}

document.getElementById('scroll-header').addEventListener("click", actionScroll , false)