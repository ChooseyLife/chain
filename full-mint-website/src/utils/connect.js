import { ethers } from "ethers";
import abi from "../assets/RoboPunksNFT.json"

export const connectWalletHandler = async (setAccounts) => {
  if (!window.ethereum) {
    message.error("please install wallet!");
    return "";
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Found an account! Address: ", accounts[0]);
    return accounts[0];
  } catch (err) {
    console.error(err);
    return "";
  }
};

export const contractInstance = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.REACT_APP_CONTRACT_ADDRESS, // 合约地址
    abi,
    signer
  );
  return contract;
}