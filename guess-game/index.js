const ethers = require("ethers");
const ABI = require("./abi.json");
const express = require("express");
const web3 = require("web3");
const app = express();
async function main() {
  const address = "0x68D9c832523A52146F03503498dCB8218169617e";
  const provider = new ethers.providers.WebSocketProvider(
    "ws://localhost:7545"
  );
  const contract = new ethers.Contract(address, ABI, provider);
  contract.on("GuessResult", (from, to, value) => {
    console.log(from, to, value);
  })
}
//过滤器
// The null field indicates any value matches, this specifies
// "any Transfer from any to myAddress"
// let filter = contract.Transfer(null, myAddress);

// // Listen for our filtered results
// contract.on(filter, (from, to, value) => {
//     console.log('I received ' + value.toString() + ' tokens from ' + from);
// });

app.listen(8333, main);
