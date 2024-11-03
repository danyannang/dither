import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Dither from "./Dither";

export default function App() {
  return <MantineProvider theme={theme}><Dither></Dither></MantineProvider>;
}
