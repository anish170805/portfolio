import React from 'react';

const OptionChips = ({ options, onSelect, disabled }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="p-5 border-t border-border bg-bg/50 mt-auto">
      <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase mb-3">
        Choose a topic
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option)}
            disabled={disabled}
            className={`
              bg-surface border border-border rounded-lg px-3.5 py-2
              font-sans text-xs font-semibold tracking-wide text-text
              transition-all duration-150
              ${disabled 
                ? 'opacity-40 cursor-not-allowed' 
                : 'hover:bg-ai-bubble hover:text-white hover:border-ai-bubble active:scale-95'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OptionChips;