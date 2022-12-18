import { ethers } from 'ethers';
import config from "../config";

export function getWeb3Provider() {
  if (!window.web3Provider) {
      if (!window.ethereum) {
          console.error("there is no web3 provider.");
          return null;
      }
      window.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  }
  
  return window.web3Provider;
}

export async function networkConnect() {
  if (getWeb3Provider() === null) {
    console.error('there is no web3 provider.');
    return false;
  }
  try {
    // 获取当前连接的账户地址:
    const account = await window.ethereum.request({
        method: 'eth_requestAccounts',
    });
    if (String(config.chainId) !== ethereum.networkVersion ) {
      try {
        const r = await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${config.chainId.toString(16)}` }],
        });
        console.log(r);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: config.params,
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    }
    console.log('wallet connected.', config.chainId, account);
    return true;
  } catch (e) {
    console.error('could not get a wallet connection.', e);
    return false;
  }
}