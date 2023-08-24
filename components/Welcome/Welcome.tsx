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
    isSaleLoading,
    isSaleSuccess,
    tokenSale,
    tokenAmount,
    setTokenAmount,
  } = usePresale();

  const [tokenAmountStr, setTokenAmountStr] = useState<string>('');
  const handleSale = () => {
    tokenSale?.();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().replace(/\s+/g, '');
    if (value === '') {
      setTokenAmount(BigInt(0));
    } else {
      const tokenAmountBigInt = utils.parseUnits(value).toBigInt();
      setTokenAmount(tokenAmountBigInt);
    }
    setTokenAmountStr(value);
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
          currentStagePrice : {utils.formatUnits(currentStagePrice, 18)} {balanceSymbol}
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
          value={tokenAmountStr}
          onChange={handleOnChange}
          onFocus={(e) => e.target.select()}
        />
        price: {utils.formatUnits((tokenAmount * currentStagePrice) / BigInt(1e18)).toString()}{' '}
        matic
        <br />
        <Button
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue', deg: 60 }}
          onClick={handleSale}
        >
          Teal blue
        </Button>
        {isSaleLoading && 'Transaction pending...'}
        {isSaleSuccess && 'Transaction success'}
      </Container>
    </>
  );
}
