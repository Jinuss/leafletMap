// 生成指定数量的随机坐标点（默认全球范围）
export function generateRandomPoints(count, options = {}) {
  let { 
    minLat = -90, maxLat = 90,    // 纬度范围
    minLng = -180, maxLng = 180,  // 经度范围
    focusArea = null              // 可选：指定聚焦区域（如中国）{minLat, maxLat, minLng, maxLng}
  } = options;

  // 若指定聚焦区域，覆盖默认范围
  if (focusArea) {
    minLat = focusArea.minLat || minLat;
    maxLat = focusArea.maxLat || maxLat;
    minLng = focusArea.minLng || minLng;
    maxLng = focusArea.maxLng || maxLng;
  }

  // 生成坐标数组
  const points = [];
  for (let i = 0; i < count; i++) {
    const lat = minLat + Math.random() * (maxLat - minLat);
    const lng = minLng + Math.random() * (maxLng - minLng);
    points.push([lat, lng]); // Leaflet 格式：[纬度, 经度]
  }
  return points;
}

// 示例1：生成10000个全球随机点
const globalPoints = generateRandomPoints(10000);

// 示例2：生成10000个中国境内随机点（更集中的显示效果）
const chinaPoints = generateRandomPoints(10000, {
  focusArea: { minLat: 18, maxLat: 54, minLng: 73, maxLng: 135 }
});