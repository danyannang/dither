import { useState } from 'react';
import { FileButton, Button, Group, Text, Image, NavLink, Checkbox, Grid, Stack, Center, Flex} from '@mantine/core';
import { useRef, useEffect } from 'react';
import { BlackAndWhite } from '../algorithms/BlackAndWhite';
import { Threshold } from '../algorithms/Threshold';
import { Random } from '../algorithms/Random';
import { Ordered } from '../algorithms/Ordered';
import { FloydSteinberg } from '../algorithms/FloydSteinberg';
import { Atkinson } from '../algorithms/Atkinson';
import { OptionsMenu } from './OptionsMenu';
import classes from "./ImageControls.module.css";

export function ImageControls(props : any) {
  const [file, setFile] = useState<File | null>(null);
  const [checked, setChecked] = useState(true);
  const [image_download, setDownload] = useState("");
  const [canvas_width, setWidth] = useState(800);
  const [canvas_height, setHeight] = useState(800);

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
  // let hRatio = canvas_width! / width;
  // let vRatio = canvas_height! / height;
  let ratio  = Math.min ( hRatio, vRatio );
  let shift_x = ( cwidth! - width*ratio ) / 2;
  let shift_y = ( cheight! - height*ratio ) / 2;  

  useEffect(() => {
    context = myCanvas?.current!.getContext("2d", { willReadFrequently: true });
    image.src = file ? URL.createObjectURL(file) : "";

    image.onload = () => {
      width = image.naturalWidth;
      height = image.naturalHeight;
      hRatio = cwidth! / width;
      vRatio = cheight! / height;
      // hRatio = canvas_width! / width;
      // vRatio = canvas_height! / height;
      ratio  = Math.min ( hRatio, vRatio );
      shift_x = ( cwidth! - width*ratio ) / 2;
      shift_y = ( cheight! - height*ratio ) / 2;  
      context!.clearRect(0, 0, cwidth!, cheight!);
      // height *= ratio;
      // width *= ratio;
      // console.log(width * ratio, height * ratio);
      // setWidth(width*2);
      // setHeight(height*2);
      context!.drawImage(image, 0, 0, width, height, shift_x, shift_y, width *= ratio, height *= ratio);
      // context!.drawImage(image, 0, 0, width*ratio, height*ratio);
      // context!.drawImage(image, 0, 0, canvas_width, canvas_height);

      // context!.drawImage(image, 0, 0);

      let imageData = context!.getImageData(0, 0, cwidth!, cheight!);
      // let imageData = context!.getImageData(0, 0, canvas_width!, canvas_height!);

      // depending on which dither option is selected, run the proper algorithm on the imageData
      {['None','Threshold', 'Random', 'Ordered (Bayer)', 'Floyd-Steinberg', 'Jarvis-Judice-Ninke']}
      switch (props.dither) {
        case 'None':
          console.log('black and white!');
          imageData = BlackAndWhite(imageData);
          break;
        case 'Threshold':
          console.log('threshold!');
          imageData = Threshold(imageData, props.options);
          break;
        case 'Random':
          console.log('random!', props.options.random_max);
          imageData = Random(imageData, props.options);
          break;
        case 'Ordered (Bayer)':
          console.log('ordered!', props.options.bayer_level);
          imageData = Ordered(imageData, props.options);
          break;
        case 'Floyd-Steinberg':
          console.log('floyd steinberg!');
          imageData = FloydSteinberg(imageData, props.options);
          break;
        case 'Atkinson':
          console.log('stucki!');
          imageData = Atkinson(imageData, props.options);
          break;
        default:
          console.log('switch to', props.dither);
          break;
      }

      //put pixel data on canvas.
      context!.clearRect(0, 0, cwidth!, cheight!);
      // context!.clearRect(0, 0, canvas_width!, canvas_height!);
      context!.putImageData(imageData, 0, 0);

      setDownload((canvas as HTMLCanvasElement).toDataURL());
    }
  }, [file, props.dither, props.options]);

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12,  lg: 1 }}></Grid.Col>
        <Grid.Col span={{ base: 12,  lg: 8 }}>
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
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 3 }}>
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
                <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                &nbsp;Upload Image
              </Button>}
            </FileButton>
            {/* <a href={file ? URL.createObjectURL(file) : ''} download={file ? file.name : null}>
              <Button variant="filled">Download Dithered Image</Button>
            </a> */}
            <a href={image_download} download={file ? file.name : null}>
              <Button variant="filled" color="grey">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
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
            <OptionsMenu dither={props.dither} onChange={props.onChange} options={props.options} setOptions={props.setOptions}></OptionsMenu>
          </Flex>
        </Grid.Col>
      </Grid>

      {/* <Group justify="center">
        
      </Group> */}
      {/* <Group justify="center">
        
      </Group> */}
    </>
  );
}