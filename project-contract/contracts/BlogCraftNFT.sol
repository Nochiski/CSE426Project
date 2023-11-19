// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlogCraftNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(string => uint256) private uriToTokenId;


    constructor() ERC721("BlogCraftNTF", "BPT") {}

    function createPostNFT(address author, string memory tokenURI) external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(author, newItemId);
        _setTokenURI(newItemId, tokenURI);
        uriToTokenId[tokenURI] = newItemId;

        return newItemId;
    }

    function getTokenIdFromURI(string memory uri) public view returns (uint256) {
        return uriToTokenId[uri];
    }
}

