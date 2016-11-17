'use strict'

import dateFormat      from 'dateformat'
import $               from 'jquery'
import envivoBotonHtml from './templates/liveButton.njk'

const sigFechaEl = document.querySelector('[data-next-date]')

if (sigFechaEl) {
  const sigFechaStr = sigFechaEl.getAttribute('data-next-date'),
        streamingUrl = sigFechaEl.getAttribute('data-streaming-url'),
        transmisión = new Date(sigFechaStr),
        ahora = new Date(),
        unDia = 24 * 60 * 60 * 1000
  
  if (ahora < transmisión && transmisión - ahora < unDia) {
    const regresivo = $(envivoBotonHtml.render({ 
      streamingUrl
    }))
    $('header').append(regresivo)
    iniciarContador(transmisión, ahora, regresivo.find('#regresivo')[0])
  }
}

function iniciarContador (transmisión, ahora, regresivo) {
  const sigFechaStr = sigFechaEl.getAttribute('data-next-date')

  if (ahora < transmisión) {
    var intérvalo = setInterval(function () {
      var ahora = new Date()
      if (ahora < transmisión) {
        var diferencia = ~~((transmisión - ahora) / 1000)
        var segs = 0, mins = 0, minsS = '00:', hors = 0, horsS = '00:'
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
