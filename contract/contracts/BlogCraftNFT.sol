// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BlogCraftNFT is ERC721URIStorage {

    uint256 private latestTokenId;
    mapping(uint256 => string) private tokenContentReference;

    event postnftcreated(address indexed author, uint256 indexed tokenId, string tokenURI, string contentReference);

    constructor() ERC721("BlogPostCopyright", "BNFT") {}

    function createPostNFT(address author, string memory tokenURI, string memory contentReference) external returns (uint256) {
        latestTokenId = latestTokenId + 1;
        _mint(author, latestTokenId);
        _setTokenURI(latestTokenId, tokenURI);
        tokenContentReference[latestTokenId] = contentReference;
        emit postnftcreated(author, latestTokenId, tokenURI, contentReference);
        return latestTokenId;
    }

    function getcontentreference(uint256 tokenId) external view returns (string memory) {
        return tokenContentReference[tokenId];
    }
}

