<script setup lang="ts">
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

onMounted(() => {
  const myMap = L.map("map").setView([113.505, 32], 10);
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(myMap);
});
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
