import "./message.css"
import {format} from 'timeago.js'
// prop messages from Messenger component that makes axios call
export default function Message({message, own}) {

    // own prop determines css class of message to see if it needs to align flex-start or flex-end
  return (
    // classname logic to determine styling based on whether message is currentUser or another user
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src="https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg" className = "messageImg" alt="" />
            <p className = "messageText">{message?.text}</p>
        
        </div>
        <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  )
}
