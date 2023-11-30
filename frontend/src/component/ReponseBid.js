import { useEffect } from "react"
import "../css/AskBid.css"
import Web3 from "web3"
import { UseWeb3, getAddress, getERC20ABI, getERC20Address, getERC721ABI, getERC721Address } from "../CustomHook/UseWeb3"

function ResponseBid({event, accept, reject}) {
    const web3 = UseWeb3();
    useEffect(()=>{
        console.log("e", event)
    })
 

    const acceptOffer = async () => {
        const userId = sessionStorage.getItem("userId")
        const web3Instacne = new Web3('http://127.0.0.1:7545');
        const tokenABI = getERC721ABI();
        const tokenAddress = getERC721Address()
        const contractAddress = getAddress();

        const tokenContract = new web3Instacne.eth.Contract(tokenABI, tokenAddress);

        try{
            await tokenContract.methods.approve(contractAddress, event.returnValues.postId).send({ from: userId });
            await web3.methods.acceptOffer(event.returnValues.postId, event.returnValues.buyer, event.returnValues.amount).send({from: userId, gas: 500000});
        }catch(error){
            console.log("closeBid:", error)
        } 
        accept();
        
    }    
    
    const rejectOffer = async () => {
        const userId = sessionStorage.getItem("userId")
        const web3Instacne = new Web3('http://127.0.0.1:7545');
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
        reject();
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