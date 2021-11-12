import { render, screen } from '@testing-library/react'
import Footer from '../Footer'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

const MockFooter = () => {
  return (
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  )
}

describe('Footer', () => {
  it('renders the slogan', async () => {
    render(<MockFooter />)
    const divElement = screen.getByText(
      /The website for all Your Crypto and Stock Analysis needs/i
    )
    expect(divElement).toBeInTheDocument()
  })

  it('renders links', async () => {
    render(<MockFooter />)
    const divElement = await screen.findByText(/Helpful Links/i)
    expect(divElement).toBeInTheDocument()
  })

  it('renders footer without crashing', async () => {
    render(<MockFooter />)
    const divElement = screen.getByTestId('header')
    expect(divElement).toBeTruthy()
  })

  it('renders and passed snapshot', async () => {
    const tree = renderer.create(<MockFooter />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
