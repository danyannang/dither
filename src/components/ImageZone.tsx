import { Image, Stack } from "@mantine/core";
import { FileUploadButton } from "./ImageControls";
import { useState } from "react";

export function ImageZone() {
  const [image, setImage] = useState();

  return (
    <Stack>
        <FileUploadButton></FileUploadButton>
    </Stack>
  );
}