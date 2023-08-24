import { useState } from 'react';
import { Title, Text, TextInput, Container, Button } from '@mantine/core';
import { utils } from 'ethers';
import { usePresale } from '../../hooks/usePresale';

export function Welcome() {
  const {
    currentStage,
    currentStageAvailableAmount,
    currentStagePrice,
    currentStageStartBlock,
    balance,
    balanceSymbol,
    tokenBalance,
    tokenInfo,
    currentStageSoldAmount,
    currentBlockNumber,
    remainingTime,
    isFetchedAfterMount,
  } = usePresale();

  const [tokenAmount, setTokenAmount] = useState<bigint>(BigInt(0));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(BigInt(e.target.value));
  };

  if (!isFetchedAfterMount) return null;
  return (
    <>
      <Title align="center">
        <Text inherit variant="gradient" component="span">
          {balance}
          {balanceSymbol}
          <br />
          {tokenBalance} {tokenInfo?.symbol}
          <br />
          Current stage : {currentStage}
          <br />
          currentStageAvailableAmount : {utils.formatUnits(currentStageAvailableAmount)}
          {tokenInfo?.symbol}
          <br />
          currentStagePrice : {utils.formatUnits(currentStagePrice)} {tokenInfo?.symbol}
          <br />
          currentStageBlockStart : {currentStageStartBlock}
          <br />
          currentStageSoldAmount : {currentStageSoldAmount}
          <br />
          currentBlockNumber:{currentBlockNumber}
          <br />
          remainingTime: {remainingTime?.days} days {remainingTime?.hours} hours{' '}
          {remainingTime?.minutes} minutes
        </Text>
      </Title>
      <Container>
        <TextInput
          placeholder="Enter the token amount to buy"
          label="Token amount to buy"
          withAsterisk
          type="number"
          value={Number(tokenAmount)}
          onChange={handleOnChange}
          onFocus={(e) => e.target.select()}
        />
        price: {utils.formatUnits(tokenAmount * currentStagePrice).toString()} matic
        <br />
        <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
          Teal blue
        </Button>
      </Container>
    </>
  );
}
