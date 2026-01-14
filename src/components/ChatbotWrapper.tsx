"use client";

import React, { useState } from 'react';
import { Chatbot } from './Chatbot';
import { ChatbotToggle } from './ChatbotToggle';

export function ChatbotWrapper() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <Chatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />
      {!isChatbotOpen && (
        <ChatbotToggle onClick={() => setIsChatbotOpen(true)} />
      )}
    </>
  );
}
