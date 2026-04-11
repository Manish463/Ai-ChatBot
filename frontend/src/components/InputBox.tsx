import { motion } from "framer-motion";
import { updateChat } from "../api/ChatApi";
import { toast } from "react-toastify";
import { useState } from "react";
import type { Chat } from "../Types";

export default function InputBox({
  activeChat,
  setActiveChat,
  query,
  setQuery,
}: {
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  query: string;
  setQuery: (query: string) => void;
}) {
  const [sendingQuery, setSendingQuery] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!query.trim()) {
      toast.warning("Input can't be empty!");
      return;
    }

    setSendingQuery(true);
    try {
      const result = await updateChat(activeChat!._id, query);

      if(result.success) {
        setActiveChat(result.data);
        setQuery("");
      } else {
        console.error(result.error);
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Server error!");
    } finally {
      setSendingQuery(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4 border-t-2 border-gray-300 pt-4">
      <input
        className="w-full py-3 px-6 rounded-full outline-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all duration-200 placeholder-gray-500"
        placeholder="Type a message..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !sendingQuery && sendMessage()}
      />

      {/* Send Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={sendMessage}
        disabled={!query.trim() || sendingQuery}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer shrink-0 transition-colors duration-200"
      >
        {!sendingQuery ? (
          <img className="w-6 h-6" src="/icons/send.svg" alt="Send" />
        ) : (
          <div className="w-6 h-6 rounded-full border-4 border-b-white border-blue-300 animate-spin"></div>
        )}
      </motion.button>
    </div>
  );
}
