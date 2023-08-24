import { useState, useEffect } from 'react';
import {
  useAccount,
  useContractRead,
  useContractReads,
  useBalance,
  useBlockNumber,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { appConfig } from '../utils/config';
import { BigNumber, utils } from 'ethers';

dayjs.extend(duration);

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

type TimeObject = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function usePresale() {
  const [remainingTime, setRemainingTime] = useState<TimeObject | undefined>();
  const [tokenAmount, setTokenAmount] = useState<bigint>(BigInt(0));

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
    watch: true,
  });
  // chain and contract states
  const { data: currentBlockNumber } = useBlockNumber({
    staleTime: 10_000,
    watch: true,
  });
  const { data: viewData, isFetchedAfterMount } = useContractReads({
    contracts,
    cacheTime: 0,
    watch: true,
  });
  const currentStagePrice: bigint = (viewData?.[2].result || BigInt(0)) as bigint;
  const { config } = usePrepareContractWrite({
    ...presaleContract,
    functionName: 'tokenSale',
    args: [tokenAmount],
    value: (tokenAmount * currentStagePrice) / BigInt(1e18),
  });
  const {
    data: saleData,
    isLoading: isSaleLoading,
    isSuccess: isSaleSuccess,
    write: tokenSale,
  } = useContractWrite(config);

  const appData = {
    currentStage: Number(viewData?.[0].result),
    currentStageAvailableAmount: viewData?.[1].result as bigint,
    currentStagePrice: viewData?.[2].result as bigint,
    currentStageStartBlock: Number(viewData?.[3].result),
    balance: balanceData?.formatted,
    balanceSymbol: balanceData?.symbol,
    tokenBalance: tokenBalanceData?.formatted,
    tokenInfo: tokenBalanceData,
    currentStageSoldAmount: Number(soldAmount),
    currentBlockNumber: Number(currentBlockNumber),
    address,
    isConnected,
    remainingTime,
    isFetchedAfterMount,
    saleData,
    isSaleLoading,
    isSaleSuccess,
    tokenSale,
    tokenAmount,
    setTokenAmount,
  };

  useEffect(() => {
    if (currentBlockNumber) {
      const endBlockNumber = Number(appData.currentStageStartBlock) + 43200;
      const blockDelta = endBlockNumber - Number(currentBlockNumber);
      const secondDelta = blockDelta * 2.3;
      const timeDelta = dayjs.duration(secondDelta, 'seconds');
      const timeObject = {
        days: timeDelta.days(),
        hours: timeDelta.hours(),
        minutes: timeDelta.minutes(),
        seconds: timeDelta.seconds(),
      };
      setRemainingTime(timeObject);
    }
  }, [currentBlockNumber, appData.currentStageStartBlock]);

  return {
    ...appData,
  };
}
