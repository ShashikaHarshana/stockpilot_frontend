export const removeDuplicates = arr => {
  const seen = new Set()
  const filteredArr = arr.filter(el => {
    const duplicate = seen.has(el.time)
    seen.add(el.time)
    return !duplicate
  })
  return filteredArr
}
