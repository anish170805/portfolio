import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ChatPanel from '../components/ChatPanel';
import { projects } from '../data/projects';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 md:px-12 pt-40 pb-20">
        
        {/* HERO SECTION */}
        <section className="mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-mono text-[11px] text-text-muted uppercase tracking-widest">
              Available for work
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-text">
            Building things<br />
            <em className="not-italic text-text-muted font-serif">worth talking about.</em>
          </h1>
          
          <p className="max-w-xl text-text-muted text-base md:text-lg leading-relaxed font-mono font-light mb-10">
            Select any project below and explore it through a guided conversation — no fluff, just the details you actually want.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-text text-bg rounded-lg font-semibold text-[13px] tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              See Projects
              <ArrowRight size={14} />
            </button>
            <a 
              href="#contact"
              className="px-6 py-3 border border-border rounded-lg font-medium text-[13px] text-text-muted hover:text-text hover:border-text transition-all tracking-wide"
            >
              Get in touch
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mb-32">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="font-mono text-[11px] text-text-muted tracking-widest">// 01</span>
            <h2 className="text-2xl font-bold tracking-tight">About</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-text-muted leading-relaxed font-mono font-light text-[15px] space-y-6">
              <p>
                I'm a Full Stack Engineer who enjoys bridging the gap between complex backend systems and intuitive user interfaces.
              </p>
              <p>
                My approach is simple: build robustly, design minimally, and ship frequently. I specialize in React ecosystems and Python-based backend architectures, with a strong focus on AI integration.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-6 uppercase tracking-wider">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {["Python","SQL","LangChain","LangGraph","Machine Learning","Pandas","Scikit-learn","Git"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-3 py-1.5 border border-border rounded-lg text-xs font-mono text-text-muted bg-surface hover:border-text transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS GRID */}
        <section id="projects" className="scroll-mt-24 mb-32">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="font-mono text-[11px] text-text-muted tracking-widest">// 02</span>
            <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenChat={setSelectedProject} 
              />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="border-t border-border pt-20">
          <div className="max-w-2xl">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-mono text-[11px] text-text-muted tracking-widest">// 03</span>
              <h2 className="text-2xl font-bold tracking-tight">Contact</h2>
            </div>
            
            <p className="font-mono text-[13px] text-text-muted leading-relaxed mb-8">
              Interested in collaborating, have a question, or just want to say hi? I'd love to hear from you.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="mailto:goyalanish1708@gmail.com" className="flex items-center gap-2 px-5 py-3 bg-text text-bg rounded-lg text-xs font-bold hover:opacity-90">
                <Mail size={14} /> Email me
              </a>
              <a href="https://github.com/anish170805" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#24292e] text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                <Github size={14} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/anish-goyal-772b4428b" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#0077b5] text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border py-8 px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-text-muted tracking-wider uppercase">
        <span>© 2025 — Portfolio</span>
        <span>Built with React</span>
      </footer>

      {selectedProject && (
        <ChatPanel 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Home;