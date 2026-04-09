// import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ChatWindow({ value }: any) {
  const { activeChat, setActiveChat, setShowSidebar, handleNewChat } = value;
  const [query, setQuery] = useState<string>("");
  const messages = activeChat?.data;
  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
    }
  }, [activeChat]);

  return (
    <div className="flex-1 flex flex-col justify-between p-4">
      {/* Top Chat Name */}
      <div className="w-full flex mb-4 pb-4 border-b-2 border-gray-300 items-center">
        <div className="w-fit md:hidden absolute">
          <img
            onClick={() => setShowSidebar(true)}
            className="invert size-8"
            src="/icons/menu.svg"
            alt=""
          />
        </div>
        <h1 className="text-2xl font-semibold text-center cursor-default flex-1">
          {activeChat?.name || "Chat Name"}
        </h1>
      </div>

      {/* Messages */}
      {messages?.length ? (
        <div
          ref={chatContainer}
          className="flex-1 overflow-y-auto space-y-3 p-2"
        >
          {messages.map((message: Object, i: number) => (
            <MessageBubble key={i} value={{ message }} />
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center gap-4 cursor-default">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl"
          >
            🤖
          </motion.div>
          <p className="text-2xl font-semibold">Ai Chatbot</p>

          <p className="flex flex-col gap-2 justify-center items-center">
            <span className="text-xl text-gray-500">Start a new conversation</span>
            <span>
              <motion.button
            onClick={() => {
              handleNewChat();
              setShowSidebar(false);
            }}
            whileHover={{ scale: 1.05 }}
            className="text-blue-500 hover:bg-blue-200 flex justify-start items-center gap-1 rounded-xl px-2"
          >
            <span className="font-semibold">New Chat</span>
          </motion.button>
            </span>
          </p>
        </div>
      )}

      {/* Input */}
      {activeChat && <InputBox value={{ activeChat, setActiveChat, query, setQuery }} />}
    </div>
  );
}
