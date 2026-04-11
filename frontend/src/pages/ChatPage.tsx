import Sidebar from "../components/Sidebar.tsx";
import ChatWindow from "../components/ChatWindow.tsx";
import { useEffect, useState } from "react";
import { createChat, getChats } from "../api/ChatApi.tsx";
import { Bounce, ToastContainer, toast } from "react-toastify";
import type { Chat } from "../Types.tsx";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Create a new chat and update the local state without refetching from server
  const handleNewChat = async () => {
    try {
      const result = await createChat();

      if (result?.success) {
        setChats((prev: any) => [result.data, ...prev]);
        setActiveChat(result.data);
      } else {
        console.error(result.error);
        toast.error(result?.message);
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error("Server Error!");
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      setChatsLoading(true);

      try {
        const result = await getChats();

        if (result.success) {
          setChats(result.data);
        } else {
          console.error(result.error);
          toast.error(result.message);
        }
      } catch (error: any) {
        console.error(error.message);
        toast.error("Server Error");
      } finally {
        setChatsLoading(false);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="flex h-dvh bg-white">
      <Sidebar
        chats={chats}
        setChats={setChats}
        setActiveChat={setActiveChat}
        chatsLoading={chatsLoading}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleNewChat={handleNewChat}
      />
      <ChatWindow
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        setShowSidebar={setShowSidebar}
        handleNewChat={handleNewChat}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}