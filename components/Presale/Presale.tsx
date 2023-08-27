import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Flex,
  Title,
  Text,
  Space,
  Image,
  Progress,
  TextInput,
  Button,
  Card,
} from '@mantine/core';
import { utils } from 'ethers';
import { ConnectKitButton } from 'connectkit';
import { usePresale } from '../../hooks/usePresale';

export function Presale() {
  const {
    currentStage,
    currentStageAvailableAmount,
    currentStagePrice,
    tokenBalance,
    totalSupply,
    isConnected,
    remainingTime,
    isFetchedAfterMount,
    isSaleLoading,
    isSaleSuccess,
    tokenSale,
    tokenAmount,
    setTokenAmount,
  } = usePresale();
  const [tokenAmountStr, setTokenAmountStr] = useState<string>('');
  const [currentTokenBalance, setCurrentTokenBalance] = useState<number>(Number(tokenBalance));
  useEffect(() => {
    setCurrentTokenBalance(Number(currentTokenBalance) + Number(tokenAmountStr));
  }, [isSaleSuccess]);
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
    <Container my="md">
      <Grid gutter="xl">
        <Grid.Col xs={6} sx={{ padding: '3rem' }}>
          <Grid>
            <Grid.Col>
              <Title order={1} size="h3" weight={700} color="white">
                Overview
              </Title>
              <Space h="md" />
              <Text fz="sm" c="dimmed">
                The app displays the user`s purchased token amount, remaining tokens and price for
                the current stage, and includes a countdown timer for each stage`s end. Users can
                enter the desired purchase amount, calculate the price to pay, and complete the
                purchase within the dapp interface.
              </Text>
            </Grid.Col>
            <Grid.Col xs={6}>
              <Title order={1} size="h3" weight={700} color="white">
                Token Details
              </Title>
              <Space h="md" />
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  Name:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  TestToken
                </Text>
              </Flex>
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  Symbol:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  TSTK
                </Text>
              </Flex>
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  In.Supply:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  {totalSupply.split('.')[0]}
                </Text>
              </Flex>
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  Tot.Supply:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  1,000,000
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col xs={6}>
              <Title order={1} size="h3" weight={700} color="white">
                Pool Details
              </Title>
              <Space h="md" />
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  Hard Cap:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  15.000 USD
                </Text>
              </Flex>
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  Initial MC:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  35.000 USD
                </Text>
              </Flex>
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  Start:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  28 Aug, 14 UTC
                </Text>
              </Flex>
              <Flex>
                <Text fz="sm" c="white" weight={500}>
                  End:
                </Text>
                <Space w="xs" />
                <Text fz="sm" c="dimmed">
                  28 Aug, 16 UTC
                </Text>
              </Flex>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col xs={6}>
          <Card radius="xl" sx={{ padding: '3rem !important' }}>
            <Flex direction="column" justify="center" align="center">
              <Title order={1} weight={900}>
                Sale live
              </Title>
              <Space h="xl" />
              <Flex align="center">
                <Image maw={50} src="./images/logo.svg" alt="Logo image" />
                <Space w="md" />
                <Flex direction="column">
                  <Text fz="lg" fw={900}>
                    Stage {currentStage}
                  </Text>
                  <Text fz="lg" color="dimmed">
                    {remainingTime?.hours}h {remainingTime?.minutes}m left
                  </Text>
                </Flex>
              </Flex>
              <Space h="md" />
              <Progress
                w="100%"
                value={
                  Number((BigInt(1000000e18) - currentStageAvailableAmount) / BigInt(1000000e18)) *
                  100
                }
                label={`${utils.formatUnits(BigInt(1000000e18) - currentStageAvailableAmount)}`}
                size="xl"
                radius="xl"
              />
              <Flex w="100%" justify="space-between">
                <Text>0 TSTK</Text>
                <Text>1,000,000 TSTK</Text>
              </Flex>
              <Space h="lg" />
              <Grid w="70%">
                <Grid.Col xs={6}>
                  <Flex direction="column" align="center">
                    <Text fz="xs" weight={500} color="white">
                      Balance
                    </Text>
                    {isConnected ? (
                      <Text fz="xs">{currentTokenBalance} TSTK</Text>
                    ) : (
                      <Text fz="xs" c="red">
                        No wallet
                      </Text>
                    )}
                  </Flex>
                </Grid.Col>
                <Grid.Col xs={6}>
                  <Flex direction="column" align="center">
                    <Text fz="xs" weight={500} color="white">
                      Price
                    </Text>
                    <Text fz="xs">{utils.formatUnits(currentStagePrice)} MATIC</Text>
                  </Flex>
                </Grid.Col>
              </Grid>
              <Space h="lg" />
              <Flex align="center">
                <TextInput
                  withAsterisk
                  type="number"
                  placeholder="Amount to buy"
                  value={tokenAmountStr}
                  onChange={handleOnChange}
                  onFocus={(e) => e.target.select()}
                  rightSection={<Text fz="xs">TSTK</Text>}
                />
                <Space w="sm" />
                {'>>'}
                <Space w="sm" />
                <TextInput
                  withAsterisk
                  disabled
                  placeholder="Amount to buy"
                  rightSection={<Text fz="xs">MATIC</Text>}
                  value={utils
                    .formatUnits((tokenAmount * currentStagePrice) / BigInt(1e18))
                    .toString()}
                />
              </Flex>
              <Space h="md" />
              {isConnected ? (
                <Button
                  variant="gradient"
                  gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                  onClick={handleSale}
                >
                  Buy
                </Button>
              ) : (
                <ConnectKitButton />
              )}
              {isSaleLoading && <Text>Transaction pending...</Text>}
              {isSaleSuccess && <Text c="teal.4">Transaction success</Text>}
            </Flex>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
