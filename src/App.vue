<script setup>
import { onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet/dist/leaflet-src.js";
import "leaflet-draw/dist/leaflet.draw.css";
import "./lib/leaflet-tdt.js";
import "leaflet-draw";
import { generateRandomPoints } from "./Util/index.js";
import { addressPoints } from "./lib/data.js";
import { TDT_TOKEN, TDT_LAYERS } from "./const/index.js";

// const bounds = L.latLngBounds(L.latLng(-85, -175), L.latLng(85, 175));

const initDrawControl = (map) => {
  // 初始化绘制控件
  const drawnItems = new L.FeatureGroup(); // 存储绘制的图形
  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
    },
  });
  map.addControl(drawControl);

  // 监听绘制完成事件
  map.on("draw:created", (e) => {
    const layer = e.layer;
    drawnItems.addLayer(layer);

    // 获取多边形坐标和面积
    if (e.layerType === "polygon") {
      const coordinates = layer.getLatLngs()[0]; // 坐标数组 [[lat, lng], ...]
      const area = L.GeometryUtil.geodesicArea(coordinates); // 计算面积（平方米）

      // 可选：在地图上显示面积标签
      const areaLabel = L.divIcon({
        className: "polygon-area-label",
        html: `<div style="background: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${area.toFixed(
          2
        )}㎡</div>`,
        iconSize: [80, 24],
        iconAnchor: [40, 12], // 标签居中
      });
      L.marker(layer.getBounds().getCenter(), { icon: areaLabel }).addTo(map);
    }
  });
};

const initHeatMap = (map) => {
  let addressPoints1 = addressPoints.map(function (p) {
    return [p[0], p[1]];
  });
  // , {
  //   focusArea: { minLat: 18, maxLat: 54, minLng: 73, maxLng: 135 },
  // });
  L.heatLayer(addressPoints1).addTo(map);
};

const initLayers = (myMap) => {
  const gdLayer = L.tileLayer(
    "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
    {
      noWrap: true,
    }
  );
  gdLayer.addTo(myMap);
  const overlayLayers = {
    "高德电子底图": gdLayer,
  };

  TDT_LAYERS.forEach((element) => {
    const { layerSource, layerName } = element;
    overlayLayers[layerName] = L.tileLayer.tdtTileLayer(
      layerSource,
      TDT_TOKEN
    );
  });
  L.control.layers([], overlayLayers, { autoZIndex: false }).addTo(myMap);
};
onMounted(() => {
  const myMap = L.map("map", {
    preferCanvas: true,
    noWrap: true,
    // maxBounds: bounds,
    maxZoom: 18,
    minZoom: 3,
    maxBoundsViscosity: 1,
  }).setView([32, 113.505], 10);

  initLayers(myMap);

  initDrawControl(myMap);
  initHeatMap(myMap);
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
