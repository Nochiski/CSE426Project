// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "./BlogCraftNFT.sol";
import "./WriteToken.sol";

contract TokenSwap {
    BlogCraftNFT private blogNFT;
    WriteToken private writeToken;
    event OfferMade(uint256 indexed postId, address indexed buyer, address indexed seller,uint256 amount, string message); // Event when new offer is created
    event OfferAccepted(uint256 indexed tokenId, address indexed buyer);
    event OfferRejected(uint256 indexed tokenId, address indexed buyer);

    struct Offer {
        address buyer;
        uint256 amount;
        string message;
        bool exists;
    }

    mapping(uint256 => Offer) public postOffers; // NFT post ID to its current offer

    constructor(address _blogNFT, address _writeToken) {
        blogNFT = BlogCraftNFT(_blogNFT);
        writeToken = WriteToken(_writeToken);
    }

    function createPostNFT(address author, string memory tokenURI) external returns (uint256) {
        return blogNFT.createPostNFT(author, tokenURI);
    }
    
    function makeOffer(uint256 postId, uint256 offerAmount, string memory message) external {
        require(!postOffers[postId].exists, "An offer already exists for this post");

        // Transfer the offer amount from the buyer to this contract as escrow
        require(writeToken.transferFrom(msg.sender, address(this), offerAmount), "Token transfer failed");
        
        require(bytes(message).length <= 200, "String exceeds 200 characters");

        // Record the offer
        postOffers[postId] = Offer({
            buyer: msg.sender,
            amount: offerAmount,
            message: message,
            exists: true
        });

        // Find the owner of the post
        address postOwner = blogNFT.ownerOf(postId);

        // Emit the event
        emit OfferMade(postId, msg.sender, postOwner, offerAmount, message);
    }

    function acceptOffer(uint256 postId) external {
        Offer memory offer = postOffers[postId];
        require(offer.exists, "No offer to accept");
        require(blogNFT.ownerOf(postId) == msg.sender, "Only the owner can accept the offer");

        // Transfer the offer amount to the post owner
        writeToken.transfer(msg.sender, offer.amount);

        // Transfer the NFT to the buyer
        blogNFT.transferFrom(msg.sender, offer.buyer, postId);

        // Emit the OfferRejected event
        emit OfferAccepted(postId, offer.buyer);

        // Remove the offer
        delete postOffers[postId];
    }

    function rejectOffer(uint256 postId) external {
        require(blogNFT.ownerOf(postId) == msg.sender, "Only the owner can reject the offer");

        Offer memory offer = postOffers[postId];
        require(offer.exists, "No offer to reject");

        // Refund the buyer
        writeToken.transfer(offer.buyer, offer.amount);
        
        // Emit the OfferRejected event
        emit OfferRejected(postId, offer.buyer);

        // Remove the offer
        delete postOffers[postId];
    }

}
