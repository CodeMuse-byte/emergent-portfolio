import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  ExternalLink,
  Github,
  Star,
  Calendar,
  Users,
  Trophy,
  Play,
  Code,
  ArrowLeft,
  Filter,
  Search,
  Gamepad2,
  Skull
} from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [gamePhase, setGamePhase] = useState('lobby'); // 'lobby', 'insertCoin', 'gameStart', 'gameView'
  const [gameEnding, setGameEnding] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with user authentication, payment processing, and admin dashboard. Built with React, Node.js, and PostgreSQL.",
      longDescription: "This comprehensive e-commerce solution features a modern React frontend with Redux state management, secure user authentication with JWT tokens, Stripe payment integration, real-time inventory management, order tracking system, and a powerful admin dashboard for managing products, orders, and analytics. The backend is built with Node.js and Express, utilizing PostgreSQL for data persistence and Redis for session management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      status: "Completed",
      year: "2023",
      category: "Web Development",
      featured: true,
      score: "9.2K",
      genre: "Business App"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and progress tracking.",
      longDescription: "A powerful project management tool that enables teams to collaborate effectively with features like real-time task updates via WebSocket connections, drag-and-drop task organization, time tracking, file attachments, team chat integration, customizable workflows, and comprehensive reporting dashboards. Built with modern web technologies for optimal performance and user experience.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskmanager-demo.netlify.app",
      status: "Completed", 
      year: "2023",
      category: "Web Development",
      featured: false,
      score: "7.8K",
      genre: "Productivity"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects, skills, and professional experience with interactive animations.",
      longDescription: "An elegant and fully responsive portfolio website featuring smooth animations powered by Framer Motion, interactive project showcases, skill visualization with progress indicators, contact form integration with EmailJS, SEO optimization, and a custom CMS for easy content updates. The design focuses on clean aesthetics while maintaining excellent performance across all devices.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio-demo.vercel.app",
      status: "Completed",
      year: "2024",
      category: "Web Development",
      featured: true,
      score: "8.5K",
      genre: "Portfolio"
    },
    {
      id: 4,
      title: "Chat Application",
      description: "Real-time messaging application with group chats, file sharing, and end-to-end encryption features.",
      longDescription: "A secure real-time messaging platform with end-to-end encryption, group chat functionality, file and media sharing, message reactions, typing indicators, online status tracking, push notifications, and message search capabilities. Built with Socket.io for real-time communication and implementing modern security practices for user privacy.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=250&fit=crop",
      technologies: ["Vue.js", "Socket.io", "MongoDB", "Express"],
      githubUrl: "https://github.com/username/chat-app",
      liveUrl: "https://chat-demo.herokuapp.com",
      status: "In Progress",
      year: "2024",
      category: "Web Development",
      featured: false,
      score: "6.3K",
      genre: "Social App"
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts, historical data, and customizable widgets.",
      longDescription: "A comprehensive weather monitoring dashboard that provides current conditions, 7-day forecasts, weather maps with radar overlays, historical weather data analysis, severe weather alerts, customizable dashboard widgets, and location-based recommendations. Integrates with multiple weather APIs for accurate and reliable data presentation.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
      technologies: ["Angular", "D3.js", "Weather API", "Chart.js"],
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "https://weather-dashboard-demo.surge.sh",
      status: "Completed",
      year: "2023",
      category: "Data Visualization",
      featured: true,
      score: "9.7K",
      genre: "Utility App"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile fitness application for tracking workouts, nutrition, and health metrics with social features.",
      longDescription: "A comprehensive fitness tracking mobile application featuring workout logging with exercise libraries, nutrition tracking with barcode scanning, progress visualization with charts and graphs, social sharing capabilities, achievement systems, personal trainer integration, and wearable device synchronization. Designed with user motivation and long-term engagement in mind.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
      githubUrl: "https://github.com/username/fitness-tracker",
      liveUrl: "https://fitness-app-demo.expo.dev",
      status: "In Progress",
      year: "2024",
      category: "Mobile Development",
      featured: false,
      score: "5.9K",
      genre: "Health App"
    }
  ];

  const categories = ['All', 'Web Development', 'Mobile Development', 'Data Visualization'];
  const techFilters = ['React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'TypeScript'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'All' || 
                         project.category === selectedFilter ||
                         (selectedFilter === 'Featured' && project.featured) ||
                         project.technologies.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Sound effect placeholders
  const playArcadeJingle = () => console.log('🎵 Arcade jingle sound');
  const playCoinInsertSound = () => console.log('🪙 Coin insert sound');
  const playGameStartSound = () => console.log('🎮 Game start sound');
  const playGameOverSound = () => console.log('💀 Game over sound');

  const handleProjectClick = (project) => {
    if (gamePhase !== 'lobby' || gameEnding) return;
    
    setSelectedProject(project);
    setGamePhase('insertCoin');
    playCoinInsertSound();
    
    setTimeout(() => {
      setGamePhase('gameStart');
      playGameStartSound();
      setTimeout(() => {
        setGamePhase('gameView');
      }, 1500);
    }, 2000);
  };

  const handleBackToLobby = () => {
    if (gameEnding) return;
    
    setGameEnding(true);
    setShowGameOver(true);
    playGameOverSound();
    
    setTimeout(() => {
      setGamePhase('lobby');
      setSelectedProject(null);
      setGameEnding(false);
      setShowGameOver(false);
    }, 3000);
  };

  const resetToLobby = () => {
    setGamePhase('lobby');
    setSelectedProject(null);
    setGameEnding(false);
    setShowGameOver(false);
  };

  const ArcadeMachine = ({ project, index }) => (
    <div 
      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
      onClick={() => handleProjectClick(project)}
      onMouseEnter={playArcadeJingle}
    >
      {/* 3D Arcade Machine Frame */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700 hover:border-purple-500 transition-all duration-500 hover:shadow-purple-500/30 hover:shadow-2xl preserve-3d perspective-1000">
        
        {/* Screen with 3D effects */}
        <div className="relative aspect-video bg-black border-4 border-gray-600 overflow-hidden group-hover:border-cyan-400 transition-all duration-500 transform-gpu group-hover:rotateY-5 group-hover:translateZ-10">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:saturate-125 group-hover:scale-105 group-hover:rotate-1"
          />
          {/* Arcade screen scanlines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent opacity-30 animate-pulse"></div>
          {/* Pixelated overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 group-hover:opacity-70 transition-all duration-500"></div>
        </div>

        {/* Arcade Machine Details */}
        <div className="p-6 space-y-4">
          {/* Game Title */}
          <div className="text-center text-white transform transition-all duration-500">
            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 tracking-wide">{project.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-2 group-hover:text-white">{project.description}</p>
          </div>

          {/* Power-ups (Technologies) */}
          <div className="flex flex-wrap gap-1 justify-center">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 py-1 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full border border-purple-400 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:scale-110"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-600 text-gray-300 rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Arcade Buttons */}
          <div className="flex justify-center gap-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-red-400 to-red-600 border-2 border-red-700 shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 transform-gpu hover:translateZ-5"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 border-2 border-yellow-700 shadow-lg hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110 delay-75 transform-gpu hover:translateZ-5"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-green-400 to-green-600 border-2 border-green-700 shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 delay-150 transform-gpu hover:translateZ-5"></div>
          </div>

          {/* Featured Badge with 3D effect */}
          {project.featured && (
            <div className="absolute top-4 right-4 transform rotate-12 hover:rotate-0 transition-all duration-500 translate-z-20">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-3 py-1 font-bold shadow-lg hover:shadow-yellow-500/50 hover:scale-110 transition-all duration-300">
                ⭐ HIGH SCORE
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (gamePhase !== 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
        {/* Enhanced 3D Background Effects */}
        <div className="absolute inset-0 perspective-1000">
          {/* 3D Grid Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-indigo-900/50 to-transparent transform rotate-x-75 origin-bottom" 
               style={{ backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          
          {/* Floating Neon Particles with 6 different animations */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-sm animate-float-${(i % 6) + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translateZ(${Math.random() * 100}px) rotateY(${Math.random() * 360}deg)`
              }}
            ></div>
          ))}
          
          {/* Horizontal Neon Lines */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"
              style={{
                top: `${20 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.3
              }}
            ></div>
          ))}
        </div>

        {/* Game Phase Overlays */}
        {gamePhase === 'insertCoin' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 animate-fadeIn">
            <div className="text-center text-white animate-pulse">
              <div className="text-8xl mb-4 animate-bounce">🪙</div>
              <div className="text-4xl font-bold text-cyan-400 mb-4 tracking-wider animate-pulse">INSERT COIN</div>
              <div className="text-2xl text-gray-300 animate-pulse">PRESS START</div>
            </div>
          </div>
        )}

        {gamePhase === 'gameStart' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 animate-fadeIn">
            <div className="text-center text-white">
              <div className="text-6xl font-bold text-green-400 mb-4 animate-pulse tracking-wider">GAME START!</div>
              <div className="text-2xl text-gray-300 animate-bounce">Loading...</div>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {showGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-900/90 z-50 animate-fadeIn">
            <div className="text-center text-white">
              <div className="text-8xl mb-4 animate-bounce">💀</div>
              <div className="text-6xl font-bold text-red-400 mb-4 tracking-wider animate-pulse">GAME OVER</div>
              <div className="text-2xl text-gray-300 animate-pulse">RETURNING TO ARCADE...</div>
            </div>
          </div>
        )}

        {/* Game Details View with enhanced 3D effects */}
        {gamePhase === 'gameView' && selectedProject && !showGameOver && (
          <div className="relative z-40 min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
              
              {/* Enhanced Game Header with 3D depth */}
              <div className="text-center mb-12 animate-blockBuildUp transform-gpu preserve-3d">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#f5f3fc] via-[#d2cdb9] to-[#92a378] bg-clip-text text-transparent mb-4 tracking-wider animate-pulse drop-shadow-2xl" 
                    style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.8), 0 4px 8px rgba(0,0,0,0.8)' }}>
                  {selectedProject.title.toUpperCase()}
                </h1>
                <div className="text-2xl text-cyan-300 animate-pulse tracking-wide drop-shadow-lg">{selectedProject.genre} • {selectedProject.year}</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Enhanced Game Stats Panel with 3D effects */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 shadow-2xl animate-blockBuildUp hover:shadow-purple-500/50 transition-all duration-700 transform-gpu hover:scale-105 hover:translateZ-10" 
                       style={{ animationDelay: '0.2s', boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4 tracking-wide drop-shadow-lg">GAME STATS</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">GENRE:</span>
                        <span className="text-white font-bold bg-purple-600/30 px-3 py-1 rounded-full border border-purple-400/50">{selectedProject.genre}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">YEAR:</span>
                        <span className="text-white font-bold">{selectedProject.year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">SCORE:</span>
                        <span className="text-yellow-400 font-bold text-xl drop-shadow-glow">{selectedProject.score}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">STATUS:</span>
                        <span className={`font-bold px-3 py-1 rounded-full border ${
                          selectedProject.status === 'Completed' 
                            ? 'text-green-300 bg-green-600/30 border-green-400/50' 
                            : 'text-yellow-300 bg-yellow-600/30 border-yellow-400/50'
                        }`}>
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons with 3D depth */}
                  <div className="space-y-4 animate-blockBuildUp" style={{ animationDelay: '0.8s' }}>
                    <button 
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                      disabled={gameEnding}
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed border border-green-400/50 transform-gpu hover:translateZ-10" 
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                    >
                      <Play className="w-5 h-5 inline mr-2" />
                      PLAY GAME
                    </button>
                    
                    <button 
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                      disabled={gameEnding}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/50 transform-gpu hover:translateZ-10" 
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                    >
                      <Code className="w-5 h-5 inline mr-2" />
                      VIEW CODE
                    </button>
                    
                    <button 
                      onClick={handleBackToLobby}
                      disabled={gameEnding}
                      className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed border border-red-400/50 transform-gpu hover:translateZ-10 hover:rotate-1" 
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)', boxShadow: '0 10px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}
                    >
                      <ArrowLeft className="w-5 h-5 inline mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                      BACK TO ARCADE
                    </button>
                  </div>
                </div>

                {/* Enhanced Game View Section with 3D perspective */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Game Image with 3D hover effects */}
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl animate-blockBuildUp border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-700 transform-gpu hover:scale-105 hover:rotateY-2 preserve-3d" 
                       style={{ animationDelay: '0.4s', boxShadow: '0 25px 50px rgba(0,0,0,0.8)' }}>
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full aspect-video object-cover hover:scale-110 transition-all duration-700 hover:brightness-110"
                    />
                  </div>

                  {/* Enhanced Game Description with 3D text effects */}
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl animate-blockBuildUp border border-purple-500/30 hover:border-purple-400/50 transition-all duration-700 transform-gpu hover:scale-105 hover:translateZ-5" 
                       style={{ animationDelay: '0.6s', boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                    <h3 className="text-2xl font-bold text-purple-400 mb-4 tracking-wide drop-shadow-lg">GAME DESCRIPTION</h3>
                    <p className="text-gray-300 leading-relaxed text-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Enhanced Power-ups Section with 3D stacking */}
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl animate-blockBuildUp border border-green-500/30 hover:border-green-400/50 transition-all duration-700 transform-gpu hover:scale-105 hover:translateZ-5" 
                       style={{ animationDelay: '0.8s', boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
                    <h3 className="text-2xl font-bold text-green-400 mb-4 tracking-wide drop-shadow-lg">POWER-UPS COLLECTED</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-green-600/30 to-emerald-600/30 text-green-300 font-semibold rounded-full border border-green-400/50 hover:border-green-300 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30 animate-powerUpCollect transform-gpu hover:translateZ-10 hover:rotate-3" 
                          style={{ 
                            animationDelay: `${1 + (index * 0.1)}s`,
                            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">
      {/* Enhanced 3D Arcade Room Background */}
      <div className="absolute inset-0 perspective-1000">
        {/* Multi-layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black"></div>
        
        {/* 3D Grid Floor with perspective */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-indigo-900/50 to-transparent transform rotate-x-75 origin-bottom" 
             style={{ backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.2) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        
        {/* Floating Neon Particles with 6 different floating animations */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full blur-sm animate-float-${(i % 6) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateZ(${Math.random() * 100}px) rotateY(${Math.random() * 360}deg)`
            }}
          ></div>
        ))}
        
        {/* Horizontal Neon Lines with staggered pulse effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"
            style={{
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 text-center relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#1e1a2e] via-[#5c4f6e] to-[#b3A8C9] bg-clip-text text-transparent animate-pulse drop-shadow-2xl" 
              style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.8)' }}>
            My Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Welcome to my arcade! Each machine showcases a different project. Click on any machine to start playing and explore the details.
          </p>
        </section>

        {/* Enhanced Search and Filter Section */}
        <section className="py-8 bg-rose-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-rose-white border-2 border-gray-300 focus:border-purple-500 rounded-lg"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-500 w-5 h-5" />
                  <select 
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md bg-rose-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Games</option>
                    <option value="Featured">Featured</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                    {techFilters.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button 
                  onClick={() => setSelectedFilter('All')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedFilter === 'All' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                  }`}
                >
                  ALL GAMES
                </button>
                <button 
                  onClick={() => setSelectedFilter('Featured')}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedFilter === 'Featured' 
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-900 shadow-lg shadow-yellow-500/30' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                  }`}
                >
                  ⭐ HIGH SCORES
                </button>
                {techFilters.slice(0, 4).map(tech => (
                  <button 
                    key={tech}
                    onClick={() => setSelectedFilter(tech)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                      selectedFilter === tech 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30' 
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Arcade Lobby */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Results Counter */}
              <div className="text-center mb-12">
                <p className="text-2xl text-cyan-400 font-bold tracking-wide drop-shadow-lg">
                  🎮 {filteredProjects.length} Games Available
                </p>
              </div>

              {/* Enhanced Arcade Machines Grid with 3D perspective */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className="transform-gpu preserve-3d">
                    <ArcadeMachine project={project} index={index} />
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {filteredProjects.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6 opacity-50">🎮</div>
                  <h3 className="text-3xl font-bold text-gray-400 mb-4">No Games Found</h3>
                  <p className="text-xl text-gray-500 mb-8">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedFilter('All'); }}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Projects;