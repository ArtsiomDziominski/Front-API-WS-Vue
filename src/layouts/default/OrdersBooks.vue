<template>
  <div class="orders">
    <order-book class="orders__book" :order-book="this.orders.asks"></order-book>
    <current-price></current-price>
    <order-book class="orders__book" :order-book="this.orders.bids"></order-book>
  </div>
</template>

<script>
import OrderBook from "@/components/OrderBook.vue";
import {mapWritableState} from "pinia";
import {useCoinStore} from "@/stores/current-coin";
import mixinOrderBook from "@/mixin/order-book";
import CurrentPrice from "@/components/CurrentPrice.vue";

export default {
  name: "OrdersBooks",
  components: {CurrentPrice, OrderBook},
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
  padding: 20px;
}

.orders__book {
  width: 600px;
}

</style>
