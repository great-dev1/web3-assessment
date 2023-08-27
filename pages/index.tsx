import { Flex } from '@mantine/core';
import { Presale } from '../components/Presale/Presale';
import { HeaderMegaMenu } from '../components/Header/Header';

export default function HomePage() {
  return (
    <Flex h="100vh" justify="center" align="center">
      <HeaderMegaMenu />
      <Presale />
    </Flex>
  );
}
