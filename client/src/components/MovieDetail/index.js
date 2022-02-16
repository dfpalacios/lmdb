import React, { useState } from 'react'
import styles from 'styles/movie.module.scss'
import PropTypes from 'prop-types'

import { Grid, Chip, Rating } from '@mui/material'
import { useUserStore } from 'context/UserProvider/hooks'
import { useModalStore } from 'context/ModalProvider/hooks'
import { SHOW_MODAL } from 'context/ModalProvider/constants'
import { postRateMovie } from 'services/movies'

const MovieDetail = ({ movie }) => {
  const date = new Date(movie?.info?.release_date).toLocaleDateString('en-UK')
  const [userRating, setUserRating] = useState(movie?.userRating)
  const [user] = useUserStore()
  const [, modalDispatch] = useModalStore()

  const showLogin = () => {
    modalDispatch({
      type: SHOW_MODAL,
      payload: 'login'
    })
  }

  const handleOnChange = (event, newValue) => {
    postRateMovie(movie.id, newValue)
    setUserRating(newValue * 2)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.info}>
          <p>Rank: {movie.info.rank}</p>
          <p>Year: {movie.year}</p>
          <p>Release date: {date} </p>
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
        {movie.info.image_url &&
          <img
            className={styles.cover}
            src={`${movie.info.image_url}`}
            title={movie.title}
            alt={`Cover for ${movie.title}`}
          />}
        {!movie.info.image_url &&
          <div className={styles.fakeCover}>
            <svg viewBox='0 0 2 3' />
            <span>N/A</span>
          </div>}
        {!movie.info.rating &&
          <p>No ranking available</p>}
        {movie.info.rating &&
          <>
            <Rating
              precision={0.5}
              name={`rating-${movie.id}`}
              value={movie.info.rating / 2}
              readOnly
            />
            ({movie.info.rating})
          </>}
        {!user.id &&
          <button onClick={showLogin}>Login to rate this movie</button>}
        {user.id &&
          <>
            <p>Your rating:</p>
            <Rating
              name={`rating-${movie.id}`}
              precision={0.5}
              value={userRating / 2}
              onChange={handleOnChange}
            />
          </>}
      </Grid>
    </Grid>
  )
}

MovieDetail.propTypes = {
  movie: PropTypes.object.isRequired
}

export default MovieDetail
