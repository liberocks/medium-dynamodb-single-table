require('dotenv').config()

const express = require('express')

const app = express()
app.use(express.json())

const c = require('./controller')

app.get('/actor', c.actor.list)
app.get('/actor/:actorId', c.actor.detail)
app.get('/actor/:actorId/movie', c.actor.movie)
app.post('/actor', c.actor.create)

app.get('/movie', c.movie.list)
app.get('/movie/:movieId', c.movie.detail)
app.post('/movie', c.movie.create)

app.use(require('./libs/errorHandler'))

app.listen(process.env.PORT, () => {
  console.log(`Ticketing API listening on port ${process.env.PORT}!`)
})
