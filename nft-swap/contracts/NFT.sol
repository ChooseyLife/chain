// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyErc721 is ERC721URIStorage{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  address feeCollector;
  uint fee = 1 gwei;
  event WITHDRAW(uint value, bytes data);
  constructor(address fc) ERC721("GameItem", "ITM") {
    feeCollector = fc;
  }

  function withdraw(address _to) external {
    // 判断是否合约拥有者
    require(msg.sender == feeCollector, "no permission!");

    // 将合约的币都转到合约拥有者的地址上
    (bool success, bytes memory data) = _to.call{value: address(this).balance}("");
    // 判断转账是否成功
    require(success, "withdraw failed!");
    // 成功则触发事件
    emit WITHDRAW(address(this).balance, data);
  }

  function mint(address from, string memory tokenURI) public payable returns(uint256 newItemId) {
    require(msg.value >= fee, "please private fee!");
    
    newItemId = _tokenIds.current();
    _mint(from, newItemId);
    _setTokenURI(newItemId, tokenURI);
    _tokenIds.increment();
  }
}