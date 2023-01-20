<template>
  <v-app-bar
    app
  >
    <v-container class="fill-height d-flex align-center">
      <v-btn @click="toMain">Main</v-btn>
      <v-btn @click="toSetting">Setting</v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import router from "@/router";

export default {
  methods: {
    toMain() {
      router.push({path:'/'})
    },
    toSetting() {
      router.push({path: '/setting'})
    }

  }
}
</script>
