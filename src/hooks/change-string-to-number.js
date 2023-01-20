
export function changeStringToNumber(stringList) {
  stringList.forEach(order => {
      order[0] = Number(order[0])
      order[1] = Number(order[1])
    })
    return stringList
  }
