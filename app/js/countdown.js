'use strict'

import $ from 'jquery'
import envivoBotonHtml from './templates/liveButton.njk'

const sigFechaEl = document.querySelector('[data-next-date]')

if (sigFechaEl) {
  const sigFechaStr = sigFechaEl.getAttribute('data-next-date')
  const streamingUrl = sigFechaEl.getAttribute('data-streaming-url')
  const transmisión = new Date(sigFechaStr)
  const ahora = new Date()
  const unDia = 24 * 60 * 60 * 1000

  if (ahora < transmisión && transmisión - ahora < unDia) {
    const regresivo = $(envivoBotonHtml.render({
      streamingUrl
    }))
    $('header').append(regresivo)
    iniciarContador(transmisión, ahora, regresivo.find('#regresivo')[0])
  }
}

function iniciarContador (transmisión, ahora, regresivo) {
  if (ahora < transmisión) {
    let intérvalo = setInterval(function () {
      var ahora = new Date()
      if (ahora < transmisión) {
        let diferencia = ~~((transmisión - ahora) / 1000)
        let segs = 0
        let mins = 0
        let minsS = '00:'
        let hors = 0
        let horsS = '00:'
        if (diferencia >= 60 * 60) {
          hors = ~~(diferencia / (60 * 60))
          horsS = dosDigitos(hors) + ':'
        }
        if (diferencia >= 60) {
          diferencia = diferencia - hors * 60 * 60
          mins = ~~(diferencia / 60)
          minsS = dosDigitos(mins) + ':'
        }

        segs = diferencia - hors * 60 * 60 - mins * 60

        regresivo.innerHTML = horsS + minsS + dosDigitos(segs)
      } else {
        clearInterval(intérvalo)
        regresivo.style.display = 'none'
      }
    })
  }
}

function dosDigitos (num) {
  return ('0' + num).slice(-2)
}
