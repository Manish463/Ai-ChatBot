import Sidebar from "../components/Sidebar.tsx";
import ChatWindow from "../components/ChatWindow.tsx";
import { useEffect, useState } from "react";
import { createChat, getChats } from "../api/ChatApi.tsx";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function ChatPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Create a new chat and update the local state without refetching from server
  const handleNewChat = async () => {
    try {
      const result = await createChat();

      if (result?.success) {
        setChats((prev: any) => [result.data, ...prev]);
        setActiveChat(result.data);
        toast.success(result.message);
      } else {
        toast.error(result?.message || "Failed to create chat");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Server Error!");
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      setChatsLoading(true);
      try {
        const result = await getChats();

        if (result.success) {
          setChats(result.data);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error: any) {
        toast.error("Server Error");
      } finally {
        setChatsLoading(false);
      }
    };

    fetchChats();
  }, []);

  // Props for Sidebar component
  const sidebarProps = {
    chats,
    setChats,
    setActiveChat,
    chatsLoading,
    showSidebar,
    setShowSidebar,
    handleNewChat,
  };

  // Props for ChatWindow component
  const chatWindowProps = {
    activeChat,
    setActiveChat,
    setShowSidebar,
    handleNewChat,
  };

  return (
    <div className="flex h-dvh bg-white">
      <Sidebar value={sidebarProps} />
      <ChatWindow value={chatWindowProps} />
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