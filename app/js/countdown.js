'use strict'

import $ from 'jquery'
import envivoBotonHtml from './templates/liveButton.njk'

const sigFechaEl = document.querySelector('[data-next-date]')

if (sigFechaEl) {
  const sigFechaStr = sigFechaEl.getAttribute('data-next-date')
  const duraciónTransmisión = 3 * 60 * 60 * 1000 // 3 horas que dura la transmision
  const transmisión = new Date(sigFechaStr)
  const ahora = new Date()
  const unDia = 24 * 60 * 60 * 1000

  if (ahora < (+transmisión + duraciónTransmisión) &&
      transmisión - ahora < unDia) {
    const regresivo = $(envivoBotonHtml.render())
    $('header').append(regresivo)
    iniciarContador(transmisión, regresivo.find('#regresivo')[0])
  }
}

function iniciarContador (transmisión, regresivo) {
  const intérvalo = setInterval(() => {
    const ahora = new Date()
    if (ahora < transmisión) {
      const diferencia = transmisión - ahora
      const segundo = 1000
      const minuto = 60 * segundo
      const hora = 60 * minuto
      const difHoras = ~~(diferencia / hora)
      const difMins = ~~((diferencia - difHoras * hora) / minuto)
      const difSegs = ~~((diferencia - difHoras * hora - difMins * minuto) / segundo)
      regresivo.innerHTML = `${dosDigitos(difHoras)}:${dosDigitos(difMins)}:${dosDigitos(difSegs)}`
    } else {
      clearInterval(intérvalo)
      regresivo.style.display = 'none'
    }
  }, 1000)
}

function dosDigitos (num) {
  return ('0' + num).slice(-2)
}
