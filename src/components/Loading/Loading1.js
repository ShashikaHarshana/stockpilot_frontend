import React from 'react'
import Lottie from 'react-lottie'
import * as cryptoLoading from '../../loading files/crypto.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: cryptoLoading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Loading1 = () => {
  return (
    <div style={{ border: '1px solid red' }}>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  )
}

export default Loading1
