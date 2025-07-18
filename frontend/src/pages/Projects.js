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
  const [openDrawer, setOpenDrawer] = useState(null);
  const [fileSlideOut, setFileSlideOut] = useState(null);

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

  // Staggered animation for filing cabinet drawers
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
    setOpenDrawer(null);
    setFileSlideOut(null);
  }, [selectedFilter, searchQuery]);

  // Handle drawer hover
  const handleDrawerHover = (project) => {
    setHoveredProject(project.id);
    setOpenDrawer(project.id);
    
    // Delay file slide out animation
    setTimeout(() => {
      setFileSlideOut(project.id);
    }, 300);
  };

  // Handle drawer leave
  const handleDrawerLeave = () => {
    setHoveredProject(null);
    setFileSlideOut(null);
    
    // Delay drawer close
    setTimeout(() => {
      setOpenDrawer(null);
    }, 200);
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.filing-drawer')) {
        setOpenDrawer(null);
        setFileSlideOut(null);
        setHoveredProject(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const FilingDrawer = ({ project, index }) => {
    const isVisible = visibleProjects.includes(project.id);
    const isOpen = openDrawer === project.id;
    const isFileOut = fileSlideOut === project.id;

    return (
      <div 
        className={`filing-drawer relative transition-all duration-500 cursor-pointer ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
        style={{
          transitionDelay: `${index * 50}ms`
        }}
        onMouseEnter={() => handleDrawerHover(project)}
        onMouseLeave={handleDrawerLeave}
      >
        {/* Filing Cabinet Drawer */}
        <div className="relative">
          {/* Drawer Body */}
          <div className={`filing-drawer-body bg-gradient-to-r from-amber-800 to-amber-900 border-2 border-amber-700 rounded-lg shadow-2xl transition-all duration-300 ${
            isOpen ? 'transform translate-x-4' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #654321 50%, #8B4513 100%)',
            boxShadow: isOpen ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
            
            {/* Wood Grain Texture */}
            <div className="absolute inset-0 opacity-20 rounded-lg"
                 style={{
                   background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.3) 2px, rgba(139,69,19,0.3) 4px)'
                 }}></div>
            
            {/* Drawer Face */}
            <div className="relative p-6 h-24 flex items-center justify-between">
              {/* Drawer Label */}
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded px-3 py-1 shadow-inner">
                  <div className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                    {project.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    Project #{project.id.toString().padStart(3, '0')}
                  </div>
                </div>
                
                {project.featured && (
                  <Badge className="bg-yellow-500 text-black font-bold shadow-md">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              {/* Drawer Handle */}
              <div className="flex items-center space-x-2">
                <div className="w-12 h-6 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-inner border border-gray-400 flex items-center justify-center">
                  <div className="w-8 h-4 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full shadow-md"></div>
                </div>
                <FolderOpen className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            
            {/* Drawer Interior Shadow */}
            <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none"
                 style={{
                   boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.1)'
                 }}></div>
          </div>
          
          {/* File Document */}
          <div className={`absolute top-2 left-0 w-full transition-all duration-500 ${
            isFileOut ? 'transform translate-x-80' : 'transform translate-x-0'
          }`}
               style={{
                 zIndex: isFileOut ? 20 : 10
               }}>
            <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-300 p-6 max-w-md ml-20"
                 style={{
                   background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                   boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)'
                 }}>
              
              {/* File Header */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-800">{project.title}</h3>
                    <p className="text-xs text-gray-500">Project Documentation</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">ID: {project.id.toString().padStart(3, '0')}</div>
                  <div className="text-xs text-gray-500">Status: Active</div>
                </div>
              </div>
              
              {/* Project Image */}
              <div className="mb-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-32 object-cover rounded border shadow-sm"
                />
              </div>
              
              {/* Project Description */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Technologies */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
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
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demo, '_blank');
                  }}
                >
                  <Play className="w-4 h-4 mr-1" />
                  View Demo
                </Button>
                
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, '_blank');
                  }}
                >
                  <Code className="w-4 h-4 mr-1" />
                  Source Code
                </Button>
              </div>
              
              {/* File Corner Fold */}
              <div className="absolute top-0 right-0 w-6 h-6 bg-gray-100 border-l border-b border-gray-300"
                   style={{
                     clipPath: 'polygon(0 0, 100% 0, 0 100%)'
                   }}></div>
            </div>
          </div>
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
        .filing-drawer-body {
          position: relative;
          min-height: 96px;
          background: linear-gradient(135deg, #8B4513 0%, #654321 30%, #8B4513 60%, #654321 100%);
          border: 2px solid #6B4423;
          box-shadow: 
            0 4px 16px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.1);
        }
        
        .filing-drawer-body::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 4px,
            rgba(139,69,19,0.3) 4px,
            rgba(139,69,19,0.3) 6px
          );
          border-radius: 0.5rem;
          opacity: 0.4;
        }
        
        .filing-drawer:hover .filing-drawer-body {
          transform: translateX(16px);
          box-shadow: 
            0 8px 32px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.1);
        }
        
        .filing-drawer-body:hover {
          background: linear-gradient(135deg, #A0522D 0%, #6B4423 30%, #A0522D 60%, #6B4423 100%);
        }
        
        @keyframes drawerSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(16px); }
        }
        
        @keyframes fileSlideOut {
          0% { transform: translateX(0); opacity: 0.8; }
          100% { transform: translateX(320px); opacity: 1; }
        }
        
        .filing-drawer-body {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default Projects;