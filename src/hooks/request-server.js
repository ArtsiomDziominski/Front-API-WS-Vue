import axios from "axios";

export async function requestServerGet(bodyUrl) {
  return axios.get('https://api.binance.com' + bodyUrl)
}
