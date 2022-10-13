// 调用 babydoge 并部署调用其方法
window.onload = async function() {
  var babydoge, account, chainId;
  const initial = await init();
  if (!initial) {
    return;
  }
  $.getJSON('babydoge.json', function(abi){
    const provider = getWeb3Provider();
    const signer = provider.getSigner();
    babydoge = new ethers.Contract(
      "0xc748673057861a797275CD8A068AbB95A902e8de",
      abi,
      signer
    );
    console.log(babydoge, ethereum.networkVersion);
  })
  checkWalletIsConnected()
  const callContract = async () => {
    const res = await babydoge.decimals();
    console.log(res.toString(), "res");
  };

  // 绑定页面按钮事件
  choices = $('button');
  for(var i=0; i<choices.length; i++){
      choices[i].onclick = function(){
        callContract();
      }
  }

  function getWeb3Provider() {
    if (!window.web3Provider) {
        if (!window.ethereum) {
            console.error("there is no web3 provider.");
            return null;
        }
        window.web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    }
    
    return window.web3Provider;
  }
  async function init() {
    if (getWeb3Provider() === null) {
        console.error('there is no web3 provider.');
        return false;
    }
    try {
        // 获取当前连接的账户地址:
        account = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        // 获取当前连接的链ID:
        // chainId = await window.ethereum.request({
        //     method: 'eth_chainId'
        // });
        chainId = 0x38;
        if (String(chainId) !== ethereum.networkVersion ) {
          try {
            const r = await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
            console.log(r);
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x${chainId.toString(16)}`,
                      chainName: 'bsc-test',
                      rpcUrls: ['https://bsc-dataseed.binance.org/'] /* ... */,
                    },
                  ],
                });
              } catch (addError) {
                // handle "add" error
              }
            }
            // handle other "switch" errors
          }
        }
        console.log('wallet connected.', chainId, account);
        return true;
    } catch (e) {
        console.error('could not get a wallet connection.', e);
        return false;
    }
  }
}
async function checkWalletIsConnected() {
  const BSC_CHAIN_ID = 0x38;
  const BSC_NAME = "bsc-test";
  const BSC_URL = "https://bsc-dataseed.binance.org/";
  const CHAIN_COIN = "BNB";
  const CHAIN_COIN_Decimal = 18;
  const {ethereum} = window;
  if (!ethereum) {
    // 先判断是否安装了钱包
    console.log("Make sure you have Metamask installed!");
    return;
  }
  // 判断是否已经授权过账号
  const accounts = await ethereum.request({ method: "eth_accounts" });
  if (accounts.length !== 0) {
    // 判断当前钱包链接的网络与合约网络是否一致
    if (ethereum.networkVersion !== String(BSC_CHAIN_ID)) {
      try {
          // 不一致则请求切换到对应的合约网络，返回 null 代表成功，报错则切换失败
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${BSC_CHAIN_ID.toString(16)}` }],
          });
      } catch(switchError) {
        // 只有code 4902的代表钱包没有该合约网络，批准自动帮用户添加
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${BSC_CHAIN_ID.toString(16)}`,
                  chainName: BSC_NAME,
                  rpcUrls: [BSC_URL],
                  nativeCurrency: {
                    name: CHAIN_COIN,
                    symbol: CHAIN_COIN,
                    decimals: CHAIN_COIN_Decimal,
                  },
                },
              ],
            });
          } catch (addError) {
              console.error(addError, "addError");
              // handle "add" error
          }
        }
      }
    }
  } else {
    // 没有授权的账号
    console.error("No authorized account found");
    connectWalletHandler();
  }
}

async function connectWalletHandler() {
  const { ethereum } = window;
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Found an account! Address: ", accounts[0]);
  } catch (err) {
    console.error(err);
  }
}