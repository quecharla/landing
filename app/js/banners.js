/* globals Path2D Image */

import moment from 'moment-timezone'

const ratio = 2.2 // Para lograr la mejero calidad de las imágenes PNG
const logoSVGPath = [
  'M309,249.9c-29.4,44.3-80.2,80.4-133.4,80.4c-87,0-158.6-71.7-158.6-158.7S88.6,12.9,175.7,12.9 c53.9,0,104.2,27.4,133.4,72.7c0,0-104.4,51.3-116.9,51.6c-4.1,0.1-14.5,0.4-21.7,0.3c-14.7,0-26,0.1-35.2,3.7 c-19.4,8.6-20.8,42.3,2.4,51c7.6,2.6,10.7,1.6,18.4,2.8l8.8,0.7L165,237l24.5,0.4v-39.3l5.6,0.6C206.8,202.8,309,249.9,309,249.9',
  'M85.8,415c-3.1,4.2-6.7,7.3-10.9,9.1c-4.1,1.8-8.6,2.8-13.3,2.8c-5,0-9.5-0.8-13.7-2.5 c-4.1-1.7-7.7-4-10.6-7.1c-2.9-3-5.2-6.7-6.9-10.9c-1.7-4.2-2.5-8.8-2.5-13.8c0-5,0.8-9.5,2.5-13.7c1.7-4.2,4-7.8,6.9-10.8 c2.9-3,6.5-5.4,10.6-7.1c4.1-1.7,8.7-2.6,13.7-2.6c4.4,0,8.5,0.8,12.4,2.3c3.8,1.6,7.2,4.2,10.1,7.9l-5,4.1c-2-3.1-4.6-5.3-7.8-6.7 c-3.2-1.4-6.4-2.1-9.7-2.1c-4.2,0-8,0.7-11.5,2.2c-3.4,1.5-6.3,3.5-8.7,6.1s-4.2,5.6-5.5,9.1c-1.3,3.5-1.9,7.3-1.9,11.3 c0,4,0.6,7.8,1.9,11.3c1.3,3.5,3.1,6.5,5.5,9.1c2.4,2.6,5.3,4.6,8.7,6.1c3.4,1.5,7.2,2.2,11.5,2.2c1.7,0,3.4-0.2,5.2-0.6 c1.8-0.4,3.5-1,5.2-1.8c1.7-0.8,3.3-1.9,4.8-3.1c1.5-1.3,2.9-2.8,4-4.6L85.8,415z',
  'M95.3,355.6h5.5v34.5h0.2c1.1-2.3,2.9-4.3,5.5-6c2.6-1.7,5.6-2.5,9-2.5c3.3,0,6,0.5,8.1,1.6 c2.1,1,3.7,2.4,4.9,4.1c1.2,1.7,2,3.6,2.5,5.8s0.7,4.5,0.7,6.8v25.3h-5.5v-25c0-1.7-0.2-3.4-0.5-5c-0.3-1.6-0.8-3.1-1.6-4.4 c-0.8-1.3-1.8-2.3-3.2-3.1c-1.4-0.8-3.2-1.1-5.4-1.1c-2,0-3.9,0.4-5.8,1.1c-1.8,0.7-3.4,1.8-4.7,3.2c-1.3,1.4-2.4,3.3-3.1,5.4 c-0.8,2.2-1.1,4.7-1.1,7.7v21.3h-5.5V355.6z',
  'M179.5,407.3c0,2.1,0,4,0,5.6c0,1.7,0.1,3.2,0.1,4.6c0.1,1.4,0.1,2.7,0.2,4c0.1,1.2,0.2,2.5,0.4,3.7h-5.2 c-0.4-2.1-0.6-4.4-0.6-6.9h-0.2c-1.6,2.8-3.6,4.8-5.9,6.1c-2.4,1.3-5.4,1.9-9,1.9c-1.8,0-3.6-0.2-5.4-0.7c-1.8-0.5-3.4-1.2-4.8-2.2 c-1.4-1-2.6-2.3-3.4-3.9c-0.9-1.6-1.3-3.5-1.3-5.8c0-3.2,0.8-5.8,2.5-7.7c1.7-1.9,3.7-3.3,6.1-4.3c2.4-1,5-1.6,7.7-1.8 c2.7-0.3,5.1-0.4,7.2-0.4h6.4v-2.6c0-3.7-1.1-6.3-3.4-7.9c-2.3-1.6-5.1-2.4-8.6-2.4c-4.9,0-9.2,1.6-13,4.8l-3.2-3.8 c2-2,4.5-3.5,7.5-4.5c3-1,5.9-1.5,8.6-1.5c5.2,0,9.3,1.2,12.3,3.6c3.1,2.4,4.6,6.3,4.6,11.7V407.3z M168.5,403.8 c-2.3,0-4.6,0.2-6.8,0.5c-2.2,0.3-4.1,0.8-5.9,1.6c-1.7,0.7-3.1,1.7-4.2,2.9c-1,1.2-1.6,2.8-1.6,4.6c0,1.3,0.3,2.4,0.9,3.5 c0.6,1,1.3,1.8,2.3,2.5c0.9,0.6,1.9,1.1,3.1,1.5c1.1,0.3,2.3,0.5,3.5,0.5c2.9,0,5.4-0.4,7.3-1.3c1.9-0.9,3.4-2,4.6-3.4 c1.1-1.4,1.9-2.9,2.3-4.7c0.4-1.7,0.6-3.5,0.6-5.3v-2.9H168.5z',
  'M194.2,394.6c0-0.8,0-1.8-0.1-2.9c-0.1-1.1-0.1-2.3-0.1-3.4c0-1.2-0.1-2.3-0.1-3.3c-0.1-1-0.1-1.8-0.1-2.3h5.5 c0.1,1.6,0.1,3.1,0.1,4.6c0,1.5,0.1,2.4,0.2,2.9c1.4-2.5,3.2-4.6,5.4-6.2c2.2-1.6,4.9-2.4,8.1-2.4c0.6,0,1.1,0,1.6,0.1 c0.5,0.1,1.1,0.2,1.6,0.3l-0.6,5.4c-0.7-0.2-1.4-0.4-2.1-0.4c-2.4,0-4.5,0.4-6.2,1.1c-1.7,0.8-3.2,1.8-4.3,3.2 c-1.1,1.3-2,2.9-2.5,4.7c-0.6,1.8-0.8,3.8-0.8,5.8v23.2h-5.5V394.6z',
  'M216.6,421.3c0-1.2,0.4-2.3,1.3-3.1c0.9-0.9,1.9-1.3,3.1-1.3c1.2,0,2.3,0.4,3.1,1.3c0.9,0.9,1.3,1.9,1.3,3.1 c0,1.2-0.4,2.3-1.3,3.1c-0.9,0.9-1.9,1.3-3.1,1.3c-1.2,0-2.3-0.4-3.1-1.3C217,423.6,216.6,422.5,216.6,421.3z',
  'M241.2,355.6h5.5v69.6h-5.5V355.6z',
  'M295.4,407.3c0,2.1,0,4,0,5.6c0,1.7,0.1,3.2,0.1,4.6c0.1,1.4,0.1,2.7,0.2,4c0.1,1.2,0.2,2.5,0.4,3.7h-5.2 c-0.4-2.1-0.6-4.4-0.6-6.9h-0.2c-1.6,2.8-3.6,4.8-5.9,6.1c-2.4,1.3-5.4,1.9-9,1.9c-1.8,0-3.6-0.2-5.4-0.7c-1.8-0.5-3.4-1.2-4.8-2.2 c-1.4-1-2.6-2.3-3.4-3.9c-0.9-1.6-1.3-3.5-1.3-5.8c0-3.2,0.8-5.8,2.5-7.7c1.7-1.9,3.7-3.3,6.1-4.3c2.4-1,5-1.6,7.7-1.8 c2.7-0.3,5.1-0.4,7.2-0.4h6.4v-2.6c0-3.7-1.1-6.3-3.4-7.9c-2.3-1.6-5.1-2.4-8.6-2.4c-4.9,0-9.2,1.6-13,4.8l-3.2-3.8 c2-2,4.5-3.5,7.5-4.5c3-1,5.9-1.5,8.6-1.5c5.2,0,9.3,1.2,12.3,3.6c3.1,2.4,4.6,6.3,4.6,11.7V407.3z M284.4,403.8 c-2.3,0-4.6,0.2-6.8,0.5c-2.2,0.3-4.1,0.8-5.9,1.6c-1.7,0.7-3.1,1.7-4.2,2.9c-1,1.2-1.6,2.8-1.6,4.6c0,1.3,0.3,2.4,0.9,3.5 c0.6,1,1.3,1.8,2.3,2.5c0.9,0.6,1.9,1.1,3.1,1.5c1.1,0.3,2.3,0.5,3.5,0.5c2.9,0,5.4-0.4,7.3-1.3c1.9-0.9,3.4-2,4.6-3.4 c1.1-1.4,1.9-2.9,2.3-4.7c0.4-1.7,0.6-3.5,0.6-5.3v-2.9H284.4z'
]
/**
 * Crea la imagen para un charlante dado y la embebe en el body
 * @param {Object} charlante
 */
