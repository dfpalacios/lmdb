import React from 'react'
import { screen } from '@testing-library/react'
import render from 'testing/functions'
import MoviesList from 'components/MoviesList'
import moviesData from 'testing/mocks/movies.json'
import axios from 'axios'

jest.mock('axios')

describe('The movies list', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  it('shows an error if the load fails', async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error('Load error')))
    render(<MoviesList />)
    const errorText = await screen.findByText(/there was an error loading the movies./i)
    expect(errorText).toBeInTheDocument()
  })

  it('shows movies', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: moviesData }))
    render(<MoviesList />)
    const titleMovieText = await screen.findByText(/title movie/i)
    expect(titleMovieText).toBeInTheDocument()
  })
})
