// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BlogCraftNFT.sol";
import "./WriteToken.sol";

contract TokenSwap {
    BlogCraftNFT private blogNFT;
    WriteToken private writeToken;
    event OfferMade(uint256 indexed postId, address indexed buyer, address indexed seller,uint256 amount, string message); // Event when new offer is created
    event OfferAccepted(uint256 indexed tokenId, address indexed buyer);
    event OfferRejected(uint256 indexed tokenId, address indexed buyer);

    modifier noExistingOffer(uint256 postId) {
        require(!postOffers[postId].exists, "An offer already exists for this post");
        _;
    }

    modifier validTokenTransfer(uint256 offerAmount) {
        require(writeToken.transferFrom(msg.sender, address(this), offerAmount), "Token transfer failed");
        _;
    }

    modifier validMessageLength(string memory message) {
    require(bytes(message).length <= 200, "String exceeds 200 characters");
        _;
    }

    modifier offerExists(uint256 postId) {
    require(postOffers[postId].exists, "No offer to accept/reject");
    _;
    }

    modifier onlyPostOwner(uint256 postId) {
    require(blogNFT.ownerOf(postId) == msg.sender, "Only the owner can accept/reject the offer");
    _;
    }

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

    function getWTT(address publisher) external view returns (uint256) {
        return writeToken.balanceOf(publisher);
    }

    function rewardPublisher(address publisher) external {
        writeToken.rewardPublisher(publisher);
    }

    function likePost(address viewer) external {
        writeToken.likePost(viewer);
    }

    function createPostNFT(string memory tokenURI) external returns (uint256) {
        return blogNFT.createPostNFT(msg.sender, tokenURI);
    }
    
    function makeOffer(uint256 postId, uint256 offerAmount, string memory message) 
        external
        noExistingOffer(postId)
        validTokenTransfer(offerAmount)
        validMessageLength(message)
    {
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

    function acceptOffer(uint256 postId) 
        external
        offerExists(postId)
        onlyPostOwner(postId)
    {
        Offer memory offer = postOffers[postId];

        // Transfer the offer amount to the post owner
        writeToken.transfer(msg.sender, offer.amount);

        // Transfer the NFT to the buyer
        blogNFT.transferFrom(msg.sender, offer.buyer, postId);

        // Emit the OfferAccepted event
        emit OfferAccepted(postId, offer.buyer);

        // Remove the offer
        delete postOffers[postId];
    }


    function rejectOffer(uint256 postId) 
        external
        onlyPostOwner(postId)
        offerExists(postId)
    {
        Offer memory offer = postOffers[postId];

        // Refund the buyer
        writeToken.transfer(offer.buyer, offer.amount);
        
        // Emit the OfferRejected event
        emit OfferRejected(postId, offer.buyer);

        // Remove the offer
        delete postOffers[postId];
    }


}
