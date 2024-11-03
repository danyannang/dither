
import { Center, Flex, Group } from "@mantine/core";
import { HeaderSimple } from "./components/Header";
import { OptionsMenu } from "./components/OptionsMenu";
import { Shell } from "./components/Shell";
import { Image } from "@mantine/core";
import { FileUploadButton } from "./components/ImageControls";
import { ImageZone } from "./components/ImageZone";

export default function Dither() {
  return (
    <div>
      <HeaderSimple></HeaderSimple>
      <Group>
        <OptionsMenu></OptionsMenu>
        <ImageZone></ImageZone>
      </Group>
    </div>
  );
}