// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BlogCraftNFT.sol";
import "./WriteToken.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwap is ERC1155{
    BlogCraftNFT private blogNFT;
    WriteToken private writeToken;
    event OfferMade(uint256 indexed postId, address indexed buyer, address indexed seller,uint256 amount, string message); // Event when new offer is created
    event OfferAccepted(uint256 indexed tokenId, address indexed buyer);
    event OfferRejected(uint256 indexed tokenId, address indexed buyer);
    event RewardedPublisher(address indexed publisher, uint256 amount);
    event LikedPost(address indexed viewer, uint256 amount);
    event postnftcreated(address indexed author, uint256 indexed tokenId, string tokenURI);
    
    mapping(string => uint256) private uriToTokenId; 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    address private owner;

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

    constructor(address _blogNFT, address _writeToken) ERC1155(""){
        blogNFT = BlogCraftNFT(_blogNFT);
        writeToken = WriteToken(_writeToken);
        owner = msg.sender;
    }

    function getWTT(address publisher) external view returns (uint256) {
        return writeToken.balanceOf(publisher);
    }

    function rewardPublisher(address publisher) external {
        uint256 rewardAmount = 20 * 10 ** writeToken.decimals();

        writeToken.rewardPublisher(publisher, rewardAmount);
        emit RewardedPublisher(publisher, rewardAmount); 

    }

    function getTokenIdFromURI(string memory uri) external view returns (uint256){
        return uriToTokenId[uri];
    }

    function likePost(address viewer) external {
        uint256 rewardAmount = 1 * 10 ** writeToken.decimals();

        writeToken.likePost(viewer, rewardAmount);
        emit LikedPost(viewer, rewardAmount);
    }

    function createPostNFT(string memory uri) external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        uint256 itemId = blogNFT.createPostNFT(msg.sender, uri, newItemId);
        uriToTokenId[uri] = newItemId;
        emit postnftcreated(msg.sender, itemId, uri);
        return itemId;
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

    function acceptOffer(uint256 postId, address buyer, uint256 amount) 
        external
        offerExists(postId)
        onlyPostOwner(postId)
    {
        // Transfer the offer amount to the post owner
        writeToken.transfer(msg.sender, amount);

        // Transfer the NFT to the buyer
        blogNFT.transferFrom(msg.sender, buyer, postId);

        // Emit the OfferAccepted event
        emit OfferAccepted(postId, buyer);

        // Remove the offer
        delete postOffers[postId];
    }


    function rejectOffer(uint256 postId, address buyer, uint256 amount) 
        external
        onlyPostOwner(postId)
        offerExists(postId)
    {
        // Refund the buyer
        writeToken.transfer(buyer, amount);
        
        // Emit the OfferRejected event
        emit OfferRejected(postId, buyer);

        // Remove the offer
        delete postOffers[postId];
    }


}
