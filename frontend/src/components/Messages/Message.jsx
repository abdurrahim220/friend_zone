import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="" alt="user avatar" />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>
        Hi! what is upp?
      </div>
      <div className="chat-footer text-xs flex gap-1 items-center opacity-50">
        12:42
      </div>
    </div>
  );
};

export default Message;
