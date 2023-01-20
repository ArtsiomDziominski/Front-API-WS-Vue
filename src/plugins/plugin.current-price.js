import {requestServerGet} from "@/hooks/request-server";
import webSocket from "@/hooks/web-socket";

export default {
  install(app){
    app.config.globalProperties.$setCurrentPrice = (currentSymbol) => {
      requestServerGet(`/api/v3/ticker/price?symbol=${currentSymbol}`)
        .then(result => {
          app.config.globalProperties.$currentPrice = result.data.price;
        })
      app.config.globalProperties.$connectionCurrentPrice = webSocket.connectionWS(`wss://stream.binance.com:9443/ws/${currentSymbol.toLowerCase()}@ticker`);
      app.config.globalProperties.$connectionCurrentPrice.onmessage = (event) => {
        const statisticsStreams = JSON.parse(event.data);
        app.config.globalProperties.$currentPrice = statisticsStreams.c;
      }
    };
  }
}
