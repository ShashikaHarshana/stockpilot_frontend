import { updateInternalIndicatorData } from '../../redux/ducks/chart'
import { TA_BASE_URL } from '../../utils/CONSTANTS'

let getMAChart = (
  type,
  lineSeries,
  market,
  marketType,
  timeInterval,
  timeStamp,
  dispatch,
  lineData
) => {
  const url =
    TA_BASE_URL +
    type +
    `/${marketType}/${
      marketType === 'crypto' ? market.toUpperCase() : market
    }/${timeInterval}/${timeStamp}000`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let tempLines = []
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          let object = {
            time: key / 1000,
            value: data[key]
          }
          tempLines.push(object)
        }
      }
      lineSeries.setData(tempLines)
      console.log(lineData)
      dispatch(
        updateInternalIndicatorData({ type, data: [...tempLines, ...lineData] })
      )
      console.log('ma line series')
    })
    .catch()
}

export default getMAChart
