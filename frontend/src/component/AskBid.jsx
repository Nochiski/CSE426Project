import { useState } from "react"
import "../css/AskBid.css"

function AskBid({closeBid}) {
    const [bidMessage, setBidMessage] = useState("")

    const handleChange = (e) => {
        if(e.target.value.length <= 200){
            setBidMessage(e.target.value)
        }
    }
    
    return (
        <div className="ask_bid">
            <div className="ask_bid_pop_up"> 
                <b className="ask_bid_pop_up_title">Bid</b>
                <div className="ask_bid_message">
                    <textarea className="ask_bid_msg_textarea"
                        type='text' 
                        onChange={(e) => {handleChange(e)}} 
                        value={bidMessage}
                        placeholder="input offer message">
                    </textarea>

                    <p className="ask_bid_msg_counter">Characters: {bidMessage.length}/200</p>
                    <div className="ask_bid_nfts"> {/* other nfts(for bidding) */}
                        <p>Choose my NFTs for trading</p>
                        <div>

                        </div>
                    </div>
                    <form className="ask_bid_token">

                    <input type='text' placeholder="put bid amount"></input>
                    </form>

                </div>
                <div className="ask_bid_bid_area">
                    <button className="ask_bid_bid_button"
                        onClick={
                            closeBid
                        }>Bid</button>
                </div>
            </div>
        </div>
    )
}

export default AskBid