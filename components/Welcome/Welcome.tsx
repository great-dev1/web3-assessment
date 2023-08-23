import { Title, Text, Anchor } from '@mantine/core';
import { useAccount, useContractRead, useBalance } from 'wagmi';
import useStyles from './Welcome.styles';
import { appConfig } from '../../utils/config';

export function Welcome() {
  const { classes } = useStyles();
  const { address, isConnected, isConnecting } = useAccount();
  const { data: balanceData } = useBalance({ address, watch: true });
  const { data: tokenBalanceData } = useBalance({
    address,
    token: appConfig.tokenContractAddress,
    watch: true,
  });
  const { data: currentStage } = useContractRead({
    address: appConfig.presaleContractAddress,
    abi: appConfig.presaleContractAbi,
    functionName: 'currentStage',
  });
  const { data: currentStageAvailableAmount } = useContractRead({
    address: appConfig.presaleContractAddress,
    abi: appConfig.presaleContractAbi,
    functionName: 'currentStageAvailableAmount',
  });

  console.log('currentStageData :>> ', tokenBalanceData);

  return (
    <>
      <Title align="center">
        <Text inherit variant="gradient" component="span">
          {balanceData?.formatted} {balanceData?.symbol}
          <br />
          {tokenBalanceData?.formatted} {tokenBalanceData?.symbol}
          <br />
          Current stage : {currentStage?.toString()}
          <br />
          currentStageAvailableAmount : {Number(currentStageAvailableAmount) / 1e18}{' '}
          {tokenBalanceData?.symbol}
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </>
  );
}
