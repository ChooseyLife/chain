import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import React, { useState, useReducer } from 'react'

import { getWeb3Provider, networkConnect, getWalletAccount } from "../utils/connect";
import { getIpfsStore, storeFiles, jsonFile } from "../utils/ipfs";

import abiCode from "../artifacts/contracts/NFT.sol/MyErc721.json";
import networkConfig from "../config";

export default function Home() {
  const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
  const [imgUrl, setImgUrl] = useState('')
  const [file, setFile] = useState({})
  // 0x5FbDB2315678afecb367f032d93F642f64180aa3 合约地址

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
    const client = getIpfsStore()
    showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
    const data = { meta: file.name, desc: 'cute girl', imageUri: imgUrl, path: file.name}
    const fileData = jsonFile('metadata.json', data)
    const cid = await client.put([fileData], {
      wrapWithDirectory: false,
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
  const onChangeImg = async(files) => {
    // 先上传图片
    const [file] = files;
    setFile(file)
    console.log(files, file, jsonFile('metadata.json', file));

    const cid = await storeFiles(files, {
      name: file.name,
      wrapWithDirectory: false
    })
    // https://${cid}.ipfs.dweb.link/
    setImgUrl(`https://${cid}.ipfs.dweb.link/`)
  }

  const mintNFT = async() => {
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
    const transaction = await nft.connect(signer).mint(account, 'https://bafkreicn736jfgqyxwhb623xolqzfozv6cikzdpbuttbuad7calps6uvga.ipfs.dweb.link/', {value: 1000000000})
    const tx = await transaction.wait()
    const evt = tx.events[0]
    const value = evt.args[2]
    const tokenId = value.toNumber();
    return { success: true, tokenId }
  }

  const mint = async () => {}
  return (
    <div className="md:container md:mx-auto">
      <Head>
        <title>NFT Swap</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.grid}>
          <div className={styles.card}>
            <p>连接钱包</p>
          </div>

          <div className={styles.card} onClick={handlerCCM}>
            <p>合约调用</p>
          </div>

          <div className={styles.card} onClick={mintNFT}>
            <p>mint</p>
          </div>
          <div className={styles.card}>
            <a href='home'>跳转</a>
          </div>
          <form id='upload-form' onSubmit={handlerIpfs}>
            <label htmlFor='filepicker'>Pick files to store</label>
            <input type='file' id='filepicker' name='fileList' onChange={e => onChangeImg(e.target.files)} multiple required />
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