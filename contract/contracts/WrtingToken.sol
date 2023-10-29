// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WrtingToken is ERC20 {
    constructor() ERC20("WrtingToken", "WTT") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    /*
    */
    function rewardPublisher(address publisher) external {
        _mint(publisher, 100 * 10 ** decimals()); // 
    }

    function likePost(address viewer) external {
        _mint(viewer, 5 * 10 ** decimals()); // 
    }
}
