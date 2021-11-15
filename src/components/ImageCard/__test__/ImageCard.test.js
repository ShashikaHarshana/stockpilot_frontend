import { render, screen, fireEvent } from '../../../utils/testUtils'
import React from 'react'
import * as reactRedux from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/user-event'
import ImageCard from '../ImageCard'
import img1 from '../../../svgs/home/card1.svg'

describe('Image Card', () => {
  it('renders properly', () => {
    render(
      <ImageCard
        mobile={false}
        img={img1}
        width={492}
        height={324}
        mWidth={250}
        mHeight={164}
        marginTop={74}
        type={'Crypto'}
      />
    )
    const ImageCardElement = screen.getByText(/currency/i)
    expect(ImageCardElement).toBeInTheDocument()
  })
  it('Changes with input type stock', () => {
    render(
      <ImageCard
        mobile={false}
        img={img1}
        width={492}
        height={324}
        mWidth={250}
        mHeight={164}
        marginTop={74}
        type={'stock'}
      />
    )
    const ImageCardElement = screen.getByText(/Market/i)
    fireEvent.click(ImageCardElement)
    expect(ImageCardElement).toBeInTheDocument()
  })
})
