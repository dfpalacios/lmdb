
const fs = require('fs')
const path = require('path')

const getUser = (condition) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/../mockData/users.json'), 'utf8'))

  return users.find(condition)
}

const getMovies = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '/../mockData/movies.json'), 'utf8'))
}

const getMovie = (condition) => {
  const movies = JSON.parse(fs.readFileSync(path.join(__dirname, '/../mockData/movies.json'), 'utf8'))

  return movies.find(condition)
}

module.exports = { getUser, getMovies, getMovie }
