import React from 'react'
import Lottie from 'react-lottie'
import * as cryptoLoading from '../../components/loading files/crypto.json'
import * as growthLoading from '../../components/loading files/growth.json'
import * as loaderLoading from '../../components/loading files/loader.json'

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
    <Lottie
      style={{ margin: 0, padding: 0 }}
      options={defaultOptions}
      height={300}
      width={300}
    />
  )
}

export default Loading1
