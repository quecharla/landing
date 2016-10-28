const express    = require('express')
const fs         = require('fs')
const nunjucks   = require('nunjucks')
const path       = require('path')
const semverSort = require('semver-sort')
const utils      = require('./lib/utils')

const POSTS_DIR      = './posts'
const PORT           = process.env.PORT || 3000
const CLOUDINARY_URL = '//res.cloudinary.com/charla/image/fetch/c_fill,w_250,h_250/'
const meses          = 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre'.split(',')
const app            = express()

let versions = fs.readdirSync(POSTS_DIR)
      .filter(file => /^[\d\.]+\.json$/.test(file))
      .map(file => file.replace(/\.json$/, ''))

const ediciones = semverSort.desc(versions)
        .map(version => {
          const edicion = require(`${POSTS_DIR}/${version}.json`)
          return Object.assign(
          {}, edicion, {
            fecha     : new Date(edicion.fecha + 'T05:00'), // GMT-5
            version   : version,
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

app.get('/', function(req, res) {
  const charlantesLen = nextEdition.charlantes.length
  let distance = utils.weekDistance(new Date(), nextEdition.fecha)
  distance = Math.min(distance, charlantesLen)
  console.log(distance, charlantesLen)
  const disclosuredEdition = Object.assign({}, nextEdition, {
    charlantes: nextEdition.charlantes
      .slice(0, charlantesLen - distance)
      .concat([null, null, null])
      .slice(0,3)
  })
  res.render('index.njk', {
    edicion: disclosuredEdition,
    previous: ediciones.slice(1),
    meses: meses
  })
})

app.get('/code-of-conduct', function(req, res) {
  res.render('coc.njk')
})

app.get('/codigo-de-conducta', function(req, res) {
  res.render('coc.njk')
})

app.get('/:version', function(req, res) {
  const edicion = ediciones.find(edicion => edicion.version === req.params.version)
  if (edicion) {
    res.render('version.njk', {
      edicion: edicion,
      meses: meses
    })
  } else {
    res.status(404).send('Not found')
  }
})

app.use(express.static('public'))

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})
