import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { projects } from '../data/mockData';
import { 
  Search,
  Github,
  ExternalLink,
  Code,
  Calendar,
  Filter,
  Star,
  Eye,
  GitBranch,
  FolderOpen,
  FileText,
  Play,
  X,
  ArrowLeft,
  Monitor,
  Users,
  Clock,
  Briefcase,
  Archive
} from 'lucide-react';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Get all unique technologies for filtering
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         selectedFilter === 'featured' && project.featured ||
                         project.technologies.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'featured', label: 'Featured' },
    ...allTechnologies.map(tech => ({ value: tech, label: tech }))
  ];

  // Simple animation for project cards
  useEffect(() => {
    const timer = setTimeout(() => {
      filteredProjects.forEach((project, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => [...prev, project.id]);
        }, index * 100);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredProjects]);

  // Reset visible projects when filter changes
  useEffect(() => {
    setVisibleProjects([]);
  }, [selectedFilter, searchQuery]);

  const ProjectCard = ({ project, index }) => {
    const isVisible = visibleProjects.includes(project.id);
    const isHovered = hoveredProject === project.id;

    return (
      <div 
        className={`project-card relative transition-all duration-500 cursor-pointer ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          transitionDelay: `${index * 100}ms`,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* 3D Card Container */}
        <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
          isHovered ? 'transform-gpu' : ''
        }`}
        style={{
          transform: isHovered ? 'rotateX(5deg) rotateY(5deg) translateZ(20px)' : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? '0 25px 50px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.1)' : '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          
          {/* Project Image */}
          <div className="relative overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className={`w-full h-48 object-cover transition-all duration-300 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-yellow-500 text-black font-semibold shadow-lg">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isHovered ? 'opacity-20' : 'opacity-0'
            }`}></div>
          </div>
          
          {/* Card Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>
            
            {/* Technologies */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 transform hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demo, '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Live Demo
              </Button>
              
              <Button 
                size="sm"
                variant="outline"
                className="border-gray-300 hover:border-gray-400 transition-all duration-200 transform hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, '_blank');
                }}
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </Button>
            </div>
          </div>
          
          {/* 3D Card Shadow Effect */}
          <div className={`absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none ${
            isHovered ? 'shadow-2xl' : 'shadow-none'
          }`}
          style={{
            transform: isHovered ? 'translateZ(-10px)' : 'translateZ(0px)',
            background: isHovered ? 'rgba(0,0,0,0.1)' : 'transparent',
            filter: 'blur(10px)'
          }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
      {/* Professional Office Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200"></div>
        
        {/* Office Wall Texture */}
        <div className="absolute inset-0 opacity-30"
             style={{
               background: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(156, 163, 175, 0.1) 100px, rgba(156, 163, 175, 0.1) 102px)'
             }}></div>
        
        {/* Office Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        
        {/* Subtle Office Elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-gray-400 rounded-full opacity-30"></div>
        <div className="absolute bottom-32 left-32 w-1 h-1 bg-gray-400 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-20 w-1 h-1 bg-gray-400 rounded-full opacity-25"></div>
      </div>

      {/* Professional Header */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-semibold bg-white/80 border-amber-800 text-amber-800 shadow-sm">
                <Archive className="w-4 h-4 mr-2" />
                PROJECT ARCHIVE
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
                Project Files
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                📁 Professional project portfolio organized in a digital filing system.<br/>
                Hover over any drawer to explore the project details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Controls */}
      <section className="relative z-10 py-8 bg-white/50 backdrop-blur-sm border-y border-gray-300/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-700 placeholder-gray-500 shadow-sm"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
                className="bg-amber-800 hover:bg-amber-700 text-white border-amber-800"
              >
                <Briefcase className="w-4 h-4 mr-1" />
                All Projects ({projects.length})
              </Button>
              
              <Button
                variant={selectedFilter === 'featured' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('featured')}
                className="bg-yellow-600 hover:bg-yellow-500 text-white border-yellow-600"
              >
                <Star className="w-4 h-4 mr-1" />
                Featured ({projects.filter(p => p.featured).length})
              </Button>
              
              {allTechnologies.slice(0, 4).map(tech => (
                <Button
                  key={tech}
                  variant={selectedFilter === tech ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(tech)}
                  className="bg-blue-600 hover:bg-blue-500 text-white border-blue-600"
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filing Cabinet Grid */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">No Files Found</h3>
                <p className="text-gray-500">No projects match your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <FilingDrawer key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
            
            {/* Office Stats */}
            {filteredProjects.length > 0 && (
              <div className="text-center mt-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    📊 Archive Statistics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-600">{filteredProjects.length}</div>
                      <div className="text-sm text-gray-600">Total Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">{projects.filter(p => p.featured).length}</div>
                      <div className="text-sm text-gray-600">Featured</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{allTechnologies.length}</div>
                      <div className="text-sm text-gray-600">Technologies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-600">Organized</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .filing-drawer {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .filing-drawer-body {
          background: linear-gradient(135deg, #8B4513 0%, #654321 30%, #8B4513 60%, #654321 100%);
          border: 2px solid #6B4423;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .filing-drawer:hover .filing-drawer-body {
          transform: rotateX(5deg) translateZ(8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        @keyframes drawerOpen {
          0% { transform: rotateX(0deg) translateZ(0px); }
          100% { transform: rotateX(5deg) translateZ(8px); }
        }
        
        @keyframes fileSlideOut {
          0% { 
            transform: translateX(0) translateY(0) scale(1); 
            opacity: 0.9; 
          }
          100% { 
            transform: translateX(100%) translateY(16px) scale(1.1); 
            opacity: 1; 
          }
        }
        
        .filing-drawer:hover .filing-drawer-body {
          animation: drawerOpen 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Projects;