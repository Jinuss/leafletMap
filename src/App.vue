<script setup lang="ts">
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet-src.js";

const bounds = L.latLngBounds(L.latLng(-85, -175), L.latLng(85, 175));

onMounted(() => {
  const myMap = L.map("map", {
    preferCanvas: true,
    noWrap: true,
    maxBounds: bounds,
    maxZoom: 18,
    minZoom: 3,
    maxBoundsViscosity: 1, 
  }).setView([32, 113.505], 10);
  // L.tileLayer("https://tile6.ishowchina.com/v3/tile/{z}/{x}/{y}.png", {}).addTo(
  //   myMap
  // );
  L.tileLayer(
    "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
    {
      noWrap: true,
    }
  ).addTo(myMap);
  L.control.scale({ imperial: false }).addTo(myMap);
  L.circleMarker([32, 114.505], {
    radius: 15,
    color: "red",
    fillOpacity: 0.8,
  }).addTo(myMap);

  L.circle([32, 114.8], { radius: 8000 }).addTo(myMap);

  const marker = L.marker([32, 113.505], {
    draggable: true,
    autoPan: true,
  }).addTo(myMap);

  // marker.getElement().onclick = () => {
  //   console.log("marker clicked");
  // };

  marker.on("click", function () {
    console.log("marker clicked");
  });
  console.log(L, myMap, marker.getElement());

  var imageUrl =
      "https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg",
    imageBounds = [
      [40.712216, -74.22655],
      [40.773941, -74.12544],
    ];
  L.imageOverlay(imageUrl, imageBounds).addTo(myMap);

  // var videoUrl = "https://www.mapbox.com/bites/00188/patricia_nasa.webm",
  var videoUrl = "./patricia_nasa.webm",
    videoBounds = [
      [32, -130],
      [13, -100],
    ];
  L.videoOverlay(videoUrl, videoBounds).addTo(myMap);

  var svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElement.setAttribute("viewBox", "0 0 200 200");
  svgElement.innerHTML =
    '<rect x="75" y="23" width="50" height="50" style="fill:red"/><rect x="75" y="123" width="50" height="50" style="fill:#0013ff"/>';
  var svgElementBounds = [
    [32, 130],
    [13, 100],
  ];
  L.svgOverlay(svgElement, svgElementBounds).addTo(myMap);

  var latlngs = [
    [45.51, -122.68],
    [37.77, -122.43],
    [34.04, -118.2],
  ];

  let line = L.polyline(latlngs, { color: "red" }).addTo(myMap);

  console.log(myMap.getRenderer(line), line._renderer);
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
