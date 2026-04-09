import { motion } from "framer-motion";
import type { Message } from "../Types";

export default function MessageBubble({ message }: { message: Message }) {

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-2"
      >
        <div
          className={`px-4 py-3 rounded-2xl max-w-4/5 md:max-w-3/5 bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md`}
        >
          {message.user}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start mb-4"
      >
        <div
          className={`px-4 py-3 rounded-2xl max-w-4/5 md:max-w-3/5 bg-gray-100 text-gray-800 shadow-md`}
        >
          {message.ai}
        </div>
      </motion.div>
    </div>
  );
}
