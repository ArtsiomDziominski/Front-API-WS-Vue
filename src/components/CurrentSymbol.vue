<template>
  <p class="ma-5 text-center font-weight-bold">{{ currentSymbol }}</p>
</template>

<script>
import {mapWritableState} from "pinia";
import {useCoinStore} from "@/stores/current-coin";

export default {
  name: "CurrentSymbol",
  data() {
    return {
      connection: null,
    }
  },
  computed: {
    ...mapWritableState(useCoinStore, {
      currentSymbol: 'currentSymbol'
    }),
  },
}
</script>

<style scoped>

</style>
