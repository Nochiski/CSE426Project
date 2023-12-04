import { useEffect } from "react"
import "../css/AskBid.css"
import Web3 from "web3"
import { UseWeb3, getAddress, getERC20ABI, getERC20Address, getERC721ABI, getERC721Address } from "../CustomHook/UseWeb3"

const INFURA_API_KEY = "https://sepolia.infura.io/v3/db3042ae50dc42c0b7232f7a3f8c3fe2";
function ResponseBid({event, closeRequestOffer}) {
    const web3 = UseWeb3();
    useEffect(()=>{
        console.log("e", event)
    })
 

    const acceptOffer = async () => {
        const userId = sessionStorage.getItem("userId")
        const web3Instacne = new Web3(INFURA_API_KEY);
        const tokenABI = getERC721ABI();
        const tokenAddress = getERC721Address()
        const contractAddress = getAddress();

        const tokenContract = new web3Instacne.eth.Contract(tokenABI, tokenAddress);
        const data = tokenContract.methods.approve(contractAddress, event.returnValues.postId).encodeABI();

        const transactionParameters = {
            to: tokenAddress, 
            from: userId, 
            data: data
        };

        try{
            await window.ethereum.request({ method: 'eth_sendTransaction', params: [transactionParameters] }); 
            await web3.methods.acceptOffer(event.returnValues.postId, event.returnValues.buyer, event.returnValues.amount).send({from: userId, gas: 500000});
            
        }catch(error){
            console.log("closeBid:", error)
        } 
        closeRequestOffer();
        
    }    
    
    const rejectOffer = async () => {
        const userId = sessionStorage.getItem("userId")
        const web3Instacne = new Web3(INFURA_API_KEY);
        const tokenABI = getERC20ABI();
        const tokenAddress = getERC20Address()
        const contractAddress = getAddress();

        const tokenContract = new web3Instacne.eth.Contract(tokenABI, tokenAddress);

        try{
            await tokenContract.methods.approve(contractAddress, event.returnValues.amount).send({ from: userId });
            await web3.methods.rejectOffer(event.returnValues.postId, event.returnValues.buyer, event.returnValues.amount ).send({from: userId, gas: 500000});
        }catch(error){
            console.log("closeBid:", error)
        } 
        closeRequestOffer();
    }
    
    return (
        <div className="ask_bid">
            <div className="ask_bid_pop_up"> 
                <b className="ask_bid_pop_up_title">Response From the Offer</b>
                <div className="ask_bid_message">
                    <p className="ask_bid_title">NFT ID : {Number(event.returnValues.postId)}</p>
                    <p className="ask_bid_msg_textarea">
                        {event.returnValues.message}
                    </p>
                    <p className="ask_bid_title">Amount</p>
                    <p className="ask_bid_msg_textarea">
                        {Number(event.returnValues.amount/1000000000000000000n)}
                    </p>

                </div>
                <div className="response_bid_bid_area">
                    <button className="ask_bid_bid_button"
                        onClick={
                            acceptOffer
                        }>Accept</button>
                    <button className="response_bid_reject"
                        onClick={
                            rejectOffer
                        }>Reject</button>

                </div>
            </div>
        </div>
    )
}

export default ResponseBid