const WriteToken = artifacts.require("WriteToken");

module.exports = function(deployer) {
  // WriteToken : ERC 20 
  deployer.deploy(WriteToken);
  const writeToken = WriteToken.deployed();
};
