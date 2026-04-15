import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-200 to-purple-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-br from-cyan-200 to-blue-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative w-full max-w-7xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between cursor-default border border-white/20"
      >
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">AI</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">AI Chatbot</h2>
              <p className="text-sm text-gray-500">Powered by Advanced AI</p>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Welcome to the{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Chatbot
            </span>
            !
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-xl mb-8 leading-relaxed"
          >
            Your intelligent assistant ready to help with answers, ideas, and solutions.
            How can I assist you today?
          </motion.p>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            {[
              { text: "Get Answers", icon: "❓" },
              { text: "Generate Ideas", icon: "💡" },
              { text: "Solve Problems", icon: "🛠️" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-gray-100 to-gray-200 rounded-full text-gray-700 font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-lg">{item.icon}</span>
                {item.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/chats">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span className="text-xl">💬</span>
                Start New Chat
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-0 relative flex flex-col items-center"
        >
          {/* Main illustration */}
          <div className="relative w-65 h-65 md:w-80 md:h-80 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-7xl"
            >
              🤖
            </motion.div>
            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"
            ></motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
              className="absolute bottom-6 left-6 text-2xl"
            >
              💭
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-8 left-8 text-xl"
            >
              ✨
            </motion.div>
          </div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
              <span className="text-green-500">●</span>
              <span className="text-sm font-medium text-gray-700">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm">
              <span className="text-blue-500">●</span>
              <span className="text-sm font-medium text-gray-700">Smart Responses</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
