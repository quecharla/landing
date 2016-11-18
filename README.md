<img alt="Char.la" src="public/images/favicon/android-chrome-192x192.png" width="80" />
# Char.la

Char.la es un Meetup virtual de conocimiento técnico avanzado en español. Una vez al mes tendremos tres charlas técnicas sobre software en español.

## Env

Te recomendamos instalar nodemon si vas a trabajar en modo desarrollo:

```
npm i -g nodemon
```

## Setup

Instala las dependencias con NPM:

```
npm i
```

## Server

### Development Watch

Para observar cambios en archivos (frontend y backend) corre:

```
gulp
```

### Desarrollo con Watch Server

Si solo deseas correr el servidor en watch y no el frontend:

```
npm run server:watch
```

### Producción

Si solo deseas correr el servidor:

```
npm run server
```

Si deseas generar el css y js:

```
gulp distribution
```


## Datos de Ediciones

La información del sitio se mantiene en la carpeta [posts](posts), 
donde encontrarás el [_sample.json](_sample.json) el cual puedes duplicar 
para los próximos eventos, las propiedades son las siguientes:

| Prop         | Tipo            | Descripción  |
| ------------ | --------------- | ------------ |
| charlantes   | Array           | Arreglo de los charlantes de la edición |
| fecha        | ISO Date String | La fecha está en formato ISO Date, por comodidad se usa con GMT-5: `2016-11-15T20:00:00-05:00` para poder poner la hora local, si queda menos de un día se pone `Dentro de Poco` |
| preguntasUrl | String URL      | **OPCIONAL** Url al archivo con las preguntas y respuestas de la charla |
| streamingUrl | String URL      | **OPCIONAL** URL del streaming, si hay URL de streaming y han pasado menos 3 horas desde la `fecha` en el sitio se pone `Transmisión en Vivo` |
| videoUrl     | String URL      | **OPCIONAL** URL del video en Youtube |

### Charlante

| Prop            | Tipo       | Descripción     |
| --------------- | ---------- | --------------- |
| nombre          | String     |                 |
| twitter         | String     | Solo el usuario |
| titulo          | String     |                 |
| subtitulo       | String     | **OPCIONAL**    |
| avatar          | String URL | Pasa por cloudinary, lo recomendable es pasar una imagen cuadrada y grande |
| videoUrl        | String URL | **OPCIONAL** URL del video en Youtube de la charla del speaker |
| presentacionUrl | String URL | **OPCIONAL** URL a la presentación


## Comportamiento y características

Hay diferentes aspectos del servidor y del cliente a tener en cuenta:

**Servidor**

- El servidor consulta todos las versiones en la carpeta de `posts` y genera un arreglo de ediciones a partir de ellos.
- El servidor se configura en hora colombiana para facilitar la presentación de fechas en los templates.
- Los templates del server se encuentran en [app/templates](app/templates)
- El footer necesita una `proximaEdicion` por la cual existe el método `agregarDataPorDefecto` a la cual le puedes pasar un objeto para extender (o sobrescribir)

**Cliente**

- Al cargar el sitio busca todos los `.to-timezone` y les agrega la hora en el huso horario del cliente (si es diferente a COT) usando el attr `data-time` con un ISO Date String.

<img alt="antes" src="https://cldup.com/Ehj_QD7LIi.png" width="540" />

<img alt="antes" src="https://cldup.com/DMESEBJ0XT.png" width="540" />

- Si queda menos de 24 horas para el evento y se pone un contador regresivo y si no hay `streamingUrl` dirá `Dentro de Poco`

<img alt="preview" src="https://cldup.com/AeQRs_BYTt.png" width="200" />

- Si han pasado menos de 3 horas desde el inicio del evento y hay `streamingUrl` dirá `Transmisión en Vivo`

<img alt="preview" src="https://cldup.com/YW3blg7nyz.png" width="200" />

- Si aún no ha iniciado el evento pero faltan menos de 24 horas y hay `streamingUrl` dirá `Transmisión en Vivo` y pondrá el contador regresivo

<img alt="preview" src="https://cldup.com/yqLS_Ovq2o.png" width="200" />


## TODO

-[ ] Soportar `preguntasUrl` en la página de la versión
-[ ] Soportar `videoUrl` en la página de la versión
-[ ] Soportar `videoUrl` en el speaker
-[ ] Soportar `presentacionUrl` en el speaker


## Licencia

MIT
