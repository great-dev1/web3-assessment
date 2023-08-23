import tokenAbi from '../contracts/tokenAbi.json';
import presaleAbi from '../contracts/presaleAbi.json';

type AppConfig = {
  wallectConnectProjectID: string;
  alchemyID: string;
  tokenContractAddress: `0x${string}`;
  presaleContractAddress: `0x${string}`;
  tokenContractAbi: Array<Object>;
  presaleContractAbi: Array<Object>;
};

export const appConfig: AppConfig = {
  wallectConnectProjectID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  alchemyID: process.env.NEXT_PUBLIC_ALCHEMY_ID || '',
  tokenContractAddress: `0x${process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS?.slice(2)}`,
  presaleContractAddress: `0x${process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS?.slice(2)}`,
  tokenContractAbi: tokenAbi,
  presaleContractAbi: presaleAbi,
};
