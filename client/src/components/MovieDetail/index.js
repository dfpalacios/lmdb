import React, { useState, useEffect } from 'react'
import styles from './movie.module.scss'
import PropTypes from 'prop-types'

import { Grid, Chip, Rating } from '@mui/material'
import { useUserStore } from 'context/UserProvider/hooks'
import { useModalStore } from 'context/ModalProvider/hooks'
import { SHOW_MODAL } from 'context/ModalProvider/constants'
import { getMovie, postRateMovie } from 'services/movies'

const MovieDetail = ({ movieId }) => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorLoading, setErrorLoading] = useState(false)
  const [userRating, setUserRating] = useState(null)
  const [date, setDate] = useState(null)

  const [user] = useUserStore()
  const [, modalDispatch] = useModalStore()

  const loadMovie = () => {
    setLoading(true)
    setErrorLoading(false)
    getMovie(movieId).then((movie) => {
      setMovie(movie)
    }, () => {
      setErrorLoading(true)
    }).finally(() => {
      setLoading(false)
    })
  }

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

  useEffect(() => {
    setDate(new Date(movie?.info?.release_date).toLocaleDateString('en-UK'))
    setUserRating(movie?.userRating)
  }, [movie])

  useEffect(() => {
    loadMovie()
  }, [user, movieId])

  if (loading) {
    return (
      <Grid container className={styles.movie}>
        <Grid item xs={12}>
          <div>Loading...</div>
        </Grid>
      </Grid>
    )
  }

  if (errorLoading) {
    return (
      <Grid container className={styles.movie}>
        <Grid item xs={12}>
          <div>There was an error loading the movie.</div>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container className={styles.movie}>
      <Grid item xs={8} className={styles.leftColumn}>
        <h1 className={styles.title}>{movie.title}</h1>
        <div className={styles.info}>
          <p>Rank: <strong>{movie.info.rank}</strong> /
            Year: <strong>{movie.year}</strong> /
            Release date: <strong>{date}</strong>
          </p>
        </div>
        <h3>Genre/s</h3>
        <div className={styles.genres}>
          {movie.info.genres.map((genre) => (<Chip key={genre} label={genre} />))}
        </div>
        <h3>Director/s</h3>
        <div className={styles.directors}>
          {movie.info.directors.map((director) => (<Chip key={director} label={director} />))}
        </div>
        <h3>Actor/s</h3>
        <div className={styles.actors}>
          {movie.info.actors.map((actor) => (<Chip key={actor} label={actor} />))}
        </div>
        <div className={styles.plot}>
          <p>{movie.info.plot}</p>
        </div>
      </Grid>
      <Grid item xs={4} className={styles.rightColumn}>
        <div className={styles.coverWrapper}>
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
        </div>
        <div className={styles.rankingWrapper}>
          <div className={styles.totalRating}>
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
          </div>
          <div className={styles.userRating}>
            {!user.id &&
              <span
                className={styles.loginLink}
                onClick={showLogin}
              >Log in to rate this movie
              </span>}
            {user.id &&
              <>
                <p>Your rating:</p>
                <Rating
                  name={`rating-user-${movie.id}`}
                  precision={0.5}
                  value={userRating / 2}
                  onChange={handleOnChange}
                />
              </>}
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

MovieDetail.propTypes = {
  movieId: PropTypes.number.isRequired
}

export default MovieDetail
