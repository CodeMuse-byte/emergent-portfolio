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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Simple Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
              My Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A collection of my work showcasing various technologies and creative solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simple Stats */}
      {filteredProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{filteredProjects.length}</div>
                  <div className="text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{projects.filter(p => p.featured).length}</div>
                  <div className="text-gray-600">Featured</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{allTechnologies.length}</div>
                  <div className="text-gray-600">Technologies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                  <div className="text-gray-600">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Simple CSS for 3D effects */}
      <style jsx>{`
        .project-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .project-card:hover .transform-gpu {
          transform: rotateX(5deg) rotateY(5deg) translateZ(20px);
        }
        
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .project-card:hover {
          animation: cardFloat 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Projects;