import { ImageControls } from "./ImageControls";

export function ImageZone(props : any) {
  return (
    <>
        <ImageControls dither={props.dither} options={props.options} onChange={props.onChange} setOptions={props.setOptions}></ImageControls>
    </>
  );
}