/* eslint-disable max-len */
import { WalletModule, ethers } from '@fungibless/wallet-module';

const CONTRACT_FUNGI_ABI_LOCATION = process.env.GATSBY_CONTRACT_FUNGI_ABI_LOCATION;
const CONTRACT_FUNGI_ADDRESS = process.env.GATSBY_CONTRACT_FUNGI_ADDRESS;

export const walletModule = new WalletModule();

async function createContractInstance(abiLocation, contract) {
  const abiResponse = await fetch(abiLocation, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const abi = await abiResponse.json();
  return new ethers.Contract(contract, abi, walletModule.provider);
}

export const fungiContract = createContractInstance(CONTRACT_FUNGI_ABI_LOCATION, CONTRACT_FUNGI_ADDRESS);
