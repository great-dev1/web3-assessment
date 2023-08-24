import { useState, useEffect } from 'react';
import { useAccount, useContractRead, useContractReads, useBalance, useBlockNumber } from 'wagmi';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { appConfig } from '../utils/config';

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
  const [remainingTime, setRemainingTime] = useState<TimeObject | undefined>();

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
