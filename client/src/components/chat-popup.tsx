import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function ChatPopup() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-50 max-w-4xl mx-auto"
      >
        <div className="bg-[#030303] border border-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left side - text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-xs sm:text-sm mb-1">Dúvidas?</h3>
              <p className="text-gray-300 text-xs hidden sm:block">Converse com o Gabriel!</p>
            </div>

            {/* Right side - Button and close */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => {
                  const chatSection = document.querySelector('.chat-widget-section');
                  if (chatSection) {
                    chatSection.scrollIntoView({ behavior: 'smooth' });
                  }
                  setIsVisible(false);
                }}
                className="gradient-bg glow-effect text-white py-2 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Falar com o Gabriel</span>
                <span className="sm:hidden">Gabriel</span>
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}