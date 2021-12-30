// import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {!own && (
          <img
            className="messageImg"
            src="https://i.stack.imgur.com/l60Hf.png"
            alt=""
          />
        )}
        <p className="messageText">{message.text}</p>
        {own && (
          <img
            className="messageImg"
            src="https://i.stack.imgur.com/l60Hf.png"
            alt=""
          />
        )}
      </div>
      <div className="messageBottom">{format(message.createdAt * 1000)}</div>
    </div>
  );
}
