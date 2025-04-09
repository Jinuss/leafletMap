<script setup lang="ts">
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet-src.js";

onMounted(() => {
  const myMap = L.map("map").setView([32, 113.505], 10);
  L.tileLayer("https://tile6.ishowchina.com/v3/tile/{z}/{x}/{y}.png", {
    // attribution:
    //   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);
  L.control.scale({imperial:false}).addTo(myMap);
  console.log(L, myMap);
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
</style>
