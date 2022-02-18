import React from 'react'
import { screen } from '@testing-library/react'
import render from 'testing/functions'
import MovieDetail from 'components/MovieDetail'
import movieData from 'testing/mocks/movie.json'
import axios from 'axios'

jest.mock('axios')

describe('The movie detail', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  it('shows the loader', async () => {
    render(<MovieDetail />)
    const movieLoader = await screen.findByText(/loading/i)
    expect(movieLoader).toBeInTheDocument()
  })

  it('shows an error if the load fails', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('Load error')))
    render(<MovieDetail movieId={1} />)
    const errorText = await screen.findByText(/there was an error loading the movie./i)
    expect(errorText).toBeInTheDocument()
  })

  it('shows the movie', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: movieData }))
    render(<MovieDetail movieId={1} />)
    const titleMovieText = await screen.findByText(/Title movie/i)
    expect(titleMovieText).toBeInTheDocument()
  })

  it('shows the "log in to rate this movie" button if the user is not logged', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: movieData }))
    render(<MovieDetail movieId={1} />)
    const userRatingLink = await screen.findByText(/Log in to rate this movie/i)
    expect(userRatingLink).toBeInTheDocument()
  })

  it('shows the stars component if the user is logged', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: movieData }))
    render(<MovieDetail movieId={1} />, { userContext: { id: 1, name: 'testname', token: '12356890' } })
    const movieLoader = await screen.findByText(/Title movie/i)
    expect(movieLoader).toBeInTheDocument()
    const rating = screen.getByRole('radio', {
      name: '1.5 Stars'
    })
    expect(rating).toBeInTheDocument()
  })
})
