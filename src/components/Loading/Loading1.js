import React from 'react'
import Lottie from 'react-lottie'
import * as cryptoLoading from '../../loading files/crypto.json'
import * as growthLoading from '../../loading files/growth.json'
import * as loaderLoading from '../../loading files/loader.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: growthLoading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Loading1 = () => {
  return (
    <div style={{ border: '1px solid red' }}>
      <Lottie
        style={{ border: '1px solid red', margin: 0, padding: 0 }}
        options={defaultOptions}
        height={300}
        width={300}
      />
    </div>
  )
}

export default Loading1
