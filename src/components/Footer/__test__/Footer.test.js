import { render, screen } from '../../../utils/testUtils'
import Footer from '../Footer'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

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
})
