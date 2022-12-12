import { ethers } from 'ethers';

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