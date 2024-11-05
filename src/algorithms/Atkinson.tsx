import { colorPalette } from "./PaletteColors"

// similar to Floyd-Steinberg dithering in JavaScript 
// involves iterating over the pixels of an image, quantizing each pixel to a limited color palette, and then distributing the quantization error to neighboring pixels
// distributes further than Floyd-Steinberg but not as much of the error
export function Atkinson(imageData : ImageData, options : any) {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  // depending on how many colors are needed, take a slice of the palette array of colors
  const palette = colorPalette.slice(0, options.atkinson_color_count);

  // for each pixel find the closest color in the palette
  // subtract the rbg values from the original to find the error
  // then distribute the error to the appropriate pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      let new_pixel = findClosestPaletteColor(data[i], data[i+1], data[i+2], palette);

      let err_r = data[i] - new_pixel[0];
      let err_b = data[i+1] - new_pixel[1];
      let err_g = data[i+2] - new_pixel[2];

      data[i] = new_pixel[0];
      data[i+1] = new_pixel[1];
      data[i+2] = new_pixel[2];

      if (x < width - 1) {
        distributeError(data, x + 1, y, err_r * 1 / 8, err_g * 1 / 8, err_b * 1 / 8, width);
      }
      if (x < width - 2) {
        distributeError(data, x + 2, y, err_r * 1 / 8, err_g * 1 / 8, err_b * 1 / 8, width);
      }
      if (y < height - 2) {
        distributeError(data, x, y + 2, err_r * 1 / 8, err_g * 1 / 8, err_b * 1 / 8, width);
      }
      if (y < height - 1) {
        if (x > 0) {
          distributeError(data, x - 1, y + 1, err_r * 1 / 8, err_g * 1 / 8, err_b * 1 / 8, width);
        }
        distributeError(data, x, y + 1, err_r * 1 / 8, err_g * 1 / 8, err_b * 1 / 8, width);
        if (x < width - 1) {
          distributeError(data, x + 1, y + 1, err_r * 1 / 8, err_g * 1 / 8, err_b * 1 / 8, width);
        }
      }
    }
  }

  return imageData;
}


function findClosestPaletteColor(r : number, g : number, b : number, palette : Array<Array<number>>) {
  let min_distance = 800;
  let closest = [0, 0, 0];

  for (let i = 0; i < palette.length; i++) {
    let new_r = palette[i][0];
    let new_g = palette[i][1];
    let new_b = palette[i][2];

    // use Euclidean function to find closest color using the rgb values as the 3 points
    let distance = Math.sqrt((new_r - r) ** 2 +(new_g - g) ** 2 +(new_b - b) ** 2);
    if (distance < min_distance) {
      min_distance = distance;
      closest = [new_r, new_g, new_b];
    }
  }

  return closest;
}

// add the error values to each corresponding index
function distributeError(data : Uint8ClampedArray, x : number, y : number, err_r : number,  err_g : number, err_b : number, width : number) {
  const index = (y * width + x) * 4;
  data[index] += err_r;
  data[index+1] += err_g;
  data[index+2] += err_b;
}
