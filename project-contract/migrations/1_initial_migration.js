const HelloWorld = artifacts.require("HelloWorld");
//const BlogCraftNFT = artifacts.require("BlogCraftNFT");
//const WriteToken = artifacts.require("WriteToken");
//const TokenSwap = artifacts.require("TokenSwap");

module.exports = async function(deployer) {

    deployer.deploy(HelloWorld);
  // BlogCraftNFT : ERC 721
  //deployer.deploy(BlogCraftNFT);
  //const blogNFT = await BlogCraftNFT.deployed();
 
  // WriteToken : ERC 20 
  //await deployer.deploy(WriteToken);
  //const writeToken = await WriteToken.deployed();

  // TokenSwap //ERC 1155
  //await deployer.deploy(TokenSwap, blogNFT.address, writeToken.address);
};
