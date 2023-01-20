<template>
  <p class="ma-5 text-center font-weight-bold">{{ +currentPrice }} USDT</p>
</template>

<script>
import {mapWritableState} from "pinia";
import {useCoinStore} from "@/stores/current-coin";
import mixinCurrentPrice from "@/mixin/current-price";

export default {
  name: "CurrentPrice",
  mixins: [mixinCurrentPrice],
  data() {
    return {
      connection: null,
      currentPrice: this.$currentPrice
    }
  },
  created() {
    this.getCurrentPrice();
  },
  computed: {
    ...mapWritableState(useCoinStore, {
      currentSymbol: 'currentSymbol'
    }),
  },
  unmounted() {
    this.connection.close()
  }
}
</script>

<style scoped>

</style>
