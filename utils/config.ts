import { Narrow, Abi } from 'abitype';
import tokenAbi from '../contracts/tokenAbi.json';
import presaleAbi from '../contracts/presaleAbi.json';

type AppConfig = {
  walletConnectProjectID: string;
  alchemyID: string;
  tokenContractAddress: `0x${string}`;
  presaleContractAddress: `0x${string}`;
  tokenContractAbi: Narrow<Abi>;
  presaleContractAbi: Narrow<Abi>;
  STAGE_MAX_WALLET_BUY: BigInt;
};

export const appConfig: AppConfig = {
  walletConnectProjectID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  alchemyID: process.env.NEXT_PUBLIC_ALCHEMY_ID || '',
  tokenContractAddress: `0x${process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS?.slice(2)}`,
  presaleContractAddress: `0x${process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS?.slice(2)}`,
  tokenContractAbi: tokenAbi as Narrow<Abi>,
  presaleContractAbi: presaleAbi as Narrow<Abi>,
  STAGE_MAX_WALLET_BUY: BigInt('10000000000000000000000'),
};
