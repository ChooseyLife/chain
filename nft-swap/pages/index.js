import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import React, { useState, useReducer } from 'react'

import { getWeb3Provider, networkConnect, getWalletAccount } from "../utils/connect";
import { getIpfsStore, storeFiles, jsonFile } from "../utils/ipfs";
import { ownerOfNft, mint } from "../utils/nft";

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
    const imgCid = await storeFiles([file], {
      name: file.name,
      wrapWithDirectory: false
    })
    showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
    const data = { meta: file.name, desc: 'cute girl', imgCid: imgCid, dwebUrl: `https://${imgCid}.ipfs.dweb.link/`, w3linkUrl: `https://${imgCid}.ipfs.w3s.link/`}
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
    mint(cid)
  }
  const onChangeImg = async(files) => {
    // 先上传图片
    const [file] = files;
    setFile(file)
  }

  const getOwnBalanceOf = async () => {
    const nft = await ownerOfNft();
    console.log(nft);
    // console.log(`nft 数量: ${ethers.utils.formatEther(balanceWETH)}\n`, _ownerTokenIds, tokenUrl)
  }
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
          <div className={styles.card} onClick={getOwnBalanceOf}>
            <a href='#'>获取余额</a>
          </div>
          <form id='upload-form' onSubmit={handlerIpfs}>
            <label>gateway</label>
            <select placeholder='select gateway' name="gateway">
              <option value="w3link">w3link</option>
              <option value="dweb">dweb</option>
            </select>
            <label htmlFor='filepicker'>Pick files to store</label>
            <input type='file' id='filepicker' name='fileList' onChange={e => onChangeImg(e.target.files)} multiple required />
            <button type='submit'>submit</button>
          </form>
          <div id='output'>
            &gt; ⁂ waiting for form submission...
            {messages.map((m, i) => <div key={m + i}>{m}</div>)}
          </div>
          <img src={imgUrl} />
        </div>
      </main>
    </div>
  )
}