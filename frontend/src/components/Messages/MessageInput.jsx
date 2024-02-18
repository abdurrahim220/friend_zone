import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSentMessage from "../../hooks/useSentMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSentMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg w-full p-2.5 border-gray-500 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-spinner"></span>
            </div>
          ) : (
            <BsSend size={25} />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
