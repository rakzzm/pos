import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

type ChatbotToggleProps = {
  onClick: () => void;
};

export function ChatbotToggle({ onClick }: ChatbotToggleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 w-16 h-16 bg-gradient-to-r from-chatbot-primary to-chatbot-secondary text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-float"
    >
      <div className="relative">
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-2 h-2 text-white" />
        </div>
      </div>
      
      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-chatbot-primary to-chatbot-secondary animate-ping opacity-20"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-chatbot-primary to-chatbot-secondary blur-lg opacity-30 animate-pulse"></div>
    </button>
  );
}