import webSocket from "@/mixin/web-socket";
import sortOrders from "@/mixin/sort-orders";
import {requestServerGet} from "@/hooks/request-server";

export default {
  methods: {
    getOrderBook() {
      requestServerGet(`/api/v3/depth?symbol=${this.currentSymbol}&limit=500`)
        .then(result => {
          const orderBook = result.data;
          this.orders.asks.orderList = orderBook.asks;
          this.orders.bids.orderList = orderBook.bids;
          this.orders.asks.orderList.forEach(order => order.push(order[0] * order[1]));
          this.orders.bids.orderList.forEach(order => order.push(order[0] * order[1]));
        })

      const connection = webSocket.connectionWS(`wss://stream.binance.com:9443/ws/${this.currentSymbol.toLowerCase()}@depth`);
      connection.onmessage = (event) => {
        const depthUpdate = JSON.parse(event.data);
        this.orders.asks.orderList = sortOrders.sortOrders(depthUpdate.a, this.orders.asks.orderList);
        this.orders.bids.orderList = sortOrders.sortOrders(depthUpdate.b, this.orders.bids.orderList);
        this.$setOrderBook(this.orders)
      }
      // return [connection, orders]
    }
  }
}
