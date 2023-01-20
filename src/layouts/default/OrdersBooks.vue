<template>
  <div class="orders">
    <order-book class="orders__book" :order-book="$orders.asks"></order-book>
    <current-symbol></current-symbol>
    <order-book class="orders__book" :order-book="$orders.bids"></order-book>
  </div>
</template>

<script>
import OrderBook from "@/components/OrderBook.vue";
import {mapWritableState} from "pinia";
import {useCoinStore} from "@/stores/current-coin";
import mixinOrderBook from "@/mixin/order-book";
import CurrentSymbol from "@/components/CurrentSymbol.vue";
import mixinCurrentPrice from "@/mixin/current-price";

export default {
  name: "OrdersBooks",
  components: {CurrentSymbol, OrderBook},
  mixins: [mixinOrderBook, mixinCurrentPrice],
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
    this.getCurrentPrice();
  },
  computed: {
    ...mapWritableState(useCoinStore, {
      currentSymbol: 'currentSymbol'
    }),
  },
  unmounted() {
    this.$connectionOrderBook.close();
    this.$connectionCurrentPrice.close();
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

@media only screen and (max-width: 600px) {
  .orders__book {
    width: 100%;
  }
}

</style>
