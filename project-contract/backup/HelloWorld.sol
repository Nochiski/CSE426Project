// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract HelloWorld {
    string public value;
    constructor(){
        value = "Hello World!";
    }

    function getValue() public view returns (string memory){
        return value;
    }
    function setValue(string memory _v) public{
        value = _v;
    }
}
