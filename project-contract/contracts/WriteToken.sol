// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WriteToken is ERC20 {

    constructor() ERC20("WrtingToken", "WTT") {
    }
    /*
    * Give 20 tokens to the Post Author
    * when the new post is created
    * args [ publisher : post author's address]
    */
    function rewardPublisher(address publisher, uint256 rewardAmount) external {
        _mint(publisher, rewardAmount);
    }
    /*
    * Give 1 tokens to who clicked the like button for a post
    * args [ viewer : the user's address who clicked like button ]
    */
    function likePost(address viewer, uint256 rewardAmount) external {
        _mint(viewer, rewardAmount);
    }
}
