import { Image, Stack } from "@mantine/core";
import { ImageControls } from "./ImageControls";
import { useState } from "react";

export function ImageZone(props : any) {
  const [image, setImage] = useState();

  return (
    <>
        <ImageControls dither={props.dither} options={props.options} onChange={props.onChange} setOptions={props.setOptions}></ImageControls>
    </>
  );
}