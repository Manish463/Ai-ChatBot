import ChatPage from "./pages/ChatPage";
import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </>
  );
}
