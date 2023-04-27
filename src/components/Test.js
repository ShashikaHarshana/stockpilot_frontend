import React from 'react'

function Test () {
  const seen = new Set()
  let arr;
  const filteredArr = arr.filter(el => {
    const duplicate = seen.has(el.id)
    seen.add(el.id)
    return !duplicate
  })

  console.log(filteredArr)

  return <div></div>
}

export default Test
