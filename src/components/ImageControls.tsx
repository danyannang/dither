import { useState } from 'react';
import { FileButton, Button, Image, Checkbox, Grid, Flex} from '@mantine/core';
import { useRef, useEffect } from 'react';
import { Threshold } from '../algorithms/Threshold';
import { Random } from '../algorithms/Random';
import { Ordered } from '../algorithms/Ordered';
import { FloydSteinberg } from '../algorithms/FloydSteinberg';
import { Atkinson } from '../algorithms/Atkinson';
import { OptionsMenu } from './OptionsMenu';
import classes from "./ImageControls.module.css";
import { IconDownload, IconUpload } from '@tabler/icons-react';

export function ImageControls(props : any) {
  // keeps track of uploaded image 
  const [file, setFile] = useState<File | null>(null);
  // whether original image should be shown
  const [checked, setChecked] = useState(true);
  // dithered image file, target for download
  const [image_download, setDownload] = useState("");
  // hidden canvas width and height, changes on image upload
  const [iWidth, setWidth] = useState(0);
  const [iHeight, setHeight] = useState(0);

  // canvasTwo is the hidden canvas of original image size
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const canvas = document.getElementById("to-dither");
  const myCanvasTwo = useRef<HTMLCanvasElement>(null);
  const canvasTwo = document.getElementById("to-hide");

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
  let contextTwo : CanvasRenderingContext2D | null;

  let image = document.createElement("img");

  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let hRatio = cwidth! / width;
  let vRatio = cheight! / height;
  let ratio  = Math.min ( hRatio, vRatio );
  let shift_x = ( cwidth! - width*ratio ) / 2;
  let shift_y = ( cheight! - height*ratio ) / 2;  

  // whenever tracked states change, rerender the dithered image according to chosen algorithm and options
  useEffect(() => {
    context = myCanvas?.current!.getContext("2d", { willReadFrequently: true });
    contextTwo = myCanvasTwo?.current!.getContext("2d", { willReadFrequently: true });

    image.src = file ? URL.createObjectURL(file) : "";

    image.onload = () => {
      width = image.naturalWidth;
      height = image.naturalHeight;
      setWidth(image.naturalWidth);
      setHeight(image.naturalHeight);
      hRatio = cwidth! / width;
      vRatio = cheight! / height;

      // center the dithered image in the canvas using the shifts
      ratio  = Math.min ( hRatio, vRatio );
      shift_x = ( cwidth! - width*ratio ) / 2;
      shift_y = ( cheight! - height*ratio ) / 2;  

      context!.clearRect(0, 0, cwidth!, cheight!);
      contextTwo!.clearRect(0, 0, width, height);

      context!.drawImage(image, 0, 0, width, height, shift_x, shift_y, width *= ratio, height *= ratio);
      contextTwo!.drawImage(image, 0, 0, iWidth, iHeight);

      let imageData = context!.getImageData(0, 0, cwidth!, cheight!);
      let imageDataTwo = contextTwo!.getImageData(0, 0, iWidth, iHeight);

      // depending on which dither option is selected, run the proper algorithm on the imageData
      {['None','Threshold', 'Random', 'Ordered (Bayer)', 'Floyd-Steinberg', 'Jarvis-Judice-Ninke']}
      switch (props.dither) {
        // return to original non-dithered image
        case 'None':
          break;
        case 'Threshold':
          imageData = Threshold(imageData, props.options);
          imageDataTwo = Threshold(imageDataTwo, props.options);
          break;
        case 'Random':
          imageData = Random(imageData, props.options);
          imageDataTwo = Random(imageDataTwo, props.options);
          break;
        case 'Ordered (Bayer)':
          imageData = Ordered(imageData, props.options);
          imageDataTwo = Ordered(imageDataTwo, props.options);
          break;
        case 'Floyd-Steinberg':
          imageData = FloydSteinberg(imageData, props.options);
          imageDataTwo = FloydSteinberg(imageDataTwo, props.options);
          break;
        case 'Atkinson':
          imageData = Atkinson(imageData, props.options);
          imageDataTwo = Atkinson(imageDataTwo, props.options);
          break;
        default:
          console.log('switch to', props.dither);
          break;
      }

      // clear the other pixels on the canvas first 
      context!.clearRect(0, 0, cwidth!, cheight!);
      contextTwo!.clearRect(0, 0, iWidth, iHeight);
      // put the new image data onto respective canvasses
      context!.putImageData(imageData, 0, 0);
      contextTwo!.putImageData(imageDataTwo, 0, 0);
      // change the download to the new dithered image
      setDownload((canvasTwo as HTMLCanvasElement).toDataURL());
    }
  }, [file, props.dither, props.options]);

  // render the grid with the image area and options selection
  // second invisible canvas just for downloading the dithered image in original image size
  // also includes a checkbox that shows the original uploaded image for comparison with the dithered if checked
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 1}}/>
        <Grid.Col span={{ base: 12,  md: checked ? 8 : 6, lg: 7, xl: checked ? 9 : 6}}>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {checked ? <Image className={classes.uploadedImage}
              id="original-image"
              src={file ? URL.createObjectURL(file) : null}
              width="40%"
              height="auto"
            /> : <></>}
            <canvas className={classes.canvas} id="to-dither" ref={myCanvas} width={800} height={800}/>
            <canvas className={classes.canvas_hidden} id="to-hide" ref={myCanvasTwo} width={iWidth} height={iHeight}/>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: checked ? 3 : 5, lg: 5, xl: checked ? 2 : 5}}>
          <Flex
            className={classes.menu}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button color="grey" {...props}>
                <IconUpload width="18"  height="18"  viewBox="0 0 24 24"></IconUpload>
                &nbsp;Upload Image
              </Button>}
            </FileButton>
            <a href={image_download} download={file ? file.name : null}>
              <Button variant="filled" color="grey">
                <IconDownload width="18"  height="18"  viewBox="0 0 24 24"></IconDownload>
                &nbsp;Download Dithered Image
              </Button>
            </a>
            <Checkbox
              color="grey"
              id='show-orig'
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              label="Show Original"
            />
            <OptionsMenu dither={props.dither} setDither={props.onChange} options={props.options} setOptions={props.setOptions}></OptionsMenu>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
}