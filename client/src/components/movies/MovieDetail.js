import styles from 'styles/movie.module.scss'
import PropTypes from 'prop-types'

import Stars from './Stars'
import { Grid } from '@mui/material';

const MovieDetail = ({ movie }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1 className={styles.title}>{movie.title}</h1>
      </Grid>
      <Grid item xs={10}>

      </Grid>
      <Grid item xs={2}>
        <img className={styles.cover} src={`/img/${movie.img}`} title={movie.title} alt={`Cover for ${movie.title}`} />
        <Stars movie={movie} />
      </Grid>
    </Grid>
  )
}

MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieDetail
