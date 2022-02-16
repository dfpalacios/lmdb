import React from 'react'
import { Rating } from '@mui/material'
import PropTypes from 'prop-types'

import styles from 'styles/stars.module.scss'

import { useUserStore } from 'context/user/hooks'
import { useModalStore } from 'context/modal/hooks'
import { SHOW_MODAL } from 'context/modal/constants'
import { postRateMovie } from 'services/movies'

const Stars = ({ movie, disabled }) => {
  const [user] = useUserStore()
  const [, modalDispatch] = useModalStore()

  if (user.id) {
    return (
      <Rating
        name={`rating-${movie.id}`}
        value={movie.info.rating / 2}
        onChange={(event, newValue) => {
          postRateMovie(movie.id, newValue)
        }}
      />
    )
  }

  return (
    <span
      className={styles['c-stars__wrapper']}
      onClick={() => {
        if (disabled) return;
        modalDispatch({
          type: SHOW_MODAL,
          payload: 'login'
        })
      }}
    >
      <Rating
        name={`rating-${movie.id}`}
        value={movie.info.rating / 2}
        readOnly
      />
    </span>
  )
}

Stars.propTypes = {
  movie: PropTypes.object.isRequired,
  disabled: PropTypes.bool
}

export default Stars
