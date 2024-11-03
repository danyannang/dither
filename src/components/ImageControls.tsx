import { useState } from 'react';
import { FileButton, Button, Group, Text, Image, NavLink, Checkbox } from '@mantine/core';
import { useRef, useEffect } from 'react';

export function FileUploadButton() {
  const [file, setFile] = useState<File | null>(null);

  const myCanvas = useRef<HTMLCanvasElement>(null);
  const canvas = document.getElementById("to-dither");
  let cwidth : number | undefined;
  let cheight : number | undefined;

  if (isCanvas(canvas!)) {
    cwidth = canvas.width;
    cheight = canvas.height;
  }

  function isCanvas(obj: HTMLCanvasElement | HTMLElement): obj is HTMLCanvasElement {
    return obj?.tagName === 'CANVAS';
  }

  let context : CanvasRenderingContext2D | null;
  let image = document.createElement("img");

  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let hRatio = cwidth! / width;
  let vRatio = cheight! / height;
  let ratio  = Math.min ( hRatio, vRatio );
  let shift_x = ( cwidth! - width*ratio ) / 2;
  let shift_y = ( cheight! - height*ratio ) / 2;  

  useEffect(() => {
    context = myCanvas?.current!.getContext("2d");
    image.src = file ? URL.createObjectURL(file) : "";

    image.onload = () => {
      width = image.naturalWidth;
      height = image.naturalHeight;
      hRatio = cwidth! / width;
      vRatio = cheight! / height;
      ratio  = Math.min ( hRatio, vRatio );
      shift_x = ( cwidth! - width*ratio ) / 2;
      shift_y = ( cheight! - height*ratio ) / 2;  
      context!.clearRect(0, 0, cwidth!, cheight!);
      // height *= ratio;
      // width *= ratio;
      context!.drawImage(image, 0, 0, width, height, shift_x, shift_y, width *= ratio, height *= ratio);
      // context!.drawImage(image, 0, 0, width*ratio, height*ratio);

      const imageData = context!.getImageData(0, 0, cwidth!, cheight!);
      let data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }

      //put pixel data on canvas.
      context!.clearRect(0, 0, cwidth!, cheight!);
      context!.putImageData(imageData, 0, 0);
    }
  }, [file]);

  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        <a href={file ? URL.createObjectURL(file) : ''} download={file ? file.name : null}>
          <Button variant="filled">Download Dithered Image</Button>
        </a>
        <a href={canvas ? (canvas as HTMLCanvasElement).toDataURL() : ''} download={file ? file.name : null}>
          <Button variant="filled">Download Dithered Image (real)</Button>
        </a>
        <Checkbox
          defaultChecked
          label="Show Original"
        />
      </Group>

      {/* {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )} */}
      <Group>
        <Image
          src={file ? URL.createObjectURL(file) : null}
          width={500}
          height={500}
        />
        <canvas id="to-dither" ref={myCanvas} width={500} height={500}/>
      </Group>
    </>
  );
}