// as the name implies, randomly assign each pixel black or white
export function Random(imageData : ImageData, options: any) {
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; 

    const noise = Math.random() * options.random_max;

    if (luminance < noise) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  return imageData;
}