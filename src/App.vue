<template>
  <v-app>

    <app-bar></app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script setup>
import AppBar from "@/layouts/default/AppBar.vue";
</script>
