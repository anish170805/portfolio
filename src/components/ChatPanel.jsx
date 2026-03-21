import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import MessageBubble from './MessageBubble';
import OptionChips from './OptionChips';

const ChatPanel = ({ project, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chipsDisabled, setChipsDisabled] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    if (project) {
      setMessages([]);
      setChipsDisabled(true);
      
      // Initial delay for realism
      setTimeout(() => {
        const startFlow = project.conversationFlow.start;
        showTyping(() => {
          addMessage('ai', startFlow.message);
          setCurrentOptions(startFlow.options);
          setChipsDisabled(false);
        });
      }, 500);
    }
  }, [project]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  const showTyping = (callback, delay = 1200) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleOptionSelect = (option) => {
    if (chipsDisabled) return;
    setChipsDisabled(true);

    if (option === 'Close chat') {
      onClose();
      return;
    }

    if (option === '← Start over') {
      addMessage('user', option);
      setTimeout(() => {
        const startFlow = project.conversationFlow.start;
        showTyping(() => {
          addMessage('ai', startFlow.message);
          setCurrentOptions(startFlow.options);
          setChipsDisabled(false);
        }, 800);
      }, 300);
      return;
    }

    // User message
    addMessage('user', option);

    // AI Response logic
    const nextStep = project.conversationFlow[option];
    
    if (nextStep) {
      // Randomize thinking time slightly
      const thinkingTime = 800 + Math.random() * 600;
      
      showTyping(() => {
        addMessage('ai', nextStep.message);
        if (nextStep.options) {
          setCurrentOptions(nextStep.options);
        } else {
          setCurrentOptions([]);
        }
        setChipsDisabled(false);
      }, thinkingTime);
    } else {
      setChipsDisabled(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
      {/* Overlay Backdrop */}
      <div 
        className="absolute inset-0 bg-text/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="pointer-events-auto w-full sm:w-[420px] h-[90vh] sm:h-[85vh] max-h-[800px] bg-surface flex flex-col rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up overflow-hidden border border-border">
        
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-surface z-10">
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:bg-surface-2 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-sm truncate">{project.name}</h2>
            <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase">
              AI Assistant · Guided Tour
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-text text-bg flex items-center justify-center text-lg">
            {project.icon}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin bg-surface">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          
          {isTyping && (
            <div className="flex flex-col items-start animate-fade-in">
              <div className="bg-ai-bubble px-4 py-3.5 rounded-[14px] rounded-bl-sm flex gap-1 items-center">
                <div className="typing-dot w-1.5 h-1.5 bg-white/50 rounded-full animate-typing" />
                <div className="typing-dot w-1.5 h-1.5 bg-white/50 rounded-full animate-typing" />
                <div className="typing-dot w-1.5 h-1.5 bg-white/50 rounded-full animate-typing" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chips Area */}
        <OptionChips 
          options={currentOptions} 
          onSelect={handleOptionSelect}
          disabled={chipsDisabled}
        />
      </div>
    </div>
  );
};

export default ChatPanel;