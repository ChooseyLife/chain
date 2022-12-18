import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import { Web3Storage } from "web3.storage";
import React, { useState, useReducer } from 'react'

import { getWeb3Provider, networkConnect } from "../utils/connect";
import { getIpfsStore, makeGatewayURL, token } from "../utils/ipfs";

import abiCode from "../artifacts/contracts/NFT.sol/MyErc721.json";

export default function Home() {
  const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
  const [files, setFiles] = useState([])
  const [web3Storage, setWeb3Storage] = useState(new Web3Storage({ token }))
  const [imgUrl, setImgUrl] = useState('')
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
    const account = (await provider.send('eth_requestAccounts', []))[0];
    const signer = provider.getSigner();
    const instance = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abiCode.abi,
      signer
    );
    console.log(account, signer.address);
    const transaction = await instance.mint(account,'/ipfs/bafybeihltlxs3vf74ewwxpskochuv4ck47kik4d5r3twghnyet4lkdfr5m/', {value: 1000000000});
    const txReceipt = await transaction.wait();
    const [transferEvent] = txReceipt.events;
    const {from, to, tokenId} = transferEvent.args;
    alert("Decoded data:" + " from: "+ from.toString() + " to: " +to.toString() + " tokenId: " + tokenId.toString());
  }

  const handlerIpfs = async(event) => {
    event.preventDefault()

    showMessage('> 📦 creating web3.storage client')
    const client = new Web3Storage({ token })
    showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
    const cid = await client.put(files, {
      onRootCidReady: localCid => {
        showMessage(`> 🔑 locally calculated Content ID: ${localCid} `)
        showMessage('> 📡 sending files to web3.storage ')
      },
      onStoredChunk: bytes => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
    })
    showMessage(`> ✅ web3.storage now hosting ${cid}`)
    showMessage(<span>&gt; 🔗 <a href={`https://dweb.link/ipfs/${cid}`}>`https://dweb.link/ipfs/${cid}`</a></span>)
    showMessage('> 📡 fetching the list of all unique uploads on this account')
    let totalBytes = 0
    for await (const upload of client.list()) {
      showMessage(`> 📄 ${upload.cid}  ${upload.name}`)
      totalBytes += upload.dagSize || 0
    }
    showMessage(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
  }
  const handlerGetIFPS = async() => {
    const isConnect = await networkConnect();
    console.log(isConnect);
    // const res = await web3Storage.get('bafybeihltlxs3vf74ewwxpskochuv4ck47kik4d5r3twghnyet4lkdfr5m'); // Web3Response
    // const status = await web3Storage.status("bafybeihltlxs3vf74ewwxpskochuv4ck47kik4d5r3twghnyet4lkdfr5m");
    // const files = await res.files(); // Web3File[]
    // console.log(res, '---status:', status);
    // for (const file of files) {
    //   console.log(`${file.cid} ${file.name} ${file.size}`);
    // }
    // const client = getIpfsStore();
    // const img = await makeGatewayURL('200621105327-1-lp.jpeg');
    // setImgUrl(img)
    // for await (const upload of client.list()) {
    //   console.log(upload);
    // }
  }
  return (
    <div className="md:container md:mx-auto">
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

          <div className={styles.card} onClick={handlerGetIFPS}>
            <p>获取IFPS</p>
          </div>
          <div className={styles.card} onClick={handlerGetIFPS}>
            <a href='home'>跳转</a>
          </div>
          <form id='upload-form' onSubmit={handlerIpfs}>
            <label htmlFor='filepicker'>Pick files to store</label>
            <input type='file' id='filepicker' name='fileList' onChange={e => setFiles(e.target.files)} multiple required />
            <input type='submit' value='Submit' id='submit' />
          </form>
          <div id='output'>
            &gt; ⁂ waiting for form submission...
            {messages.map((m, i) => <div key={m + i}>{m}</div>)}
          </div>
          <img src={imgUrl} />
          {/* <a href={imgUrl}>{imgUrl}</a> */}
        </div>
      </main>
    </div>
  )
}