import { updateInternalIndicatorData } from '../../redux/ducks/chart'
import { TA_BASE_URL } from '../../utils/CONSTANTS'

let getBBands = (
  bbandUpper,
  bbandMiddle,
  bbandLower,
  market,
  marketType,
  timeInterval,
  timeStamp,
  dispatch,
  lineData
) => {
  const url =
    TA_BASE_URL +
    'bbands' +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}/${timeStamp}000`

  fetch(url)
    .then(res => res.json())
    .then(data => {
        if (!data.hasOwnProperty('error')) {
            let tempUpper = []
            let tempMiddle = []
            let tempLower = []

            let dataUpper = data['upperband']
            let dataMiddle = data['middleband']
            let dataLower = data['lowerband']

            for (let key in dataUpper) {
                if (dataUpper.hasOwnProperty(key)) {
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
            }
            bbandUpper.setData(tempUpper)
            bbandMiddle.setData(tempMiddle)
            bbandLower.setData(tempLower)
            console.log('update chart data')
            dispatch(
                updateInternalIndicatorData({
                    type: 'bbands',
                    data: {
                        upper: [...tempUpper, ...lineData.upper],
                        middle: [...tempMiddle, ...lineData.middle],
                        lower: [...tempLower, ...lineData.lower]
                    }
                })
            )
        }
    })
    .catch()
}

export default getBBands
