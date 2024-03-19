import React from "react";

function Message(props) {
  let dataRoll = props.position === "left_bubble" ? "ASSISTANT" : "USER";
  let thisClass = `chat-bubble ${props.position}`;
  return (
    <div data-role={dataRoll} className="bubble-container">
      <div className={thisClass}>
        <div className="text_message">
          {props.message.replace(/<\/?[^>]+(>|$)/g, "")}
        </div>
      </div>
      <div className="clear"></div>
    </div>
  );
}
export default Message;