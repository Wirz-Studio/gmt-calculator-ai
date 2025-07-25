import React, { useState, useCallback } from 'react';
import { streamMessage } from '../services/geminiService';
import type { Message } from '../types';
import { Sender } from '../types';
import MessageList from './MessageList';
import UserInput from './UserInput';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial-ai-message', text: "Hello! I'm an AI assistant specializing in PMK 136/2024. How can I help you?", sender: Sender.AI }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: Sender.USER,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const aiMessageId = `ai-${Date.now()}`;
    // Add a placeholder AI message that will be populated by the stream
    setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: Sender.AI }]);

    try {
      const stream = await streamMessage(text);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: fullResponse } : msg
          )
        );
      }
    } catch (error) {
      console.error('Failed to stream message:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId ? { ...msg, text: 'An error occurred. Please try again.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full max-w-lg sm:h-[70vh] sm:max-h-[700px] bg-slate-50 rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
            <h2 className="text-lg font-bold text-slate-800">
                AI Tax Assistant
            </h2>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-800 transition-colors" aria-label="Close chat">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
      </header>

      <MessageList messages={messages} isLoading={isLoading} />
      <UserInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;
