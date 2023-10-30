// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WrtingToken is ERC20 {
    event RewardedPublisher(address indexed publisher, uint256 amount);
    event LikedPost(address indexed viewer, uint256 amount);

    constructor() ERC20("WrtingToken", "WTT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    /*
    * Give 20 tokens to the Post Author
    * when the new post is created
    * args [ publisher : post author's address]
    */
    function rewardPublisher(address publisher) external {
        uint256 rewardAmount = 20 * 10 ** decimals();
        _mint(publisher, rewardAmount);
        emit RewardedPublisher(publisher, rewardAmount); 
    }
    /*
    * Give 1 tokens to who clicked the like button for a post
    * args [ viewer : the user's address who clicked like button ]
    */
    function likePost(address viewer) external {
        uint256 rewardAmount = 1 * 10 ** decimals();
        _mint(viewer, rewardAmount);
        emit LikedPost(viewer, rewardAmount);
    }
}
