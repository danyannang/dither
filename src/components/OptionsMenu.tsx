import { Menu, Button, NativeSelect, Slider } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

export function OptionsMenu(props : any) {
  // button with the dropdown for algorithm selection
  return (
    <Menu shadow="md" closeOnItemClick={false}>
      <Menu.Target>
        <Button color="grey">
          <IconSettings width="18"  height="18"  viewBox="0 0 24 24"></IconSettings>
          &nbsp;Dither Options
        </Button>
      </Menu.Target>

      <Menu.Dropdown color="grey">
        <Menu.Label>Algorithm</Menu.Label>
        <Menu.Item>
          <NativeSelect 
            value={props.dither}
            onChange={(event) => {props.setDither(event.currentTarget.value);}}
            data={['None','Threshold', 'Random', 'Ordered (Bayer)', 'Floyd-Steinberg', 'Atkinson']}
          />
        </Menu.Item>

        <DitherOptions dither={props.dither} setDither={props.setDither} setOptions={props.setOptions} options={props.options}></DitherOptions>
      </Menu.Dropdown>
    </Menu>
  );
}

// different algorithms have different variables to change
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