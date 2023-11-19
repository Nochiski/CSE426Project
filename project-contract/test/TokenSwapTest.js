const tokenSwap = artifacts.require("TokenSwap");

contract("TokenSwap", accounts => {
    it("should create a new NFT", async () => {
        const instance = await tokenSwap.deployed();
        const author = accounts[0];
        const tokenURI = "http://localhost:8080/uri/6559a708d00fa50fc2879535"; 
  
        const result = await instance.createPostNFT(author, tokenURI);
        assert.equal(result.receipt.status, true, "Transaction failed");

        console.log(result.receipt);
    });

  });
  