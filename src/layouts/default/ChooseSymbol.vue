<template>
  <v-select
    class="select"
    label="Select"
    :items="symbols.slice(0,15)"
    v-model="symbolSelected"
  ></v-select>
</template>

<script>
import {useCoinStore} from "@/stores/current-coin";
import {requestServerGet} from "@/hooks/request-server";
import {CURRENT_SYMBOL, EXCHANGE_INFO, SORT_SYMBOL} from "@/const/const";

export default {
  name: "ChooseSymbol",
  data() {
    return {
      symbols: ['Загрузка...'],
      symbolSelected: '',
      coinStore: useCoinStore()
    }
  },
  created() {
    requestServerGet(EXCHANGE_INFO)
      .then(orderAll => {
        const orderList = orderAll.data.symbols
        const symbolLength = SORT_SYMBOL.length;
        this.symbols = orderList.filter((order) => order.symbol.slice(order.symbol.length - symbolLength) === SORT_SYMBOL).map(order => order.symbol);
      })
  },
  watch: {
    symbolSelected() {
      this.coinStore.updateCoin(this.symbolSelected);
      localStorage.setItem(CURRENT_SYMBOL, this.symbolSelected);
    }
  },
}
</script>

<style scoped>
.select {
  margin: 60px;
}

</style>
