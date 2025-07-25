import React, { useState } from 'react';
import TaxCalculator from './TaxCalculator';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="relative min-h-screen">
            <TaxCalculator />

            {/* Floating Chat Button */}
            {!isChatOpen && (
                 <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40 flex items-center py-3 pl-4 pr-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-l-full shadow-lg hover:from-blue-500 hover:to-cyan-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                    aria-label="Ask AI Agent for a detailed explanation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                    </svg>
                    <div className="ml-3 text-left">
                        <p className="font-bold text-base leading-tight">AI Agent</p>
                        <p className="text-xs leading-tight">Ask for details</p>
                    </div>
                </button>
            )}
            
            {/* Chat Window Overlay */}
            <div className={`
                fixed inset-0 sm:inset-auto sm:top-1/2 sm:right-8 sm:transform sm:-translate-y-1/2 
                z-50 transition-all duration-300 ease-in-out
                ${isChatOpen 
                    ? 'opacity-100' 
                    : 'opacity-0 translate-y-full sm:translate-y-0 sm:translate-x-16 pointer-events-none'
                }`}
            >
                {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)} />}
            </div>

             {/* Backdrop for mobile */}
            {isChatOpen && <div className="fixed inset-0 bg-black/30 z-40 sm:hidden" onClick={() => setIsChatOpen(false)}></div>}
        </div>
    );
};

export default App;
