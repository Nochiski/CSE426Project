// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BlogCraftNFT is ERC721URIStorage {

    constructor() ERC721("BlogCraftNTF", "BPT") {}

    function createPostNFT(address author, string memory tokenURI, uint256 newItemId) external returns (uint256) {
        _mint(author, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}

