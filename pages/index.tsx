import { Flex } from '@mantine/core';
import { Presale } from '../components/Presale/Presale';
import { HeaderMegaMenu } from '../components/Header/Header';

// const useStyles = createStyles((theme) => ({
//   homePage: {
//     backgroundImage:
//       'radial-gradient(circle at 600px 0px, #21315d, transparent, transparent, transparent)',
//   },
// }));

export default function HomePage() {
  return (
    <Flex h="100vh" justify="center" align="center">
      <HeaderMegaMenu />
      <Presale />
    </Flex>
  );
}
