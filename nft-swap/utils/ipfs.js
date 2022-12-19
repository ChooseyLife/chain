import { Web3Storage } from "web3.storage";
export const token = process.env.NEXT_PUBLIC_._IPFS_TOKEN;
/**
 * https://<cid>.ipfs.<gateway-host>/<filename>
 * https://<gateway-host>/ipfs/<cid>/<filename>
 * @returns 
 */
export const getIpfsStore = () => {
  return new Web3Storage({ token }) 
}

export async function storeFiles (files, options) {
  const client = getIpfsStore()
  const cid = await client.put(files, options)
  console.log('stored files with cid:', cid)
  return cid
}

export async function storeWithProgress (files) {
  // show the root cid as soon as it's ready
  const onRootCidReady = cid => {
    console.log('uploading files with cid:', cid)
  }

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
  let uploaded = 0

  const onStoredChunk = size => {
    uploaded += size
    const pct = 100 * (uploaded / totalSize)
    console.log(`Uploading... ${pct.toFixed(2)}% complete`)
  }

  // makeStorageClient returns an authorized web3.storage client instance
  const client = getIpfsStore()

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk })
}

export function makeGatewayURL(path, cid = 'bafybeihltlxs3vf74ewwxpskochuv4ck47kik4d5r3twghnyet4lkdfr5m') {
  // https://bafkreieqhtalyigtunonqo7iennx3j3gvwis5lw26vqlumgpcoiwmqikga.ipfs.w3s.link/
  // https://bafkreicn736jfgqyxwhb623xolqzfozv6cikzdpbuttbuad7calps6uvga.ipfs.w3s.link/
  return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
}

export function jsonFile(filename, obj) {
  /**
  * jsonFile('metadata.json', {
  *    path: imageFile.name,
  *    caption
  * }
  */
  return new File([JSON.stringify(obj)], filename)
}