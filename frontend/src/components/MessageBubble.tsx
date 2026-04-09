import { motion } from "framer-motion";

export default function MessageBubble({ value }: any) {
  const { message } = value;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-2"
      >
        <div
          className={`px-4 py-2 rounded-xl max-w-4/5 md:max-w-3/5 bg-blue-500 text-white`}
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
          className={`px-4 py-2 rounded-xl max-w-4/5 md:max-w-3/5 bg-gray-200 text-black
          `}
        >
          {message.ai}
        </div>
      </motion.div>
    </div>
  );
}
