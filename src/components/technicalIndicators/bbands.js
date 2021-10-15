let getBBands = (
  bbandUpper,
  bbandMiddle,
  bbandLower,
  market,
  marketType,
  timeInterval,
  setLoading
) => {
  const url =
    'http://127.0.0.1:5000/ta/bbands' +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let tempUpper = []
      let tempMiddle = []
      let tempLower = []

      let dataUpper = data['upperband']
      let dataMiddle = data['middleband']
      let dataLower = data['lowerband']

      for (let key in dataUpper) {
        if (dataUpper.hasOwnProperty(key)) {
          let object = {
            time: key / 1000,
            value: dataUpper[key]
          }
          tempUpper.push(object)
        }
        if (dataMiddle.hasOwnProperty(key)) {
          let object = {
            time: key / 1000,
            value: dataMiddle[key]
          }
          tempMiddle.push(object)
        }
        if (dataLower.hasOwnProperty(key)) {
          let object = {
            time: key / 1000,
            value: dataLower[key]
          }
          tempLower.push(object)
        }
      }
      bbandUpper.setData(tempUpper)
      bbandMiddle.setData(tempMiddle)
      bbandLower.setData(tempLower)
    })
    .catch()
}

export default getBBands
