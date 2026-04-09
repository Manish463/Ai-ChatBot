import { motion } from "framer-motion";
import { updateChat } from "../api/ChatApi";
import { toast } from "react-toastify";
import { useState } from "react";

export default function InputBox({ value }: any) {
  const { activeChat, setActiveChat, query, setQuery } = value;
  const [sendingQuery, setSendingQuery] = useState<boolean>(false);

  const sendMessage = async () => {
    setSendingQuery(true);

    if (query.trim(" ").length <= 1) {
      toast.warning("Input can't be empty!");
      setSendingQuery(false);
      return;
    }

    try {
      const result = await updateChat(activeChat?._id, query);
      setActiveChat(result.data);
      setQuery("");
      setSendingQuery(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Server error!");
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 border-t-2 border-gray-300 pt-4">
      <input
        className={`w-full py-3 px-6 rounded-full outline-none bg-gray-200`}
        placeholder="Type a message..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      {/* Send Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={sendMessage}
        disabled={query.length > 1}
        className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full cursor-pointer shrink-0"
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
