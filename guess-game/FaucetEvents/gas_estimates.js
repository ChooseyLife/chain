var FaucetContract = artifacts.require("PETER");
instance.web3.eth.getGasPrice(function (err, result) {
  // var gasPrice = Number(result);
  console.log("Gas Price is " + err + " wei" + result + 'result'); // "10000000000000"
})

var gasEstimate = instance.transfer('0xffbec72dd03d7b366c5c7dbc76b7f73a144fd164', 10000).estimateGas()

var gasEstimate = instance.methods.transfer('0xffbec72dd03d7b366c5c7dbc76b7f73a144fd164', 10000).estimateGas()