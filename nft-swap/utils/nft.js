
import { ethers } from 'ethers';
import { getWeb3Provider, networkConnect } from "./connect";
import abiCode from "../artifacts/contracts/NFT.sol/MyErc721.json";

import networkConfig from "../config";

export  const mint = async(cid) => {
  const isConnect = networkConnect();
  if (!isConnect) {
    console.log('network not right!');
    return { success: false }
  }

  const provider = getWeb3Provider();
  const signer = provider.getSigner();
  const account = await signer.getAddress();
  console.log(account, await signer.getAddress());
  const nft = new ethers.Contract(networkConfig.nftAddress, abiCode.abi, signer)
  const transaction = await nft.connect(signer).mint(account, cid, {value: 1000000000})
  const tx = await transaction.wait()
  const evt = tx.events[0]
  const value = evt.args[2]
  const tokenId = value.toNumber();
  console.log('success', tokenId)
  return { success: true, tokenId }
}

export const getGateWay = (key, cid) => {
  const obj = {
    w3link: `https://${cid}.ipfs.dweb.link/`,
    dweb: `https://${cid}.ipfs.dweb.link/`
  }
  return obj[key]
}

export const ownerOfNft = async () => {
  const isConnect = networkConnect();
  if (!isConnect) {
    console.log('network not right!');
    return { success: false }
  }
  const provider = getWeb3Provider();
  const signer = provider.getSigner();
  const account = await signer.getAddress();
  const nft = new ethers.Contract(networkConfig.nftAddress, abiCode.abi, signer)
  const ownerCount = (await nft.balanceOf(account)).toNumber();
  const _ownerTokenIds = [];
  for (let i = 0; i < ownerCount; i++) {
    const _own = await nft.ownerOf(i);
    if (_own === account) {
      const nftUrl = await nft.tokenURI(i)
      _ownerTokenIds.push({
        tokenId: i,
        tokenURL: nftUrl
      })
    }
  }
  return {success: true, data: _ownerTokenIds }
}