import { bayerLevelZero, bayerLevelOne, bayerLevelTwo } from "./BayerMatrix"

export function Ordered(imageData : any, options: any) {
  let bayerThresholdMap = bayerLevelZero;

  if (options.bayer_level == 1) {
    bayerThresholdMap = bayerLevelOne
  }
  else if (options.bayer_level == 2) {
    bayerThresholdMap = bayerLevelTwo
  }

  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const threshold = bayerThresholdMap[y % bayerThresholdMap.length][x % bayerThresholdMap[0].length] * 10;

      data[index] = r > threshold ? 255 : 0;
      data[index + 1] = g > threshold ? 255 : 0;
      data[index + 2] = b > threshold ? 255 : 0;
    }
  }

  return imageData;
}