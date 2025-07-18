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
    const isEven = index % 2 === 0;

    return (
      <div 
        className={`project-row relative transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          transitionDelay: `${index * 200}ms`
        }}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* Project Container */}
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 py-16 ${
          isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
        }`}>
          
          {/* Media Side - Image/Video */}
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              <div className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 ${
                isHovered ? 'scale-105 shadow-3xl' : 'scale-100'
              }`}>
                
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={`w-full h-64 lg:h-80 object-cover transition-all duration-500 ${
                    isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-100'
                  }`}
                />
                
                {/* Live Demo Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 flex items-center justify-center transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="text-center text-white transform transition-all duration-500">
                    <div className={`${isHovered ? 'scale-100 translate-y-0' : 'scale-75 translate-y-4'} transition-all duration-500`}>
                      <div className="text-6xl mb-4 animate-pulse">▶️</div>
                      <div className="text-2xl font-bold mb-2">Live Demo</div>
                      <div className="text-lg opacity-90">Click to view project</div>
                    </div>
                  </div>
                </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-black font-semibold shadow-lg">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                
                {/* Click to Demo */}
                <div 
                  className="absolute inset-0 cursor-pointer z-20"
                  onClick={() => window.open(project.demo, '_blank')}
                ></div>
              </div>
              
              {/* 3D Shadow Effect */}
              <div className={`absolute inset-0 bg-black/20 rounded-2xl transition-all duration-500 -z-10 ${
                isHovered ? 'translate-x-2 translate-y-2 blur-lg' : 'translate-x-0 translate-y-0 blur-sm'
              }`}></div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className={`transition-all duration-500 ${
              isHovered ? 'transform translate-y-0' : 'transform translate-y-0'
            }`}>
              
              {/* Project Title */}
              <h3 className={`text-3xl lg:text-4xl font-bold mb-4 transition-all duration-300 ${
                isHovered ? 'text-blue-600' : 'text-gray-800'
              }`}>
                {project.title}
              </h3>
              
              {/* Project Description */}
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`tech-tag px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isHovered 
                          ? 'bg-blue-100 text-blue-800 scale-105' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex items-center space-x-4">
                <Button 
                  size="lg"
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform ${
                    isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-lg'
                  }`}
                  onClick={() => window.open(project.demo, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
                
                {/* Project Number */}
                <div className={`text-6xl font-bold transition-all duration-300 ${
                  isHovered ? 'text-blue-200' : 'text-gray-200'
                }`}>
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider Line */}
        {index < filteredProjects.length - 1 && (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        )}
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

      {/* Projects List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-700">No Projects Found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="space-y-0">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fixed 3D Animation CSS */}
      <style jsx global>{`
        .project-card {
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: all 0.3s ease;
        }
        
        .project-card > div {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }
        
        .project-card:hover > div {
          transform: rotateX(10deg) rotateY(10deg) translateZ(20px);
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.15),
            0 10px 20px rgba(0,0,0,0.1),
            0 5px 10px rgba(0,0,0,0.05);
        }
        
        .project-card:hover {
          transform: translateY(-5px);
        }
        
        .project-card:hover img {
          transform: scale(1.05);
        }
        
        .project-card:hover h3 {
          color: #2563eb;
        }
        
        .project-card:hover .tech-tag {
          transform: scale(1.05);
          background-color: #3b82f6;
          color: white;
        }
        
        .project-card:hover button {
          transform: scale(1.05);
        }
        
        .project-card img {
          transition: transform 0.3s ease;
        }
        
        .project-card h3 {
          transition: color 0.3s ease;
        }
        
        .project-card .tech-tag {
          transition: all 0.3s ease;
        }
        
        .project-card button {
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Projects;