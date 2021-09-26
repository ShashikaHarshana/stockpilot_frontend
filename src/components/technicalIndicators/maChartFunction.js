let getMAChart = (type, lineSeries) => {
  const url = 'http://127.0.0.1:5000/ta/' + type + '/stock/aapl/5m'

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
    })
    .catch()
}

export default getMAChart
