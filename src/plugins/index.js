/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import {createPinia} from "pinia";
import pluginOrderBook from "@/plugins/plugin.order-book";

export function registerPlugins(app) {
  const pinia = createPinia()

  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(pluginOrderBook)

}
