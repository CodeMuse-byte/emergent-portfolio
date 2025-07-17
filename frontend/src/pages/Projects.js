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
  Gamepad2,
  Zap,
  Trophy,
  Play
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
    { value: 'all', label: 'All Games' },
    { value: 'featured', label: 'Featured' },
    ...allTechnologies.map(tech => ({ value: tech, label: tech }))
  ];

  // Pixelated pop-in animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      filteredProjects.forEach((project, index) => {
        setTimeout(() => {
          setVisibleProjects(prev => [...prev, project.id]);
        }, index * 150);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [filteredProjects]);

  // Reset visible projects when filter changes
  useEffect(() => {
    setVisibleProjects([]);
  }, [selectedFilter, searchQuery]);

  // Play arcade jingle sound (placeholder - in real implementation you'd add actual sound)
  const playArcadeJingle = () => {
    // Placeholder for sound effect
    console.log('🎵 Arcade jingle playing...');
  };

  const ArcadeMachine = ({ project, index }) => {
    const isVisible = visibleProjects.includes(project.id);
    const isHovered = hoveredProject === project.id;

    return (
      <div 
        className={`arcade-machine relative transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          filter: isVisible ? 'none' : 'blur(4px)',
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
        }}
        onMouseEnter={() => {
          setHoveredProject(project.id);
          playArcadeJingle();
        }}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* Arcade Machine Frame */}
        <div className={`bg-gradient-to-b from-gray-600 to-gray-800 p-2 rounded-lg border-2 border-gray-500 shadow-2xl transform transition-all duration-300 ${
          isHovered ? 'scale-105 shadow-purple-500/50' : ''
        }`}>
          
          {/* Screen */}
          <div className={`relative bg-black rounded border-2 border-gray-400 p-4 mb-3 transition-all duration-300 ${
            isHovered ? 'border-cyan-400 shadow-lg shadow-cyan-400/50' : ''
          }`}>
            
            {/* Screen Glow Effect */}
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded animate-pulse"></div>
            )}
            
            {/* Project Image/Preview */}
            <div className="relative h-48 overflow-hidden rounded mb-4">
              <img 
                src={project.image} 
                alt={project.title}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isHovered ? 'brightness-125 saturate-150' : 'brightness-75'
                }`}
                style={{
                  filter: isHovered ? 'hue-rotate(10deg) contrast(1.2)' : 'contrast(0.8)',
                  imageRendering: 'pixelated'
                }}
              />
              
              {/* Pixelated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-yellow-500 text-black font-bold pixel-font animate-pulse">
                    <Star className="w-3 h-3 mr-1" />
                    HIGH SCORE
                  </Badge>
                </div>
              )}
              
              {/* Screen Scanlines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)'
                }}
              ></div>
            </div>
            
            {/* Game Info Display */}
            <div className="text-center">
              <div className={`text-cyan-400 font-mono text-sm mb-2 ${isHovered ? 'animate-pulse' : ''}`}>
                GAME #{project.id.toString().padStart(3, '0')}
              </div>
              
              {/* Technology Tags as Power-ups */}
              <div className="flex flex-wrap gap-1 mb-3 justify-center">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold pixel-font border border-green-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Control Panel */}
          <div className="bg-gray-700 p-3 rounded border border-gray-500">
            {/* Flashing Title */}
            <h3 className={`text-white font-bold text-center mb-2 pixel-font ${
              isHovered ? 'animate-pulse text-yellow-400' : ''
            }`}>
              {project.title.toUpperCase()}
            </h3>
            
            {/* Arcade Buttons */}
            <div className="flex justify-center space-x-2 mb-3">
              <Button 
                size="sm" 
                variant="outline" 
                className={`arcade-button bg-red-600 border-red-400 hover:bg-red-500 text-white font-bold ${
                  isHovered ? 'animate-bounce' : ''
                }`}
                asChild
              >
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-1" />
                  PLAY
                </a>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className={`arcade-button bg-blue-600 border-blue-400 hover:bg-blue-500 text-white font-bold ${
                  isHovered ? 'animate-bounce' : ''
                }`}
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Code className="w-4 h-4 mr-1" />
                  CODE
                </a>
              </Button>
            </div>
            
            {/* Score Display */}
            <div className="text-center">
              <div className="text-green-400 font-mono text-xs">
                SCORE: {(project.id * 1000).toLocaleString()}
              </div>
            </div>
          </div>
          
          {/* Arcade Machine Base */}
          <div className="h-2 bg-gradient-to-r from-gray-700 to-gray-600 rounded-b border-t border-gray-500 mt-1"></div>
        </div>
        
        {/* Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg blur-lg -z-10 animate-pulse"></div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Arcade Room Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-purple-900/30"></div>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #ff00ff 0%, transparent 50%), radial-gradient(circle at 75% 75%, #00ffff 0%, transparent 50%)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Neon Header */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-bold bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-purple-500 text-purple-400 pixel-font">
                <Gamepad2 className="w-4 h-4 mr-2" />
                RETRO ARCADE
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 pixel-font text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
                GAME LOBBY
              </h1>
              
              <p className="text-lg md:text-xl text-cyan-300 max-w-2xl mx-auto leading-relaxed pixel-font">
                🕹️ WELCOME TO THE ARCADE! 🕹️<br/>
                Choose your game and start playing!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Arcade Controls */}
      <section className="relative z-10 py-8 bg-gray-900/50 backdrop-blur-sm border-y border-purple-500/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
                <Input
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black border-cyan-500 text-cyan-400 placeholder-cyan-600 pixel-font"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Filter className="w-4 h-4 text-cyan-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-cyan-500 rounded-md bg-black text-cyan-400 pixel-font focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Game Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('all')}
                className="pixel-font bg-purple-600 hover:bg-purple-500 border-purple-400"
              >
                <Trophy className="w-4 h-4 mr-1" />
                ALL GAMES ({projects.length})
              </Button>
              
              <Button
                variant={selectedFilter === 'featured' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter('featured')}
                className="pixel-font bg-yellow-600 hover:bg-yellow-500 border-yellow-400"
              >
                <Star className="w-4 h-4 mr-1" />
                HIGH SCORES ({projects.filter(p => p.featured).length})
              </Button>
              
              {allTechnologies.slice(0, 4).map(tech => (
                <Button
                  key={tech}
                  variant={selectedFilter === tech ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(tech)}
                  className="pixel-font bg-green-600 hover:bg-green-500 border-green-400"
                >
                  {tech}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Arcade Machines Grid */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 pixel-font">💀</div>
                <h3 className="text-2xl font-semibold mb-2 text-red-400 pixel-font">GAME OVER</h3>
                <p className="text-cyan-400 pixel-font">No games found! Try different search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ArcadeMachine key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
            
            {/* Arcade Stats */}
            {filteredProjects.length > 0 && (
              <div className="text-center mt-16">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-2xl font-bold mb-4 text-cyan-400 pixel-font">
                    🏆 ARCADE STATS 🏆
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 pixel-font">{filteredProjects.length}</div>
                      <div className="text-sm text-cyan-400 pixel-font">GAMES AVAILABLE</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 pixel-font">{projects.filter(p => p.featured).length}</div>
                      <div className="text-sm text-cyan-400 pixel-font">HIGH SCORES</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 pixel-font">{allTechnologies.length}</div>
                      <div className="text-sm text-cyan-400 pixel-font">POWER-UPS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-400 pixel-font">∞</div>
                      <div className="text-sm text-cyan-400 pixel-font">FUN LEVEL</div>
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
        .pixel-font {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          text-shadow: 0 0 10px currentColor;
        }
        
        .arcade-button {
          font-family: 'Courier New', monospace;
          font-weight: bold;
          text-shadow: 0 0 5px currentColor;
          box-shadow: 0 0 10px currentColor;
        }
        
        .arcade-machine {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
        
        @keyframes neon-glow {
          0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
          50% { text-shadow: 0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor; }
        }
        
        .animate-neon {
          animation: neon-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Projects;