function crearTarjetaDelCharlante (charlante) {
  const canvas = document.createElement('canvas')
  const width = 440
  const height = 160
  canvas.width = width * ratio
  canvas.height = height * ratio
  // si quieres renderizar el canvas:
  // document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  // Gradient
  const grd = ctx.createLinearGradient(0, 0, width, 0)
  grd.addColorStop(0, '#1e1032')
  grd.addColorStop(1, '#452873')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, width, height)

  // Path Fondo
  const path = new Path2D(logoSVGPath[0])
  ctx.translate(-70, -90)
  ctx.fillStyle = '#1e1032'
  ctx.fill(path)
  ctx.translate(70, 90)

  // Path Logito
  ctx.save()
  ctx.translate(383, 20)
  ctx.scale(0.11, 0.11)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fill(path)
  ctx.restore()

  // Text Name
  ctx.textBaseline = 'middle'
  ctx.font = '22px "Open Sans"'
  ctx.fillStyle = 'white'
  ctx.fillText(charlante.nombre, 30, 40, width - 60)

  // Text Twitter
  ctx.font = '18px "Open Sans"'
  ctx.fillStyle = 'rgb(19,168,176)'
  ctx.fillText('@' + charlante.twitter, 30, 73, width - 60)

  // Texto titulo
  ctx.textBaseline = 'middle'
  ctx.font = '300 18px "Open Sans"'
  ctx.fillStyle = 'white'
  const lines = romperEnLíneas(charlante.titulo, ctx.font, width - 60)

  if (lines.length > 1) {
    const secondLine = lines[1] + (lines.length > 2 ? '...' : '')
    ctx.fillText(lines[0], 30, 106, width - 60)
    ctx.fillText(secondLine, 30, 130, width - 60)
  } else {
    ctx.fillText(lines[0], 30, 115, width - 60)
  }

  renderCanvasPNG(canvas, width, height)
}

