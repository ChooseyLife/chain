// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct tokenProps {
      uint256 levels;
      uint256 speed;
      uint256 power;
      uint256 age;
    }

    mapping(uint256 => tokenProps) public tokenIdToLevels;

    constructor() ERC721("Chain Battles", "CBTLS") {}

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenProps memory newItems = tokenProps({
            levels: 0,
            speed: 0,
            power: block.timestamp,
            age: 100
        });
        tokenIdToLevels[newItemId] = newItems;
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function getLevels(uint256 tokenId) public view returns (string memory) {
        uint256 levels = tokenIdToLevels[tokenId].levels;
        return levels.toString();
    }

    function generateCharacter(
        uint256 tokenId
    ) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Warrior",
            "</text>",
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Levels: ",
            getLevels(tokenId),
            "</text>",
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Chain Battles #',
            tokenId.toString(),
            '",',
            '"description": "Battles on chain",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function train(uint256 tokenId) public {
        require(_exists(tokenId), "Please use an existing token");
        require(
            ownerOf(tokenId) == msg.sender,
            "You must own this token to train it"
        );
        uint256 currentLevel = tokenIdToLevels[tokenId].levels;
        tokenIdToLevels[tokenId].levels = currentLevel + 1;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
