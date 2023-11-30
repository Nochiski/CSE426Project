import { useEffect, useState } from "react";
import "../css/NotificationsCenter.css"
import Web3 from "web3";
import { getABI, getAddress } from "../CustomHook/UseWeb3";

function NotificationsCenter({eventSelected}) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvent();
          console.log("EVENT : ",events)

    },[events]);

    const loadEvent = async () => {
        
        const web3Instance = new Web3('ws://127.0.0.1:7545');
        const contractABI = getABI();
        const contractAddress = getAddress();
  
        if (web3Instance && contractABI && contractAddress) {
          const myContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          let processedEvents = JSON.parse(sessionStorage.getItem('processedEvents') || '{}');
    
          try {
              if (myContract && myContract.events) {
                  const eventSubscription = await myContract.events.OfferMade({
                      filter: { seller: sessionStorage.getItem("userId") },
                      fromBlock: 0
                  })
                  .on('data', function(event) {
                    if (!processedEvents[event.blockHash]) {
                      console.log('OfferMade Event:', event);
    
                      if (!events.some(e => e.blockHash === event.blockHash)) {
                        setEvents(prevEvents => [...prevEvents, event]);
                       // processedEvents[event.blockHash] = true;
                        sessionStorage.setItem('processedEvents', JSON.stringify(processedEvents));
                      }
                    }
                  })
                  .on('error', console.error);
    
                  return () => {
                      eventSubscription.unsubscribe();
                  };
              }
          } catch (error) {
              console.error("Error :", error);
          }        
        }
      }

    const handleResponse = (event, i) => {
        event.stopPropagation();
        eventSelected(i);
    }

    return (
        <div className="noti_background">
                {events.map((i, index) => (
                    <div className="noti_item" key={index}>
                        <p>An offer has arrived for NFT ID: {Number(i.returnValues.postId)}.</p>
                        <button onClick={(event)=>handleResponse(event, i)}> Response </button>
                    </div>
                ))}
        </div>
    );
}

export default NotificationsCenter;
