const BlogCraftNFT = artifacts.require("BlogCraftNFT");
const WriteToken = artifacts.require("WriteToken");
const TokenSwap = artifacts.require("TokenSwap");

module.exports = async function(deployer) {

  //BlogCraftNFT : ERC 721
  const blogNFT = await BlogCraftNFT.deployed();
 
  // WriteToken : ERC 20 
  const writeToken = await WriteToken.deployed();
  
  // TokenSwap //ERC 1155
  await deployer.deploy(TokenSwap, blogNFT.address, writeToken.address);
};
