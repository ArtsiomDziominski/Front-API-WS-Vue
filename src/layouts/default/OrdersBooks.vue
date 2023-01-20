<template>
  <div class="orders" @click="click">
    <order-book class="orders__book" :order-book="orders.asks"></order-book>
    <current-price></current-price>
    <order-book class="orders__book" :order-book="orders.bids"></order-book>
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
    setInterval(()=> {
      this.orders.bids.orderList = this.$orders.bids.orderList;
      this.orders.asks.orderList = this.$orders.asks.orderList;
    },3000)
  },
  computed: {
    ...mapWritableState(useCoinStore, {
      currentSymbol: 'currentSymbol'
    }),
  },
  methods: {
    click() {
      console.log(this.$orders)
      this.orders = this.$orders;
    }
  },
  unmounted() {
    this.$connectionOrderBook.close();
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
