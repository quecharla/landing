import test from 'ava'
import request from 'supertest-as-promised'
import app from '../server'

test('Codigo de conducta', async t => {
  t.plan(3)
  const resUrl1 = await request(app)
    .get('/code-of-conduct')
    .send()

  t.is(resUrl1.status, 200)

  const resUrl2 = await request(app)
    .get('/codigo-de-conducta')
    .send()

  t.is(resUrl2.status, 200)

  const resUrl3 = await request(app)
    .get('/coc')
    .send()

  t.is(resUrl3.status, 200)
})

test('Inicio', async t => {
  t.plan(1)
  const res = await request(app)
    .get('/')
    .send()

  t.is(res.status, 200)
})

test('Propuesta', async t => {
  t.plan(1)
  const res = await request(app)
    .get('/propuesta')
    .send()

  t.is(res.status, 200)
})

test('Version válida', async t => {
  t.plan(1)
  const res = await request(app)
    .get('/1.0.0')
    .send()

  t.is(res.status, 200)
})

test('Version inválida', async t => {
  t.plan(1)
  const res = await request(app)
    .get('/9999.0')
    .send()

  t.is(res.status, 404)
})

test('Letsencrypt', async t => {
  t.plan(2)
  const LETSENCRYPT_VALUE = process.env.LETSENCRYPT_VALUE || 'paila'
  const res = await request(app)
    // we imagine llaveria is they key
    .get('/.well-known/acme-challenge/llaveria')
    .send()

  t.is(res.status, 200)
  t.is(res.text, `llaveria.${LETSENCRYPT_VALUE}`)
})
