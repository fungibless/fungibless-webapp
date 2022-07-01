/* eslint-disable max-len */
import { WalletModule, ethers } from '@fungibless/wallet-module';

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

export { createContractInstance };
