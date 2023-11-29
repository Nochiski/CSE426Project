import { useEffect } from "react";
import "../css/NotificationsCenter.css"

function NotificationsCenter ({notifications}) {
    useEffect(()=>{
        
    });

    return(
        <div className="noti_background">
        {notifications && notifications.length > 0 ? (
            notifications.map((item) => (
                <div key={item.id}> 
                    <h5 className="noti_title">{item.title}</h5>
                    <h6 className="noti_description">{item.description}</h6>
                </div>
            ))
        ) : (
            <p className="noti_empty">Notification doesn't exist</p>
        )}
    </div>
    )
}

export default NotificationsCenter;