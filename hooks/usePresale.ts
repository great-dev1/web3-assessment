import { useAccount, useContractRead, useContractReads, useBalance, useBlockNumber } from 'wagmi';
import { appConfig } from '../utils/config';

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

export function usePresale() {
  // account states
  const { address, isConnected } = useAccount();
  const { data: soldAmount } = useContractRead({
    ...presaleContract,
    functionName: 'currentStageSoldAmount',
    args: [address],
  });
  const { data: balanceData } = useBalance({ address, watch: true, suspense: true });
  const { data: tokenBalanceData } = useBalance({
    address,
    token: appConfig.tokenContractAddress,
  });
  // chain and contract states
  const { data: currentBlockNumber } = useBlockNumber({
    staleTime: 10_000,
    watch: true,
  });
  const { data: viewData, isFetchedAfterMount } = useContractReads({ contracts, cacheTime: 0 });

  return {
    currentStage: Number(viewData?.[0].result),
    currentStageAvailableAmount: Number(viewData?.[1].result),
    currentStagePrice: Number(viewData?.[2].result),
    currentStageStartBlock: Number(viewData?.[3].result),
    balance: balanceData?.formatted,
    balanceSymbol: balanceData?.symbol,
    tokenBalance: tokenBalanceData?.formatted,
    tokenInfo: tokenBalanceData,
    currentStageSoldAmount: Number(soldAmount),
    currentBlockNumber: Number(currentBlockNumber),
    address,
    isConnected,
    isFetchedAfterMount,
  };
}
