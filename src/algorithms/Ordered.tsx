import { bayerLevelZero, bayerLevelOne, bayerLevelTwo } from "./BayerMatrix"

// thresholdMap to be passed in
// export function Ordered(imageData : ImageData, options:any) {
//   let bayerThresholdMap = bayerLevelZero;

//   if (options.bayer_level == 1) {
//     bayerThresholdMap = bayerLevelOne
//   }
//   else if (options.bayer_level == 2) {
//     bayerThresholdMap = bayerLevelTwo
//   }

//   let threshold = 127;
//   let imageDataLength = imageData.data.length;
//   let w = imageData.width;
//   let size = Math.pow(2, options.bayer_level + 1);

//   let data = imageData.data;
//   for (let i = 0; i <= imageDataLength; i += 4) {
//     const r = data[i];
//     const g = data[i + 1];
//     const b = data[i + 2];

//     let x = i/size % w;
//     let y = Math.floor(i/size / w); 
//     const threshold = bayerThresholdMap[y % bayerThresholdMap.length][x % bayerThresholdMap[0].length];

//     data[i] = r > threshold ? 255 : 0;
//     data[i + 1] = g > threshold ? 255 : 0;
//     data[i + 2] = b > threshold ? 255 : 0;
//   }

//   return imageData;
// }

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