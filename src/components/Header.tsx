import { useState } from 'react';
import { Container, Group, Burger, Space, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderSimple.module.css';
import { Logo } from '../assets/HeaderLogo.tsx'

export function HeaderSimple() {

  return (
    <header className={classes.header}>
      <Center className={classes.inner}>
        <Space h="md" />
        <Logo></Logo>
      </Center>
    </header>
  );
}