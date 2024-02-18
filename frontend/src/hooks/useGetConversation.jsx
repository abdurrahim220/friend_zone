import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import axios from "axios";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(api+"/user", {
        withCredentials: true,
      });
      // console.log(res.data);
      setConversations(res.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
