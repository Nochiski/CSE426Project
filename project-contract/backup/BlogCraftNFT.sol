// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BlogCraftNFT is ERC721URIStorage {
    uint256 private latestTokenId;
    event postnftcreated(address indexed author, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("BlogCraftNTF", "BPT") {}

    function createPostNFT(address author, string memory tokenURI) external returns (uint256) {
        latestTokenId = latestTokenId + 1;
        _mint(author, latestTokenId);
        _setTokenURI(latestTokenId, tokenURI);
        emit postnftcreated(author, latestTokenId, tokenURI);
        return latestTokenId;
    }
}

