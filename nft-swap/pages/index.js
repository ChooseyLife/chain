import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';

import { getWeb3Provider } from "../utils/connect";

import abiCode from "../artifacts/contracts/NFT.sol/MyErc721.json";

export default function Home() {
  // 0x5FbDB2315678afecb367f032d93F642f64180aa3 合约地址
  const handlerConnect = async() => {
    // 连接钱包 切换到对应的网络
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      console.log("连接成功 ", accounts[0]);
    } else {
      // 没有授权的账号
      console.error("No authorized account found");
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
  }

  const handlerCCM = async() => {
    const provider = getWeb3Provider();
    const signer = provider.getSigner();
    const instance = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abiCode.abi,
      signer
    );
    instance.withdraw('0xBcd4042DE499D14e55001CcbB24a551F3b954096');
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>NFT Swap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.grid}>
          <div className={styles.card} onClick={handlerConnect}>
            <p>连接钱包</p>
          </div>

          <div className={styles.card} onClick={handlerCCM}>
            <p>合约调用</p>
          </div>
        </div>
      </main>
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}