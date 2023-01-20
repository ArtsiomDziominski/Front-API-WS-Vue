import {requestServerGet} from "@/hooks/request-server";
import {changeStringToNumber} from "@/hooks/change-string-to-number";
import sortOrders from "@/hooks/sort-orders";
import webSocket from "@/hooks/web-socket";
import {reactive} from "vue";

export default {
  install(app){
    app.config.globalProperties.$orders = reactive({
      asks: {title: 'asks', orderList: []},
      bids: {title: 'bids', orderList: []}
    })
    app.config.globalProperties.$setOrderBook = (currentSymbol) => {

      requestServerGet(`/api/v3/depth?symbol=${currentSymbol}&limit=500`)
        .then(result => {
          const orderBook = result.data;
          const orderListAsks = changeStringToNumber(orderBook.asks);
          const orderListBids = changeStringToNumber(orderBook.bids);

          app.config.globalProperties.$orders.asks.orderList = sortOrders.sortOrders([], orderListAsks, this.$currentPrice)
          app.config.globalProperties.$orders.bids.orderList = sortOrders.sortOrders([], orderListBids, this.$currentPrice)
        })

      app.config.globalProperties.$connectionOrderBook = webSocket.connectionWS(`wss://stream.binance.com:9443/ws/${currentSymbol.toLowerCase()}@depth`);
      app.config.globalProperties.$connectionOrderBook.onmessage = (event) => {

        const newOrders = JSON.parse(event.data);
        const orderListAsks = sortOrders.sortOrders(newOrders.a, app.config.globalProperties.$orders.asks.orderList, app.config.globalProperties.$currentPrice);
        const orderListBids = sortOrders.sortOrders(newOrders.b, app.config.globalProperties.$orders.bids.orderList, app.config.globalProperties.$currentPrice);

        app.config.globalProperties.$orders.asks.orderList = orderListAsks;
        app.config.globalProperties.$orders.bids.orderList = orderListBids;
      }
    };
  }
}
