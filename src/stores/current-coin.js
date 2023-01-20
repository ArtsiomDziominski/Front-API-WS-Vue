import {defineStore} from 'pinia'
import {CURRENT_SYMBOL, CURRENT_SYMBOL_DEFAULT} from "@/const/const";

export const useCoinStore = defineStore('coinStore', {
  state: () => {
    return {currentSymbol: localStorage.getItem(CURRENT_SYMBOL) || CURRENT_SYMBOL_DEFAULT}
  },
  actions: {
    updateCoin(coin) {
      this.currentSymbol = coin;
    },
  },
})
