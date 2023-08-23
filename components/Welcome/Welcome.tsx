import { useEffect } from 'react';
import { Title, Text, Anchor } from '@mantine/core';
import { useAccount, useContractRead, useContractReads, useBalance } from 'wagmi';
import useStyles from './Welcome.styles';
import { appConfig } from '../../utils/config';
import { getEthersProvider } from '../../utils/ethersUtils';

const presaleContract = {
  address: appConfig.presaleContractAddress,
  abi: appConfig.presaleContractAbi,
};

const contracts = [
  {
    ...presaleContract,
    functionName: 'currentStage',
  },
  {
    ...presaleContract,
    functionName: 'currentStageAvailableAmount',
  },
  {
    ...presaleContract,
    functionName: 'currentStagePrice',
  },
  {
    ...presaleContract,
    functionName: 'currentStageBlockStart',
  },
];

export function Welcome() {
  const provider = getEthersProvider();
  const { classes } = useStyles();
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({ address, watch: true });
  const { data: tokenBalanceData } = useBalance({
    address,
    token: appConfig.tokenContractAddress,
    watch: true,
  });
  const { data: viewData, isFetchedAfterMount } = useContractReads({ contracts, watch: true });
  const { data: soldAmount } = useContractRead({
    ...presaleContract,
    functionName: 'currentStageSoldAmount',
    args: [address],
  });

  useEffect(() => {
    isConnected &&
      provider.getBlock(39282561).then((block) => {
        console.log('block :>> ', block.timestamp);
      });
  }, [isConnected]);

  if (!isFetchedAfterMount) return null;
  return (
    <>
      <Title align="center">
        <Text inherit variant="gradient" component="span">
          {balanceData?.formatted} {balanceData?.symbol}
          <br />
          {tokenBalanceData?.formatted} {tokenBalanceData?.symbol}
          <br />
          Current stage : {viewData?.[0].result?.toString()}
          <br />
          currentStageAvailableAmount : {Number(viewData?.[1].result) / 1e18}{' '}
          {tokenBalanceData?.symbol}
          <br />
          currentStagePrice : {Number(viewData?.[2].result) / 1e18} {tokenBalanceData?.symbol}
          <br />
          currentStageBlockStart : {Number(viewData?.[3].result)}
          <br />
          currentStageSoldAmount : {Number(soldAmount) / 1e18} {tokenBalanceData?.symbol}
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
