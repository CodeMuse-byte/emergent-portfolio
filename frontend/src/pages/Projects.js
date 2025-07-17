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
  Play,
  X,
  ArrowLeft,
  Monitor,
  Users,
  Clock
} from 'lucide-react';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [gameStarting, setGameStarting] = useState(false);
  const [showInsertCoin, setShowInsertCoin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [detailsAnimating, setDetailsAnimating] = useState(false);
  const [gameEnding, setGameEnding] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

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

  // Play arcade jingle sound (placeholder)
  const playArcadeJingle = () => {
    console.log('🎵 Arcade jingle playing...');
  };

  // Play game start sound
  const playGameStartSound = () => {
    console.log('🎮 GAME START SOUND! *BEEP BEEP BOOP*');
  };

  // Play game over sound
  const playGameOverSound = () => {
    console.log('💀 GAME OVER SOUND! *GAME OVER*');
  };

  // Handle project click - Start game sequence
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setGameStarting(true);
    setShowInsertCoin(true);
    
    // Play coin sound
    console.log('🪙 INSERT COIN SOUND!');
    
    // Show INSERT COIN message
    setTimeout(() => {
      setShowInsertCoin(false);
      setGameStarted(true);
      playGameStartSound();
      
      // Start details animation
      setTimeout(() => {
        setDetailsAnimating(true);
      }, 500);
    }, 2000);
  };

  // Close game view with reverse animation
  const closeGameView = () => {
    setGameEnding(true);
    setShowGameOver(true);
    
    // Play game over sound
    playGameOverSound();
    
    // Show GAME OVER message for 2 seconds
    setTimeout(() => {
      setShowGameOver(false);
      setDetailsAnimating(false);
      
      // Start reverse animation sequence
      setTimeout(() => {
        setGameStarted(false);
        setGameStarting(false);
        setSelectedProject(null);
        setGameEnding(false);
      }, 500);
    }, 2000);
  };

  const ArcadeMachine = ({ project, index }) => {
    const isVisible = visibleProjects.includes(project.id);
    const isHovered = hoveredProject === project.id;

    return (
      <div 
        className={`arcade-machine relative transition-all duration-300 cursor-pointer ${
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
        onClick={() => handleProjectClick(project)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demo, '_blank');
                }}
              >
                <Play className="w-4 h-4 mr-1" />
                PLAY
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                className={`arcade-button bg-blue-600 border-blue-400 hover:bg-blue-500 text-white font-bold ${
                  isHovered ? 'animate-bounce' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, '_blank');
                }}
              >
                <Code className="w-4 h-4 mr-1" />
                CODE
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

  const GameDetailsView = ({ project }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* INSERT COIN Overlay */}
        {showInsertCoin && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold pixel-font text-yellow-400 animate-pulse mb-4">
                🪙 INSERT COIN 🪙
              </div>
              <div className="text-2xl md:text-3xl font-bold pixel-font text-cyan-400 animate-bounce">
                PRESS START
              </div>
            </div>
          </div>
        )}

        {/* Game Started - Pixelated Transition */}
        {gameStarted && !detailsAnimating && !gameEnding && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-bold pixel-font text-green-400 animate-pulse mb-4">
                🎮 GAME START! 🎮
              </div>
              <div className="text-xl md:text-2xl font-bold pixel-font text-cyan-400">
                LOADING...
              </div>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {showGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-60">
            <div className="text-center">
              <div className="text-6xl md:text-8xl font-bold pixel-font text-red-400 animate-pulse mb-4">
                💀 GAME OVER 💀
              </div>
              <div className="text-2xl md:text-3xl font-bold pixel-font text-yellow-400 animate-bounce">
                RETURNING TO ARCADE...
              </div>
            </div>
          </div>
        )}

        {/* Game Details - Sprite Animation */}
        {detailsAnimating && !gameEnding && (
          <div className="absolute inset-0 overflow-y-auto bg-gradient-to-b from-black via-purple-900/20 to-black">
            {/* Close Button */}
            <Button
              onClick={closeGameView}
              className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-500 text-white pixel-font"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK TO ARCADE
            </Button>

            {/* Game Header */}
            <div className={`text-center py-12 ${gameEnding ? 'animate-fade-out' : 'animate-fade-in'}`}>
              <div className="text-5xl md:text-7xl font-bold pixel-font text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                {project.title.toUpperCase()}
              </div>
              <div className="text-xl text-cyan-400 pixel-font">
                GAME #{project.id.toString().padStart(3, '0')} - LEVEL {project.id}
              </div>
            </div>

            {/* Game Screen */}
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Main Game View */}
                <div className={`sprite-block bg-gray-900 p-6 rounded-lg border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 ${gameEnding ? 'fade-out' : ''}`}>
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover rounded border-2 border-gray-600"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div className="absolute inset-0 opacity-20 pointer-events-none rounded"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Game Info Panel */}
                <div className={`sprite-block bg-gray-900 p-6 rounded-lg border-2 border-purple-400 shadow-lg shadow-purple-400/50 ${gameEnding ? 'fade-out' : ''}`}>
                  <h3 className="text-2xl font-bold pixel-font text-purple-400 mb-4">
                    📊 GAME STATS
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-cyan-400 pixel-font">GENRE:</span>
                      <span className="text-white pixel-font">WEB APPLICATION</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-cyan-400 pixel-font">YEAR:</span>
                      <span className="text-white pixel-font">2024</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-cyan-400 pixel-font">SCORE:</span>
                      <span className="text-green-400 pixel-font">{(project.id * 1000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="text-cyan-400 pixel-font">STATUS:</span>
                      <span className="text-yellow-400 pixel-font">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Description */}
              <div className={`sprite-block bg-gray-900 p-6 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 mb-8 ${gameEnding ? 'fade-out' : ''}`}>
                <h3 className="text-2xl font-bold pixel-font text-green-400 mb-4">
                  🎯 GAME DESCRIPTION
                </h3>
                <p className="text-white pixel-font text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Power-ups (Technologies) */}
              <div className={`sprite-block bg-gray-900 p-6 rounded-lg border-2 border-yellow-400 shadow-lg shadow-yellow-400/50 mb-8 ${gameEnding ? 'fade-out' : ''}`}>
                <h3 className="text-2xl font-bold pixel-font text-yellow-400 mb-4">
                  ⚡ POWER-UPS COLLECTED
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {project.technologies.map((tech, index) => (
                    <div 
                      key={index}
                      className={`bg-gradient-to-r from-green-600 to-green-500 p-3 rounded border-2 border-green-400 text-center power-up-block ${gameEnding ? 'fade-out' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-white pixel-font font-bold">{tech}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`sprite-block text-center mb-12 ${gameEnding ? 'fade-out' : ''}`}>
                <div className="flex justify-center space-x-6">
                  <Button 
                    size="lg"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold pixel-font text-xl px-8 py-4"
                    onClick={() => window.open(project.demo, '_blank')}
                    disabled={gameEnding}
                  >
                    <Play className="w-6 h-6 mr-2" />
                    PLAY GAME
                  </Button>
                  
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold pixel-font text-xl px-8 py-4"
                    onClick={() => window.open(project.github, '_blank')}
                    disabled={gameEnding}
                  >
                    <Code className="w-6 h-6 mr-2" />
                    VIEW CODE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 3D Arcade Room Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 via-transparent to-cyan-900/20"></div>
        
        {/* 3D Grid Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden">
          <div className="absolute inset-0 perspective-1000">
            <div className="absolute inset-0 transform rotate-x-75 translate-z-0" 
                 style={{
                   background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.1) 50%, transparent 100%), linear-gradient(0deg, transparent 0%, rgba(255,0,255,0.1) 50%, transparent 100%)',
                   backgroundSize: '50px 50px',
                   transform: 'rotateX(75deg) translateZ(0)'
                 }}>
            </div>
          </div>
        </div>
        
        {/* Floating Neon Particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-float-1" style={{top: '20%', left: '10%'}}></div>
          <div className="absolute w-1 h-1 bg-pink-400 rounded-full animate-float-2" style={{top: '50%', left: '80%'}}></div>
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-float-3" style={{top: '70%', left: '15%'}}></div>
          <div className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-float-4" style={{top: '30%', left: '70%'}}></div>
          <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-float-5" style={{top: '60%', left: '40%'}}></div>
          <div className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float-6" style={{top: '80%', left: '90%'}}></div>
        </div>
        
        {/* 3D Neon Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
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
                Click on any game machine to start playing!
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

      {/* Game Details Modal */}
      {selectedProject && (
        <GameDetailsView project={selectedProject} />
      )}

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
        
        .sprite-block {
          animation: blockBuildUp 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px) scale(0.9);
        }
        
        .sprite-block.fade-out {
          animation: blockFadeOut 0.5s ease-out forwards;
        }
        
        .power-up-block {
          animation: powerUpCollect 0.3s ease-out forwards;
          opacity: 0;
          transform: scale(0.8);
        }
        
        .power-up-block.fade-out {
          animation: powerUpFadeOut 0.3s ease-out forwards;
        }
        
        @keyframes blockBuildUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes blockFadeOut {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
          }
        }
        
        @keyframes powerUpCollect {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes powerUpFadeOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            transform: scale(0.8);
          }
          100% {
            opacity: 0;
            transform: scale(0.6);
          }
        }
        
        @keyframes neon-glow {
          0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
          50% { text-shadow: 0 0 2px currentColor, 0 0 5px currentColor, 0 0 8px currentColor; }
        }
        
        .animate-neon {
          animation: neon-glow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-out {
          animation: fadeOut 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-30px); }
        }
      `}</style>
    </div>
  );
};

export default Projects;