import { Menu, Button, Text, rem, NativeSelect, Slider } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

export function OptionsMenu() {
  return (
    <Menu shadow="md" closeOnItemClick={false}>
      <Menu.Target>
        <Button>Dither Options</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Dither Algorithm</Menu.Label>
        <Menu.Item>
          <NativeSelect data={['Floyd-Steinberg', 'Atkinson', 'Jarvis-Judice-Ninke']} />
        </Menu.Item>
        <Menu.Label>Diffusion Strength</Menu.Label>
        <Menu.Item>
          <Slider
            color="blue"
            marks={[
              { value: 0 },
              { value: 50 },
              { value: 100 },

          ]}
          />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}