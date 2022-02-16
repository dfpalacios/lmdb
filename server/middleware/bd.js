const fs = require('fs')
const path = require('path')

const getUser = (condition) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '/../mockData/users.json'), 'utf8'))

  return users.find(condition)
}

const getMovies = (params) => {
  const movies = JSON.parse(fs.readFileSync(path.join(__dirname, '/../mockData/movies.json'), 'utf8'))
  const offset = parseInt(params.offset, 10) || 20
  const page = parseInt(params.page, 10) || 0
  const search = params.search?.toLowerCase() || ''
  const field = params.field || 'rank'
  const sort = params.sort || 'asc'
  const genres = params.genres || []

  const moviesSearch = (search !== ''
    ? movies.filter((movie) => movie.title.toLowerCase().startsWith(search))
    : movies)
    .filter((movie) => movie?.info?.rank !== undefined)

  const moviesFiltered =
    (genres.length > 0 ?
      moviesSearch.filter((movie) => (movie?.info?.genres?.some((genre) => genres.includes(genre))))
      : moviesSearch
    ).sort((a, b) => {
      switch (field) {
        default:
          let rankA = a.info.rank ? parseInt(a.info.rank, 10) : -1
          let rankB = b.info.rank ? parseInt(b.info.rank, 10) : -1
          return sort === 'asc' ? rankA - rankB : rankB - rankA
        case 'title':
          return (sort === 'asc')
            ? a.title.toLowerCase().localeCompare(b.title.toLowerCase())
            : b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        case 'rating':
          const ratingA = a.info.rating ? parseFloat(a.info.rating) : -1
          const ratingB = b.info.rating ? parseFloat(b.info.rating) : -1
          return (sort === 'desc') ? ratingA - ratingB : ratingB - ratingA
      }
    })

  const moviesPage = moviesFiltered
    .slice(page * offset, (page * offset) + offset)
    .map((movie) => {
      movie.id = movie.info.rank
      return movie
    })

  return {
    total: moviesFiltered.length,
    result: moviesPage
  }
}

const getMovie = (condition) => {
  const movies = JSON.parse(fs.readFileSync(path.join(__dirname, '/../mockData/movies.json'), 'utf8'))

  const movie = movies.find(condition)

  movie.id = movie.info.rank

  return movie
}

module.exports = { getUser, getMovies, getMovie }
