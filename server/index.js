require('dotenv').config()

const express = require('express')
const bcrypt = require('bcryptjs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { verifyToken, checkUser } = require('./middleware/auth')
const bd = require('./middleware/bd')
const randtoken = require('rand-token')
const cors = require('cors')

const PORT = process.env.PORT || 3001
const app = express()
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

const refreshTokens = {}

const createToken = (user) => jwt.sign(
  {
    id: user.id
  },
  process.env.TOKEN_KEY,
  {
    expiresIn: '15m'
  }
)

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

app.get('/api/movies', async (req, res) => {
  await sleep(500)
  try {
    const movies = bd.getMovies(req.query)
    if (!movies) {
      res.json([])
      return
    }

    res.json(movies)
  } catch (err) {
    res.status(500).send({ status: err.status, message: err.message })
  }
})

app.get('/api/movies/:movieId', checkUser, async (req, res) => {
  await sleep(500)
  try {
    const { movieId } = req.params

    if (!movieId || Number.isNaN(parseInt(movieId))) {
      res.sendStatus(400)
      return
    }

    const movie = bd.getMovie((movie) => (Number(movie?.info?.rank) === Number(movieId)))

    if (!movie) {
      res.status(404).send({ status: 404, message: 'Movie not found' })
      return
    }

    if (req.user) {
      const rating = movie?.info?.rating ?? 0
      movie.userRating = (parseInt(movieId, 10) % 2 === 0)
        ? rating / 2
        : 0
    }

    res.json(movie)
  } catch (err) {
    res.status(500).send({ status: err.status, message: err.message })
  }
})

app.post('/api/movies/:movieId/stars', verifyToken, async (req, res) => {
  await sleep(500)
  res.sendStatus(200)
})

app.post('/api/register', async (req, res) => {
  await sleep(500)
  if (req.body.email === 'error@mail.com') {
    res.sendStatus(400)
    return
  }
  res.sendStatus(200)
})

app.post('/api/token/reject', function (req, res) {
  const { refreshToken } = req.body
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken]
  }
  res.sendStatus(204)
})

app.post('/api/token/refresh', function (req, res) {
  try {
    const { id, refreshToken } = req.body

    if (!(refreshToken in refreshTokens) || (Number(refreshTokens[refreshToken]) !== Number(id))) {
      res.sendStatus(401)
      return
    }

    res.json({ token: createToken({ id }) })
  } catch (err) {
    res.status(500).send({ status: err.status, message: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  await sleep(500)
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send({ status: 400, message: 'Email && password required' })
      return
    }

    const user = bd.getUser((user) => (user.email === email))

    if (!user) {
      res.sendStatus(401)
      return
    }

    bcrypt.compare(String(password), String(user.password), (err, data) => {
      if (err) {
        res.status(400).send({ status: err.status, message: err.message })
      }

      const refreshToken = randtoken.uid(256)
      refreshTokens[refreshToken] = user.id

      res.send({
        id: user.id,
        name: user.name,
        token: createToken(user),
        refreshToken
      })
    })
  } catch (err) {
    res.status(500).send({ status: err.status, message: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
