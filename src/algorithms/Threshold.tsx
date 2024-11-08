// compare the value of the data for each pixel against the set threshold
// depending how the value compares to the threshold, set that pixel to white or black
export function Threshold(imageData : ImageData, options: any) {
  console.log('doing threshold/average');

  const data = imageData.data;

  let average = options.threshold;

  console.log('threshold is ', average);

  // Apply dithering
  for (let i = 0; i < data.length; i += 4) {
    const grayscale = data[i]; // Red component

    if (grayscale > average) {
      data[i] = data[i + 1] = data[i + 2] = 255; // White
    } else {
      data[i] = data[i + 1] = data[i + 2] = 0; // Black
    }
  }

  return imageData;
}