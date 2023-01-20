import webSocket from "@/hooks/web-socket";
import sortOrders from "@/hooks/sort-orders";
import {requestServerGet} from "@/hooks/request-server";
import {changeStringToNumber} from "@/hooks/change-string-to-number";

export default {
  methods: {
    getOrderBook() {
      requestServerGet(`/api/v3/depth?symbol=${this.currentSymbol}&limit=500`)
        .then(result => {
          const orderBook = result.data;
          this.orders.asks.orderList = orderBook.asks;
          this.orders.bids.orderList = orderBook.bids;
          this.orders.asks.orderList = changeStringToNumber(this.orders.asks.orderList);
          this.orders.bids.orderList = changeStringToNumber(this.orders.bids.orderList);
          this.orders.asks.orderList = sortOrders.sortOrders([], this.orders.asks.orderList, this.$currentPrice);
          this.orders.bids.orderList = sortOrders.sortOrders([], this.orders.bids.orderList, this.$currentPrice);
        })

      this.connection = webSocket.connectionWS(`wss://stream.binance.com:9443/ws/${this.currentSymbol.toLowerCase()}@depth`);
      this.connection.onmessage = (event) => {
        const depthUpdate = JSON.parse(event.data);
        this.orders.asks.orderList = sortOrders.sortOrders(depthUpdate.a, this.orders.asks.orderList, this.$currentPrice);
        this.orders.asks.orderList = this.orders.asks.orderList.filter(order => order[0] > this.$currentPrice);


        this.orders.bids.orderList = sortOrders.sortOrders(depthUpdate.b, this.orders.bids.orderList, this.$currentPrice);
        this.orders.bids.orderList = this.orders.bids.orderList.filter(order => order[0] < this.$currentPrice);

        this.$setOrderBook(this.orders)
      }
    }
  }
}
