const tokenSwap = artifacts.require("TokenSwap");
const WriteToken = artifacts.require("WriteToken");
const BlogCraftNFT = artifacts.require("BlogCraftNFT");

contract("TokenSwap", accounts => {
    it("should create a new NFT", async () => {
        const instance = await tokenSwap.deployed();
        const tokenURI = "http://localhost:8080/uri/6559a708d00fa50fc2879535"; 
  
        const result = await instance.createPostNFT(tokenURI);
        assert.equal(result.receipt.status, true, "Transaction failed");

        console.log(result.receipt);
    });

  });
  


contract("TokenSwap", accounts => {
    it("should emit LikedPost event correctly", async () => {
        const instance = await tokenSwap.deployed();
        const writeToken = await WriteToken.deployed();

        const viewer = accounts[1];
        const rewardAmount = web3.utils.toBN(1 * 10 ** (await writeToken.decimals()));

        const result = await instance.likePost(viewer, { from: accounts[0] });

        assert.equal(result.logs.length, 1, "Should trigger one event");
        const event = result.logs[0];
        assert.equal(event.event, "LikedPost", "Should be the 'LikedPost' event");
        assert.equal(event.args.viewer, viewer, "Viewer address should match");
    });
});


contract("YourContract", accounts => {
    let blogCraftNFT;
    let yourContract;

    before(async () => {
        blogCraftNFT = await BlogCraftNFT.deployed();
        yourContract = await tokenSwap.deployed();
    });

    it("should return the correct tokenId for the given URI", async () => {
        let uri = "https://example.com/nft.json";
        await blogCraftNFT.createPostNFT(accounts[0], uri);
        
        let tokenId = await blogCraftNFT.getTokenIdFromURI(uri);

        let fetchedTokenId = await yourContract.getTokenIdFromURI(uri);

        assert.equal(tokenId.toString(), fetchedTokenId.toString(), "Token IDs should match");
    });

    it("should revert when URI does not exist", async () => {
        let nonExistentURI = "https://example.com/nonexistent.json";

        try {
            await yourContract.getTokenIdFromURI(nonExistentURI);
            assert.fail("The function did not revert with non-existent URI");
        } catch (error) {
            assert.include(error.message, "Token URI does not exist", "Error should contain 'Token URI does not exist'");
        }
    });
});

