import styles from 'styles/movie.module.scss'
import PropTypes from 'prop-types'

import Stars from './Stars'
import { Grid, Chip } from '@mui/material';

const MovieDetail = ({ movie }) => {

  const date = new Date(movie.info.release_date)

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.info}>
          <p>Rank: {movie.info.rank}</p>
          <p>Year: {movie.year}</p>
          <p>Release date: {date.toLocaleDateString("en-UK")} </p>
        </div>
        <div className={styles.genres}>
          {movie.info.genres.map((genre) => (<Chip key={genre} label={genre} />))}
        </div>
        <div className={styles.directors}>
          {movie.info.directors.map((director) => (<Chip key={director} label={director} />))}
        </div>
        <div className={styles.actors}>
          {movie.info.actors.map((actor) => (<Chip key={actor} label={actor} />))}
        </div>
        <div className={styles.plot}>
          <p>{movie.info.plot}</p>
        </div>
      </Grid>
      <Grid item xs={2}>
        <img className={styles.cover} src={`${movie.info.image_url}`} title={movie.title} alt={`Cover for ${movie.title}`} />
        <Stars movie={movie} />
      </Grid>
    </Grid>
  )
}

MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieDetail
