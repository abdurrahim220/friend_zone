import React, { useEffect, useState } from "react";
import Conversations from "../../components/Conversations/Conversations";

import { getRandomEmoji } from "../../utils/emojis";
import useGetConversation from "../../hooks/useGetConversation";

const ConversationPage = () => {

  const  {loading, conversations }=useGetConversation()
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {
        conversations?.map((conversation,index)=>(

          <Conversations key={index} conversation={conversation} emoji={getRandomEmoji()} lastIdx={index === conversation.length -1}/>
        ))
      }

      {!loading ? <div className="flex items-center justify-center"><span className="loading loading-spinner"></span></div> : null}
      
    </div>
  );
};

export default ConversationPage;
