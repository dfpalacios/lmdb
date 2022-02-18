import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import render from 'testing/functions'
import SearchForm from 'components/SearchForm'
import moviesData from 'testing/mocks/searchForm.json'
import axios from 'axios'

jest.mock('axios')

describe('The search form', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<SearchForm />)
  })

  it('is rendered', () => {
    const searchFormElement = screen.getByLabelText(/search a movie/i)
    expect(searchFormElement).toBeInTheDocument()
  })

  it('display "No movies found" when the user writes only one letter', () => {
    const searchFormElement = screen.getByLabelText(/search a movie/i)
    fireEvent.change(searchFormElement, { target: { value: 'a' } })
    screen.getByText('No movies found')
  })

  it('display links to movies when the user writes two or more letters', () => {
    const searchFormElement = screen.getByLabelText(/search a movie/i)
    fireEvent.change(searchFormElement, { target: { value: 'the' } })

    axios.post.mockImplementationOnce(() => Promise.reject(new Error('Endpoint error')))

    screen.getByText('No movies found')
  })

  it('display links to movies when the user writes two or more letters', () => {
    axios.post.mockImplementationOnce(() => {
      Promise.resolve(moviesData)
      screen.getByText('Test movie 1')
    })

    const searchFormElement = screen.getByLabelText(/search a movie/i)

    fireEvent.change(searchFormElement, { target: { value: 'test' } })
  })
})
