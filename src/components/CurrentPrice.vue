<template>
  <p class="ma-5 text-center font-weight-bold">{{ currentPrice }} USDT</p>
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
      currentPrice: 'Загрузка...',
    }
  },
  created() {
    this.getCurrentPrice();
    setInterval(()=> this.currentPrice = this.$currentPrice,1000);
  },
  computed: {
    ...mapWritableState(useCoinStore, {
      currentSymbol: 'currentSymbol'
    }),
  },
  unmounted() {
    this.$connectionCurrentPrice.close();
  }
}
</script>

<style scoped>

</style>
