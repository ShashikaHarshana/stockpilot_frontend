import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import Footer from '../Footer'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import 'regenerator-runtime/runtime'

global.window = { location: { pathname: null } }

describe('Footer', () => {
  it('renders the slogan', async () => {
    render(<Footer />)
    const divElement = screen.getByText(
      /The website for all Your Crypto and Stock Analysis needs/i
    )
    expect(divElement).toBeInTheDocument()
  })

  it('renders links', async () => {
    render(<Footer />)
    const divElement = await screen.findByText(/Helpful Links/i)
    expect(divElement).toBeInTheDocument()
  })

  it('renders footer without crashing', async () => {
    render(<Footer />)
    const divElement = screen.getByTestId('header')
    expect(divElement).toBeTruthy()
  })
  it('navigate to Home', () => {
    render(<Footer />)
    const buttonElement = screen.getByTestId('home')
    fireEvent.click(buttonElement)
    expect(global.window.location.pathname).toEqual('/')
  })
  it('navigate to Stock page', () => {
    render(<Footer />)
    const buttonElement = screen.getByTestId('stock')
    fireEvent.click(buttonElement)
    expect(global.window.location.pathname).toEqual('/analyze/stock')
  })
  it('navigate to Crypto page', () => {
    render(<Footer />)
    const buttonElement = screen.getByTestId('crypto')
    fireEvent.click(buttonElement)
    expect(global.window.location.pathname).toEqual('/analyze/crypto')
  })
})
