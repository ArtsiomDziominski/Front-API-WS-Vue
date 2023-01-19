import { defineStore } from 'pinia'

export const useCoinStore = defineStore('coinStore', {
  state: () => {
    return { currentSymbol: 'BTCUSDT' }
  },
  actions: {
    updateCoin(coin) {
      this.currentSymbol = coin;
    },
  },
})
