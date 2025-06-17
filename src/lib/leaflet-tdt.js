L.TileLayer.TdtTileLayer = L.TileLayer.extend({ // 拓展天地图瓦片图层
    initialize: function (type, key, options) {
        var templateUrl = "//t{s}.tianditu.gov.cn/DataServer?T={t}&x={x}&y={y}&l={z}&tk={k}"
        // var templateUrl = "//t{s}.tianditu.gov.cn/{t}/wmts?service=WMTS&request=GetTile&version=1.0.0&layer={l}&style=default&tilematrixset=w&format=tiles&tilematrix={z}&tilecol={x}&tilerow={y}&tk={k}"
        options = L.extend({ t: type, l: type.substr(0, 3), k: key, subdomains: "01234567", minZoom: 0, maxZoom: 23, minNativeZoom: type === "ibo_w" ? 3 : 1, maxNativeZoom: type === "ibo_w" ? 10 : 18 }, options)
        L.TileLayer.prototype.initialize.call(this, templateUrl, options)
    }
})
L.tileLayer.tdtTileLayer = function (type, key, options) { return new L.TileLayer.TdtTileLayer(type, key, options) }
