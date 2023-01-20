import webSocket from "@/hooks/web-socket";
import {requestServerGet} from "@/hooks/request-server";

export default {
  methods: {
    getCurrentPrice() {
      requestServerGet(`/api/v3/ticker/price?symbol=${this.currentSymbol}`)
        .then(result => {
          const currentPrice = result.data.price;
          this.$setCurrentPrice(currentPrice);
        })
      this.connection = webSocket.connectionWS(`wss://stream.binance.com:9443/ws/${this.currentSymbol.toLowerCase()}@ticker`);
      this.connection.onmessage = (event) => {
        const statisticsStreams = JSON.parse(event.data);
        this.currentPrice = statisticsStreams.c;
        this.$setCurrentPrice(this.currentPrice);
      }
    }
  }
}
