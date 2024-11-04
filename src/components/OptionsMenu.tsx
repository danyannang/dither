import { Menu, Button, Text, rem, NativeSelect, Slider } from '@mantine/core';
import { useState } from 'react';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

export function OptionsMenu(props : any) {
  const [value, setValue] = useState("");

  return (
    <Menu shadow="md" closeOnItemClick={false}>
      <Menu.Target>
        <Button color="grey">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
          &nbsp;Dither Options
        </Button>
      </Menu.Target>

      <Menu.Dropdown color="grey">
        <Menu.Label>Algorithm</Menu.Label>
        <Menu.Item>
          <NativeSelect 
            value={props.dither}
            onChange={(event) => {props.onChange(event.currentTarget.value); console.log(props.dither)}}
            data={['None','Threshold', 'Random', 'Ordered (Bayer)', 'Floyd-Steinberg', 'Atkinson']}
          />
        </Menu.Item>

        <DitherOptions dither={props.dither} setOptions={props.setOptions} options={props.options}></DitherOptions>

        {/* <Menu.Label>Diffusion Strength</Menu.Label>
        <Menu.Item>
          <Slider
            color="blue"
            marks={[
              { value: 0 },
              { value: 50 },
              { value: 100 },
          ]}
          />
        </Menu.Item> */}

      </Menu.Dropdown>
    </Menu>
  );
}

function DitherOptions(props: any) {
  switch (props.dither) {
    case 'None':
      return <>
        <Menu.Label>CHANGE</Menu.Label>
        <Menu.Item>
          <Slider
            max={255}
            color="grey"
            marks={[
              { value: 0 },
              { value: 255 },
          ]}
          />
        </Menu.Item>
      </>
    case 'Threshold':
      console.log('threshold options');
      return <>
        <Menu.Label>Threshold</Menu.Label>
        <Menu.Item>
          <Slider
            value={props.options.threshold}
            onChange={(event) => {props.setOptions({...props.options, threshold : event})}}
            max={255}
            color="grey"
            marks={[
              { value: 0 },
              { value: 127 },
              { value: 255 },
          ]}
          />
        </Menu.Item>
      </>
    case 'Random':
      return <>
        <Menu.Label>Max Random Noise</Menu.Label>
        <Menu.Item>
          <Slider
            value={props.options.random_max}
            onChange={(event) => {props.setOptions({...props.options, random_max : event})}}
            max={255}
            color="grey"
            marks={[
              { value: 0 },
              { value: 127 },
              { value: 255 },
          ]}
          />
        </Menu.Item>
      </>
    case 'Ordered (Bayer)':
      return <>
        <Menu.Label>Bayer Level</Menu.Label>
        <Menu.Item>
          <Slider
            value={props.options.bayer_level}
            onChange={(event) => {props.setOptions({...props.options, bayer_level : event})}}
            min={0}
            max={2}
            color="grey"
            marks={[
              { value: 0 },
              { value: 2 },
          ]}
          />
        </Menu.Item>
      </>
    case 'Floyd-Steinberg':
      return <>
        <Menu.Label>Palette Color Count</Menu.Label>
        <Menu.Item>
          <Slider
            value={props.options.floyd_color_count}
            onChange={(event) => {props.setOptions({...props.options, floyd_color_count : event})}}
            max={5}
            min={2}
            color="grey"
            marks={[
              { value: 2 },
              { value: 5 },
          ]}
          />
        </Menu.Item>
      </>
    case 'Atkinson':
      return <>
        <Menu.Label>Palette Color Count</Menu.Label>
        <Menu.Item>
          <Slider
            value={props.options.atkinson_color_count}
            onChange={(event) => {props.setOptions({...props.options, atkinson_color_count : event})}}
            max={5}
            min={2}
            color="grey"
            marks={[
              { value: 2 },
              { value: 5 },
          ]}
          />
        </Menu.Item>
      </>
    default:
      console.log('options for', props.dither);
      return <>
        
      </>
  }
}