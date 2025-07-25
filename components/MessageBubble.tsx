import React from 'react';
import type { Message } from '../types';
import { Sender } from '../types';
import LoadingIndicator from './LoadingIndicator';

interface MessageBubbleProps {
  message: Message;
}

const UserAvatar: React.FC = () => (
    <div className="w-10 h-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

const AIAvatar: React.FC = () => (
    <div className="w-10 h-10 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    </div>
);


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <AIAvatar />}
      <div className={`max-w-md lg:max-w-2xl px-5 py-3 rounded-2xl ${isUser ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-slate-200 text-slate-800 rounded-bl-lg'}`}>
        {message.text ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <LoadingIndicator />
        )}
      </div>
      {isUser && <UserAvatar />}
    </div>
  );
};

export default MessageBubble;
