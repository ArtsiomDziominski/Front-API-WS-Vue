export default {
  install(app){
    app.config.globalProperties.$setCurrentPrice = (currentPrice) => {
      app.config.globalProperties.$currentPrice = currentPrice;
    };
  }
}
