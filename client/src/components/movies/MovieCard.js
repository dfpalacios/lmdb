import styles from 'styles/movie.module.scss'
import { Card, CardContent } from '@mui/material'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Stars from './Stars'

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <Card sx={{ maxWidth: 275 }}>
        <CardContent>
          <div className='movie-card' data-movie-id={movie.id}>
            <p className={styles.title}>{movie.title}</p>
            <img className={styles.cover} src={`/img/${movie.img}`} title={movie.title} alt={`Cover for ${movie.title}`} />
            <Stars movie={movie} disabled={true} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieCard
