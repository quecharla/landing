const express = require('express')
const dateformat = require('dateformat')
const fs = require('fs')
const nunjucks = require('nunjucks')
const semverSort = require('semver-sort')
const utils = require('./lib/utils')
const letsencrypt = require('./lib/letsencrypt')

const POSTS_DIR = './posts'
const PORT = process.env.PORT || 8080
const CLOUDINARY_URL = '//res.cloudinary.com/charla/image/fetch/c_fill,w_250,h_250/'
const meses = 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre'.split(',')
const app = express()
const duraciónTransmisión = 3 * 60 * 60 * 1000 // 3 horas que dura la transmision

// Setting COT
process.env.TZ = 'America/Bogota'

let versions = fs.readdirSync(POSTS_DIR)
      .filter(file => /^[\d.]+\.json$/.test(file))
      .map(file => file.replace(/\.json$/, ''))

const ediciones = semverSort.desc(versions)
        .map(version => {
          const edicion = require(`${POSTS_DIR}/${version}.json`)
          const fecha = new Date(edicion.fecha)
          return Object.assign(
          {}, edicion, {
            fechaString: edicion.fecha,
            fecha: fecha,
            fechaFormat: dateformat(fecha, 'yyyy/mm/dd'),
            hora: dateformat(fecha, 'h:MMTT'),
            yaPaso: fecha < Date.now() - duraciónTransmisión,
            version: version,
            charlantes: edicion.charlantes.map(charlante => Object.assign({}, charlante, {
              avatar: `${CLOUDINARY_URL}${charlante.avatar}`
            }))
          })
        })

const nextEdition = ediciones[0]

nunjucks.configure('app/templates', {
  autoescape: true,
  express: app
})

/**
 * Genera una versión visible de la próxima edición
 * dependiendo de cuántos dias falten, ocultando así
 * los charlantes visibles.
 * @return {Object} proxima edición
 */
function obtenerProximaEdicion () {
  const charlantesLen = nextEdition.charlantes.length
  let distance = utils.weekDistance(new Date(), nextEdition.fecha)
  distance = Math.min(distance, charlantesLen)
  return Object.assign({}, nextEdition, {
    charlantes: nextEdition.charlantes
      .slice(0, charlantesLen - distance)
      .concat([null, null, null])
      .slice(0, 3)
  })
}

/**
 * Devuelve los datos por defecto para renderizar
 * cualquier página, en especial el footer:
 * - Próxima edición
 * - Ediciones anteriores
 * @return {Object} data base
 */
function agregarDataPorDefecto (extraData = {}) {
  return Object.assign({
    proximaEdicion: obtenerProximaEdicion(),
    previous: ediciones.slice(1),
    meses: meses
  }, extraData)
}

/**
 * Renderiza el código de conducta.
 * @param  {Object} req request
 * @param  {Object} res response
 */
function renderCoC (req, res) {
  res.render('coc.njk', agregarDataPorDefecto())
}

// Inicio
app.get('/', function (req, res) {
  res.render('index.njk', agregarDataPorDefecto())
})

// Banners para el streaming
app.get('/banners', function (req, res) {
  res.render('video-assets.njk', agregarDataPorDefecto())
})

// CoC
app.get('/code-of-conduct', renderCoC)
app.get('/codigo-de-conducta', renderCoC)
app.get('/coc', renderCoC)

// Propuestas de charla
app.get('/propuesta', function (req, res) {
  res.render('propuesta.njk')
})

// Let's encrypt challenge
app.get('/.well-known/acme-challenge/:key', letsencrypt)

// Ver una versión
app.get('/:version', function (req, res) {
  const edicion = ediciones.find(edicion => edicion.version === req.params.version)
  if (edicion) {
    res.render('version.njk', agregarDataPorDefecto({
      edicion: edicion
    }))
  } else {
    res.status(404).send('No existe 😱')
  }
})

app.use(express.static('public'))

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})

module.exports = app