function renderCanvasPNG (canvas, width, height) {
  const image2x = new Image()
  image2x.src = canvas.toDataURL('image/png')

  const hiddenCanvas = document.createElement('canvas')
  const ctxHiddenCanvas = hiddenCanvas.getContext('2d')
  hiddenCanvas.width = width
  hiddenCanvas.height = height
  ctxHiddenCanvas.drawImage(image2x, 0, 0, width, height)

  const resultImage = new Image()
  resultImage.src = hiddenCanvas.toDataURL('image/png')
  document.body.appendChild(resultImage)
}

/**
 * Rompe un texto dado en líneas dependiendo de los estilos de la fuente y el
 * ancho máximo
 * @param  {[type]} str      [description]
 * @param  {[type]} font     [description]
 * @param  {[type]} anchoMax [description]
 * @return {[type]}          [description]
 */
function romperEnLíneas (str, font, anchoMax) {
  const el = document.createElement('div')
  const style = el.style
  style.position = 'absolute'
  style.top = 0
  style.left = 0
  style.font = font
  document.body.appendChild(el)

  let index = 1
  let lastSpace = 0
  let start = 0
  let response = []

  while (index < str.length) {
    el.innerHTML = str.substring(start, index)
    if (el.offsetWidth > anchoMax) {
      if (str[index] === ' ') {
        response.push(str.substring(start, index))
        start = index + 1
      } else {
        response.push(str.substring(start, lastSpace))
        start = lastSpace + 1
      }
      index = start + 1
    }
    if (str[index] === ' ') {
      lastSpace = index
    }
    index++
  }
  response.push(str.substr(start))
  document.body.removeChild(el)
  return response
}

function crearTelón (fechaMoment, fechaMomentEST, version) {
  const canvas = document.createElement('canvas')
  const width = 1280
  const height = 720
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.className = 'telon'
  // si quieres renderizar el canvas:
  // document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  // Gradient
  const grd = ctx.createLinearGradient(0, 0, 0, height)
  grd.addColorStop(0, '#1e1032')
  grd.addColorStop(1, '#452873')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(255,255,255,0.9)'

  // Path Fondo
  ctx.save()
  ctx.scale(0.5, 0.5)
  ctx.translate(width - 166, height - 312)
  logoSVGPath
    .map(path => new Path2D(path))
    .map(path => ctx.fill(path))
  ctx.restore()

  // Version
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.textBaseline = 'top'
  ctx.textAlign = 'center'
  ctx.font = '22px "Open Sans"'
  ctx.fillText('v' + document.body.dataset.version, width / 2, 430, width)

  // Date
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.font = '300 20px "Open Sans"'
  const fechaFormateada = fechaMoment.format('MMM DD, Y')
  ctx.fillText(fechaFormateada[0].toUpperCase() + fechaFormateada.slice(1), width / 2, 580, width)

  // Time
  const cotFormat = fechaMoment.format('h:mmA')
  const estFormat = fechaMomentEST.format('h:mmA')
  if (cotFormat === estFormat) {
    ctx.fillText(cotFormat + ' COT/EST', width / 2, 605, width)
  } else {
    ctx.fillText(`${cotFormat} COT / ${estFormat} EST`, width / 2, 605, width)
  }

  renderCanvasPNG(canvas, width, height)
}

window.WebFont.load({
  google: {
    families: ['Open Sans:300,400,700']
  },
  active: function () {
    // Crear telón
    moment.locale('es')
    const fecha = moment.tz(document.body.dataset.fecha, 'America/Bogota')
    const fechaEST = moment.tz(document.body.dataset.fecha, 'America/New_York')
    const version = document.body.dataset.version
    crearTelón(fecha, fechaEST, version)

    // Crear una tarjeta para cada charlante
    const charlantes = JSON.parse(document.body.dataset.charlantes)
    charlantes.forEach(crearTarjetaDelCharlante)
  }
})
