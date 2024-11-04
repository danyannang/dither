
import { Space } from "@mantine/core";
import { HeaderSimple } from "./components/Header";
import { ImageZone } from "./components/ImageZone";
import { useState } from "react";

export default function Dither() {
  const [dither, setDither] = useState("");
  const [options, setOptions] = useState({
    threshold: 127,
    random_max: 255,
    bayer_level: 0,
    floyd_color_count: 2,
    atkinson: 2
  });

  return (
    <div>
      <HeaderSimple></HeaderSimple>
      <Space h="lg"></Space>
        {/* <OptionsMenu dither={dither} onChange={setDither} options={options} setOptions={setOptions}></OptionsMenu> */}
      <ImageZone dither={dither} options={options} onChange={setDither} setOptions={setOptions}></ImageZone>
      <Space h="lg"></Space>
    </div>
  );
}