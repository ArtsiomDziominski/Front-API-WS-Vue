import {changeStringToNumber} from "@/hooks/change-string-to-number";

export default {
  sortOrders(newOrderItems, orderList, currentPrice) {
    currentPrice = Number(currentPrice);
    newOrderItems = changeStringToNumber(newOrderItems);

    const filteredItems = newOrderItems.filter((item) => !!item[1]);
    orderList.push(...filteredItems);

    orderList.sort((a, b) => a[0] - b[0])

    return this.searchDuplicates(orderList, currentPrice)
  },
  searchDuplicates(orderList, currentPrice) {
    const sort = [];
    let sortedOrderList = [];

    orderList.forEach(order => {
      if (!sort.includes(order[0])) {
        sortedOrderList.push(order);
        sort.push(order[0]);
      }else {
        const currentOrderIndex = sortedOrderList.findIndex(item =>order[0] === item[0]);
        sortedOrderList[currentOrderIndex][1] +=order[1];
      }
    })

    sortedOrderList.reverse();
    return  sortedOrderList.filter(order => order[0] !== currentPrice)
  }
}
