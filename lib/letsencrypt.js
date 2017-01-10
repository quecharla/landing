// we use an env var so we don't have to hard code this every time we update the cert
const debug = require('debug')('charla:letsencrypt')
let { LETSENCRYPT_VALUE } = process.env

LETSENCRYPT_VALUE = LETSENCRYPT_VALUE || 'paila'

module.exports = function letsencrypt (req, res) {
  const key = req.params.key
  debug('acme-challenge key', key)
  const response = `${key}.${LETSENCRYPT_VALUE}`
  res.send(response)
}
