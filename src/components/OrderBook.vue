<template>
  <div class="display-1 order-book">
    <p class="order-book__title">{{ orderBook.title }}</p>

    <v-table class="table" height="38vh" fixed-header>
      <thead>
      <tr>
        <th class="text-left">
          Price(USDT)
        </th>
        <th class="text-left">
          Amount({{ currentSymbol }})
        </th>
        <th class="text-left order__total">
          Total
        </th>
      </tr>
      </thead>
      <tbody>
      <p class="table__loader" v-if="!orderBook.orderList.length">Загрузка...</p>
      <tr
        v-for="order in orderBook?.orderList"
      >
        <td>{{ order[0] }}</td>
        <td>{{ order[1] }}</td>
        <td class="order__total">{{ order[0] * order[1] }}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>

import {mapWritableState} from "pinia";
import {useCoinStore} from "@/stores/current-coin";

export default {
  name: "OrderBook",
  props: {
    orderBook: {
      orderList: Array,
      title: String,
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
.order-book {
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  margin: auto;
}

.order-book__title {
  text-align: center;
}

.table__loader {
  display: flex;
  justify-content: center;
}

td {
  font-size: 14px;
}

@media only screen and (max-width: 600px) {
  .table {
    width: 100%;
  }

  .order__total {
    display: none;
  }
}
</style>
