const BlogCraftNFT = artifacts.require("BlogCraftNFT");

module.exports = function(deployer) {
  //BlogCraftNFT : ERC 721
  deployer.deploy(BlogCraftNFT);
  const blogNFT = BlogCraftNFT.deployed();
}
