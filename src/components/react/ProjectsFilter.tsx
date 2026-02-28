import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock types mapping to Astro content schema
type Project = {
  id: string;
  body?: string;
  filePath?: string;
  collection: string;
  data: {
    title: string;
    date: Date;
    featured: boolean;
    tags: string[];
    role: string;
    stack: string[];
    summary: string;
  }
};

interface ProjectsFilterProps {
  initialProjects: Project[];
}

export default function ProjectsFilter({ initialProjects }: ProjectsFilterProps) {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach(p => p.data.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [initialProjects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return initialProjects.filter(project => {
      const matchTag = activeTag === 'All' || project.data.tags.includes(activeTag);
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = project.data.title.toLowerCase().includes(searchLower) || 
                          project.data.summary.toLowerCase().includes(searchLower) ||
                          project.data.stack.some(s => s.toLowerCase().includes(searchLower));
      
      return matchTag && matchSearch;
    }).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }, [initialProjects, activeTag, searchQuery]);

  return (
    <div className="w-full">
      {/* Controls Container */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg leading-5 bg-surface-elevated text-text-main placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Search projects or tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tag Filters (Scrollable on mobile) */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-2 md:pb-0">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap
                ${activeTag === tag 
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-900/20' 
                  : 'bg-surface-elevated text-text-muted hover:text-text-main hover:bg-surface border border-border'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Container with AnimatePresence */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={project.id}
                className="group relative bg-surface-elevated border border-border rounded-xl p-6 hover:shadow-lg hover:shadow-primary-900/5 transition-all flex flex-col h-full"
              >
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-text-main group-hover:text-primary-400 transition-colors">
                      <a href={`/projects/${project.id}`}>
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        {project.data.title}
                      </a>
                    </h3>
                    <div className="flex items-center gap-2">
                       {project.data.featured && (
                          <span className="inline-flex items-center rounded-full bg-secondary-500/10 px-2 py-1 text-xs font-medium text-secondary-500 ring-1 ring-inset ring-secondary-500/20">Featured</span>
                       )}
                    </div>
                  </div>
                  <p className="text-text-muted text-sm mb-6 line-clamp-3 leading-relaxed">
                    {project.data.summary}
                  </p>
                </div>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.data.stack.slice(0, 4).map(tech => (
                        <span key={tech} className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-muted ring-1 ring-inset ring-border">
                          {tech}
                        </span>
                      ))}
                      {project.data.stack.length > 4 && (
                        <span className="inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs font-medium text-text-muted ring-1 ring-inset ring-border">
                          +{project.data.stack.length - 4}
                        </span>
                      )}
                    </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-1 md:col-span-2 py-12 text-center"
            >
              <p className="text-text-muted text-lg">No projects found matching your criteria.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveTag('All'); }}
                className="mt-4 text-primary-400 hover:text-primary-300 font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
