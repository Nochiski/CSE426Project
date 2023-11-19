// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlogCraftNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event postnftcreated(address indexed author, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("BlogCraftNTF", "BPT") {}

    function createPostNFT(address author, string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(author, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit postnftcreated(author, newItemId, tokenURI);
        return newItemId;
    }
}

