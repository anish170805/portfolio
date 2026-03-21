import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

const ProjectCard = ({ project, onOpenChat }) => {
  return (
    <div 
      onClick={() => onOpenChat(project)}
      className="group relative bg-surface border border-border rounded-[14px] p-7 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-text overflow-hidden"
    >
      <div className="absolute inset-0 bg-surface-2 opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-40" />
      
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="w-11 h-11 rounded-xl bg-surface-2 flex items-center justify-center text-xl shadow-sm">
          {project.icon}
        </div>
        
        {/* Repo Button - Replaces Status */}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border rounded-full text-[11px] font-mono font-medium text-text hover:bg-text hover:text-bg hover:border-text transition-all duration-200"
          >
            <Github size={12} />
            <span>repo</span>
          </a>
        )}
      </div>

      <h3 className="text-lg font-bold tracking-tight mb-2 relative z-10">{project.name}</h3>
      <p className="text-[13px] text-text-muted leading-relaxed font-mono font-light mb-5 relative z-10">
        {project.shortDesc}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
        {project.tags.map(tag => (
          <span key={tag} className="font-mono text-[10px] text-text-muted bg-surface-2 border border-border rounded px-2 py-0.5 tracking-wide">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-text tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
          Explore project
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;