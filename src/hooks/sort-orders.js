export default {
  sortOrders(depthUpdate, orderList, currentPrice) {
    currentPrice = Number(currentPrice)

    depthUpdate.forEach(order => {
      order[0] = Number(order[0]);
      order[1] = Number(order[1]);
      if (order[1] > 0) orderList.push(order);
    })

    orderList.sort((a, b) => {
      if (a[0] > b[0]) {
        return 1;
      }
      if (a[0] < b[0]) {
        return -1;
      }
      return 0;
    })

    const sort = [];
    const sortList = [];
    let sortedOrderList = [];

    orderList.forEach(order => {
      if (!sort.includes(order[0])) {
        sortedOrderList.push(order)
        sort.push(order[0])
        sortList.push(order)
      }
    })

    sortedOrderList.forEach(order => {
      for (let i = 0; i < sortList.length; i++) {
        if (order[0] === sortList[i][0]) {
          order[1] += sortList[i][1]
        }
      }
    })

    sortedOrderList = sortedOrderList.filter(order => order[0] !== currentPrice)

    sortedOrderList.reverse();
    return sortedOrderList
  }
}
