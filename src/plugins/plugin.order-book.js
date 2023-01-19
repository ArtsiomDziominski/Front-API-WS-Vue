export default {
  install(app){
    app.config.globalProperties.$setOrderBook = (orders) => {
      app.config.globalProperties.$orders = orders;
    };
  }
}
