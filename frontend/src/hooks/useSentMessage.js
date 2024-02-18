import { useState } from "react";


import { api } from "../utils/api";
import Swal from "sweetalert2";
import useConversation from "../zustand/useConversations";
const useSentMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
    console.log(message)
		try {
			const res = await fetch(api+`/message/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
      console.log(data)
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSentMessage;