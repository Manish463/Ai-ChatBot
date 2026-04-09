// import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Chat, Message } from "../Types";

export default function ChatWindow({
  activeChat,
  setActiveChat,
  setShowSidebar,
  handleNewChat,
}: {
  activeChat: Chat | null;
  setActiveChat: (chat: Chat | null) => void;
  setShowSidebar: (show: boolean) => void;
  handleNewChat: () => void;
}) {
  const [query, setQuery] = useState<string>("");
  const messages = activeChat?.data;
  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
    }
  }, [activeChat]);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-gray-50">
      {/* Top Chat Name */}
      <div className="w-full flex mb-4 pb-4 border-b-2 border-gray-200 items-center bg-white rounded-lg p-3 shadow-sm">
        <div className="w-fit md:hidden absolute">
          <img
            onClick={() => setShowSidebar(true)}
            className="invert size-8 cursor-pointer"
            src="/icons/menu.svg"
            alt="Menu"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center cursor-default flex-1 text-gray-800">
          {activeChat?.name || "Chat Name"}
        </h1>
      </div>

      {/* Messages */}
      {messages?.length ? (
        <div
          ref={chatContainer}
          className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-lg shadow-sm"
        >
          {messages.map((message: Message, i: number) => (
            <MessageBubble key={i} message={message} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center gap-6 cursor-default bg-white rounded-lg shadow-sm p-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-7xl"
          >
            🤖
          </motion.div>
          <p className="text-3xl font-semibold text-gray-700">AI Chatbot</p>

          <p className="flex flex-col gap-3 justify-center items-center text-center">
            <span className="text-xl text-gray-500">Start a new conversation</span>
            <motion.button
              onClick={() => {
                handleNewChat();
                setShowSidebar(false);
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 flex justify-center items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-colors duration-200"
            >
              <span className="material-symbols-outlined">add</span>
              <span>New Chat</span>
            </motion.button>
          </p>
        </div>
      )}

      {/* Input */}
      {activeChat && <InputBox activeChat={activeChat} setActiveChat={setActiveChat} query={query} setQuery={setQuery} />}
    </div>
  );
}
