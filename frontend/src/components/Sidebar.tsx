import { motion } from "framer-motion";
import { deleteChat, renameChat } from "../api/ChatApi";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import type { Chat } from "../Types";

const parent = {
  hidden: {},
  visible: {},
};

const child = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export default function Sidebar({
  chats,
  setChats,
  setActiveChat,
  chatsLoading,
  showSidebar,
  setShowSidebar,
  handleNewChat,
}: {
  chats: Chat[];
  setChats: (chats: Chat[] | ((prev: Chat[]) => Chat[])) => void;
  setActiveChat: (chat: Chat | null) => void;
  chatsLoading: boolean;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  handleNewChat: () => void;
}) {
  const [show, setShow] = useState<any>({});
  const [showRenameWindow, setShowRenameWindow] = useState(false);
  const [updatingChat, setUpdatingChat] = useState<Chat | null>(null);
  const nameInp = useRef<any>(null);
  const boxRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setShow({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteChat(id);
      console.log(result);

      if (result?.success) {
        toast.success(result.message);
        setChats((prev) => prev.filter((c) => c._id !== id));
        setShow({});
        setActiveChat(null);
      } else {
        toast.error(result?.message || "Failed to delete");
      }
    } catch (error: unknown) {
      toast.error("Server Error");
    }
  };

  const handleRename = async () => {
    if (!updatingChat || !nameInp.current.value.trim()) return;

    try {
      const result = await renameChat(updatingChat._id, nameInp.current.value);
      console.log(result);

      if (result?.success) {
        toast.success(result.message);
        setChats((prev) => prev.map((c) => (c._id === updatingChat._id ? result.data : c)));
        setShow({});
        setUpdatingChat(null);
        nameInp.current.value = "";
        setShowRenameWindow(false);
      } else {
        toast.error(result?.message || "Failed to Rename");
      }
    } catch (error: any) {
      toast.error("Server Error");
    }
  };

  return (
    <div
      className={`${showSidebar ? "w-full" : "w-0"} absolute md:static z-10 md:w-72 h-screen bg-white shadow-lg flex flex-col overflow-hidden transition-all duration-300`}
    >
      {/* Top name and icon */}
      <div className="p-4 relative bg-gray-50">
        <motion.h2 className="text-2xl font-bold mb-4 gap-2 flex cursor-default">
          <div className="absolute right-5 top-5 md:hidden">
            <img
              onClick={() => setShowSidebar(false)}
              className="invert size-8 cursor-pointer"
              src="/icons/arrow.svg"
              alt="Close"
            />
          </div>
          <span>🤖</span>
          <span>AI Chatbot</span>
        </motion.h2>

        <div className="w-full h-0.5 bg-gray-300 my-4"></div>

        <motion.button
          onClick={() => {
            handleNewChat();
            setShowSidebar(false);
          }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-blue-100 hover:bg-blue-200 p-3 my-4 flex justify-start items-center gap-2 rounded-xl transition-colors duration-200"
        >
          <span className="material-symbols-outlined">add</span>
          <span className="font-semibold">New Chat</span>
        </motion.button>
      </div>

      {/* Recent and chats */}
      <div className="mb-4 w-full flex flex-col flex-1 pl-2 bg-gray-50">
        <h3 className="text-gray-500 font-semibold p-2">Recent Chats</h3>

        <div className="w-full p-2 overflow-x-hidden overflow-y-auto flex-1 max-h-[72vh]">
          {chatsLoading && (
            <div className="flex gap-2 w-full h-full justify-center items-center">
              <div className="w-5 h-5 rounded-full border-3 border-gray-300 border-b-gray-400 animate-spin"></div>
              <span className="text-zinc-700">Loading...</span>
            </div>
          )}
          {Array.isArray(chats) &&
            chats.map((chat) => (
              <motion.div
                key={chat._id}
                variants={parent}
                initial="hidden"
                whileHover="visible"
                className="p-3 cursor-pointer rounded-lg hover:bg-gray-200 text-md truncate flex justify-between transition-colors duration-200"
              >
                <span
                  onClick={() => {
                    setShowSidebar(false);
                    setActiveChat(chat);
                  }}
                  className="w-full"
                >
                  {chat.name}
                </span>

                <span className="">
                  {window.matchMedia("(min-width: 768px)").matches ? (
                    <motion.img
                      onClick={(e) => {
                        e.stopPropagation();
                        setShow((prev: any) => ({
                          ...prev,
                          [chat._id]: !prev[chat._id],
                        }));
                      }}
                      variants={child}
                      className="size-5"
                      src="/icons/threedots.svg"
                      alt="..."
                    />
                  ) : (
                    <motion.img
                      onClick={(e) => {
                        e.stopPropagation();
                        setShow((prev: any) => ({
                          ...prev,
                          [chat._id]: !prev[chat._id],
                        }));
                      }}
                      className="size-5"
                      src="/icons/threedots.svg"
                      alt="..."
                    />
                  )}

                  {show[chat._id] && (
                    <span
                      ref={boxRef}
                      className="absolute left-[35vw] md:left-68 mt-2 py-2 px-4 flex flex-col gap-1 border border-gray-200 bg-white rounded-lg text-sm font-semibold shadow-lg"
                    >
                      <span className="flex gap-1 hover:bg-gray-300 px-2 py-1 rounded-sm">
                        <img
                          className="invert"
                          src="/icons/edit.svg"
                          alt="edit"
                        />
                        <button
                          onClick={() => {
                            setShowRenameWindow(true);
                            setUpdatingChat(chat);
                          }}
                        >
                          Rename
                        </button>
                      </span>

                      <span className="flex gap-1 hover:bg-gray-300 px-2 py-1 rounded-sm">
                        <img
                          className="invert"
                          src="/icons/delete.svg"
                          alt="del"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(chat._id);
                          }}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </span>
                    </span>
                  )}
                </span>
              </motion.div>
            ))}
        </div>
      </div>
      {showRenameWindow && (
        <div className="absolute w-full h-full p-6 backdrop-blur-sm flex justify-center items-center bg-opacity-20">
          <div className="flex flex-col justify-evenly items-center p-6 w-84 min-h-36 bg-white border-2 border-gray-300 rounded-xl gap-4 shadow-xl">
            <h1 className="text-xl font-bold w-full text-center mb-4">
              Rename Chat
            </h1>
            <input
              ref={nameInp}
              type="text"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all duration-200"
              placeholder="Type new name..."
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
            />
            <div className="w-full flex justify-end gap-2 px-2">
              <button
                onClick={() => setShowRenameWindow(false)}
                className="text-sm text-gray-600 font-semibold hover:bg-gray-100 px-3 py-1 rounded transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                className="text-sm text-red-600 font-semibold hover:bg-red-100 px-3 py-1 rounded transition-colors duration-200"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
