<template>
  <div class="orders">
    <order-book :order-book="this.orders.asks"></order-book>
    <order-book :order-book="this.orders.bids"></order-book>
  </div>
</template>

<script>
import OrderBook from "@/components/OrderBook.vue";
import {mapWritableState} from "pinia";
import {useCoinStore} from "@/stores/current-coin";
import mixinOrderBook from "@/mixin/order-book";

export default {
  name: "OrdersBooks",
  components: {OrderBook},
  mixins: [mixinOrderBook],
  data() {
    return {
      connection: null,
      orders: {
        bids: {title: 'Bids', orderList: []},
        asks: {title: 'Ask', orderList: []}
      }
    }
  },
  created() {
    this.getOrderBook();
  },
  computed: {
    ...mapWritableState(useCoinStore, {
      currentSymbol: 'currentSymbol'
    }),
  },
  unmounted() {
    this.connection.close();
  }
}
</script>

<style scoped>
.orders {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 20px;
}
</style>
