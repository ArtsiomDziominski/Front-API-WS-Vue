export default {
  sortOrders(depthUpdate, orderList) {
    depthUpdate.forEach(order => {
      if (order[1] > 0) {
        order.push(order[0] * order[1])
        orderList.unshift(order)
      }
    })

    orderList.sort((a, b) => a[0] - b[0])

    if (orderList.length > 500) orderList.length = 500;

    orderList.forEach((order, index) => {
      if (order[0] === orderList[index]) {
        order[1] += orderList[index][1];
        order[2] += orderList[index][2];
      }
    })

    return orderList
  }
}
