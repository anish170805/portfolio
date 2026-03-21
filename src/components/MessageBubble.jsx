import React from 'react';

const MessageBubble = ({ message }) => {
  const isAi = message.type === 'ai';
  
  return (
    <div className={`flex flex-col max-w-[85%] animate-fade-in ${isAi ? 'self-start' : 'self-end'}`}>
      <div 
        className={`
          px-4 py-3 rounded-[14px] text-[13.5px] leading-relaxed font-mono font-light
          ${isAi 
            ? 'bg-ai-bubble text-ai-text rounded-bl-sm' 
            : 'bg-user-bubble text-user-text rounded-br-sm'}
        `}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;