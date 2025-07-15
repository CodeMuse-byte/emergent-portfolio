import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, Sphere, useTexture } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import AnimatedBackground from '../components/AnimatedBackground';
import { skills } from '../data/mockData';
import { 
  Code, 
  Server, 
  Settings, 
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import * as THREE from 'three';

const Skills = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [stoppedBalls, setStoppedBalls] = useState(new Set());
  
  // Reorganize skills into football positions with better spread
  const footballFormation = {
    goalkeeper: {
      position: "Goalkeeper",
      skills: [
        { 
          name: "Problem Solving", 
          level: 95, 
          icon: "🥅", 
          description: "Last line of defense against bugs",
          position: [0, 0, 3],
          color: "#FFD700"
        },
      ]
    },
    defenders: {
      position: "Defenders", 
      skills: [
        { 
          name: "Git", 
          level: 90, 
          icon: "🛡️", 
          description: "Version control specialist",
          position: [-4, 0, 1.5],
          color: "#FF6B6B"
        },
        { 
          name: "Jest", 
          level: 80, 
          icon: "⚔️", 
          description: "Testing warrior",
          position: [-1.5, 0, 1.5],
          color: "#4ECDC4"
        },
        { 
          name: "Docker", 
          level: 75, 
          icon: "🏰", 
          description: "Container fortress builder",
          position: [1.5, 0, 1.5],
          color: "#45B7D1"
        },
        { 
          name: "Linux", 
          level: 85, 
          icon: "🛡️", 
          description: "System security expert",
          position: [4, 0, 1.5],
          color: "#96CEB4"
        }
      ]
    },
    midfielders: {
      position: "Midfielders",
      skills: [
        { 
          name: "JavaScript", 
          level: 95, 
          icon: "⚡", 
          description: "Core playmaker",
          position: [-3, 0, 0],
          color: "#F7DC6F"
        },
        { 
          name: "React", 
          level: 90, 
          icon: "⚛️", 
          description: "Frontend orchestrator",
          position: [0, 0, 0],
          color: "#61DAFB"
        },
        { 
          name: "Node.js", 
          level: 85, 
          icon: "🟢", 
          description: "Backend conductor",
          position: [3, 0, 0],
          color: "#68A063"
        },
        { 
          name: "TypeScript", 
          level: 85, 
          icon: "🔷", 
          description: "Type safety midfielder",
          position: [-1.5, 0, -0.8],
          color: "#3178C6"
        },
        { 
          name: "Python", 
          level: 80, 
          icon: "🐍", 
          description: "Versatile midfielder",
          position: [1.5, 0, -0.8],
          color: "#3776AB"
        }
      ]
    },
    forwards: {
      position: "Forwards",
      skills: [
        { 
          name: "Next.js", 
          level: 80, 
          icon: "▲", 
          description: "Goal scorer",
          position: [-2, 0, -2.5],
          color: "#000000"
        },
        { 
          name: "FastAPI", 
          level: 75, 
          icon: "⚡", 
          description: "Speed striker",
          position: [0, 0, -2.5],
          color: "#009688"
        },
        { 
          name: "MongoDB", 
          level: 85, 
          icon: "🍃", 
          description: "Database finisher",
          position: [2, 0, -2.5],
          color: "#47A248"
        }
      ]
    }
  };

  // 3D Football Component with Proper Soccer Ball Texture
  const SoccerBallFootball = ({ skill, position, isSelected, isHovered, onClick }) => {
    const meshRef = useRef();
    const [isStopped, setIsStopped] = useState(false);
    
    // Create proper soccer ball texture with pentagons and hexagons
    const createProperFootballTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // White background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 512, 512);
      
      // Draw proper soccer ball pattern with pentagons and hexagons
      const centerX = 256;
      const centerY = 256;
      
      // Draw black pentagons
      const pentagons = [
        { x: centerX, y: centerY - 80 },
        { x: centerX - 60, y: centerY - 30 },
        { x: centerX + 60, y: centerY - 30 },
        { x: centerX - 40, y: centerY + 40 },
        { x: centerX + 40, y: centerY + 40 },
        { x: centerX, y: centerY + 80 }
      ];
      
      pentagons.forEach(pentagon => {
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = pentagon.x + Math.cos(angle) * 25;
          const y = pentagon.y + Math.sin(angle) * 25;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
      });
      
      // Draw connecting lines between pentagons
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      
      // Curved lines connecting pentagons
      const connections = [
        [pentagons[0], pentagons[1]],
        [pentagons[0], pentagons[2]],
        [pentagons[1], pentagons[3]],
        [pentagons[2], pentagons[4]],
        [pentagons[3], pentagons[5]],
        [pentagons[4], pentagons[5]]
      ];
      
      connections.forEach(([start, end]) => {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        
        // Create curved line
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const controlX = midX + (Math.random() - 0.5) * 20;
        const controlY = midY + (Math.random() - 0.5) * 20;
        
        ctx.quadraticCurveTo(controlX, controlY, end.x, end.y);
        ctx.stroke();
      });
      
      return new THREE.CanvasTexture(canvas);
    };

    const footballTexture = createProperFootballTexture();

    // Handle click to stop/start rotation
    const handleClick = (e) => {
      e.stopPropagation();
      setIsStopped(!isStopped);
      setStoppedBalls(prev => {
        const newSet = new Set(prev);
        if (isStopped) {
          newSet.delete(skill.name);
        } else {
          newSet.add(skill.name);
        }
        return newSet;
      });
      onClick();
    };

    // Animation loop - only rotate if not stopped
    useFrame((state, delta) => {
      if (meshRef.current && !isStopped) {
        meshRef.current.rotation.x += delta * 0.4;
        meshRef.current.rotation.y += delta * 0.3;
        meshRef.current.rotation.z += delta * 0.2;
        
        // Add subtle floating animation
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
      }
    });

    return (
      <group>
        {/* Soccer Ball Football */}
        <Sphere
          ref={meshRef}
          args={[0.8, 32, 32]}  // Increased size even more for better visibility
          position={position}
          onClick={handleClick}
          onPointerOver={() => setHoveredSkill(skill.name)}
          onPointerOut={() => setHoveredSkill(null)}
          scale={isHovered ? 1.1 : 1}
        >
          <meshLambertMaterial 
            map={footballTexture}
            color={skill.color}
            emissive={isSelected ? skill.color : isStopped ? "#333333" : "#000000"} 
            emissiveIntensity={isSelected ? 0.2 : isStopped ? 0.1 : 0}
          />
        </Sphere>

        {/* Skill Label */}
        <Text
          position={[position[0], position[1] + 1.2, position[2]]}
          fontSize={0.3}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#ffffff"
          font="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
        >
          {skill.name}
        </Text>

        {/* Skill Level Indicator */}
        <Text
          position={[position[0], position[1] - 1.2, position[2]]}
          fontSize={0.2}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#ffffff"
        >
          {skill.level}%
        </Text>

        {/* Stop indicator */}
        {isStopped && (
          <Text
            position={[position[0], position[1] - 1.6, position[2]]}
            fontSize={0.15}
            color="#FF0000"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#ffffff"
          >
            STOPPED
          </Text>
        )}
      </group>
    );
  };

  // White Net Background
  const WhiteNet = () => {
    const createNetTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      // White background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 512, 512);
      
      // Draw net pattern
      ctx.strokeStyle = '#DDDDDD';
      ctx.lineWidth = 2;
      
      const gridSize = 25;
      
      // Vertical lines
      for (let x = 0; x <= 512; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= 512; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    const netTexture = createNetTexture();
    netTexture.wrapS = THREE.RepeatWrapping;
    netTexture.wrapT = THREE.RepeatWrapping;
    netTexture.repeat.set(6, 6);

    return (
      <group>
        {/* Main Net Background */}
        <Plane args={[25, 25]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <meshLambertMaterial map={netTexture} />
        </Plane>

        {/* Net Border */}
        <group>
          {/* Top border */}
          <Box args={[25, 0.1, 0.1]} position={[0, -0.4, 12.5]}>
            <meshBasicMaterial color="#CCCCCC" />
          </Box>
          {/* Bottom border */}
          <Box args={[25, 0.1, 0.1]} position={[0, -0.4, -12.5]}>
            <meshBasicMaterial color="#CCCCCC" />
          </Box>
          {/* Left border */}
          <Box args={[0.1, 0.1, 25]} position={[-12.5, -0.4, 0]}>
            <meshBasicMaterial color="#CCCCCC" />
          </Box>
          {/* Right border */}
          <Box args={[0.1, 0.1, 25]} position={[12.5, -0.4, 0]}>
            <meshBasicMaterial color="#CCCCCC" />
          </Box>
        </group>
      </group>
    );
  };

  // 3D Scene Component
  const SkillsScene = () => {
    const getAllSkills = () => {
      return Object.values(footballFormation).flatMap(position => position.skills);
    };

    const handleFootballClick = (skill) => {
      setSelectedPlayer(selectedPlayer === skill.name ? null : skill.name);
    };

    return (
      <Canvas camera={{ position: [0, 12, 8], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[0, 10, 0]} intensity={1} />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={0.1} intensity={1.2} />

        <WhiteNet />

        {getAllSkills().map((skill) => (
          <SoccerBallFootball
            key={skill.name}
            skill={skill}
            position={skill.position}
            isSelected={selectedPlayer === skill.name}
            isHovered={hoveredSkill === skill.name}
            onClick={() => handleFootballClick(skill)}
          />
        ))}

        {/* Removed OrbitControls completely - no drag, no zoom */}
      </Canvas>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
              <Trophy className="w-4 h-4 mr-2" />
              3D Football Skills Net
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              My Tech Arsenal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Welcome to my 3D football skills net! Each colorful football represents a technology in my arsenal. Click on any football to stop its rotation and see details.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* 3D Skills Football Net */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Interactive 3D Football Skills Net
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Click on any colorful football to stop its rotation and see detailed information! Each football spins continuously on the white net until you touch it.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>⚽ Click footballs to stop/start rotation</span>
                <span>📋 Click again to see skill details</span>
                <span>🎯 Simple static view - no zooming or dragging</span>
              </div>
            </div>
            
            {/* 3D Canvas Container */}
            <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-200" style={{ height: '700px' }}>
              <SkillsScene />
            </div>
          </div>
        </div>
      </section>

      {/* Player Details */}
      {selectedPlayer && (
        <section className="py-20 bg-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {Object.values(footballFormation).map(position => 
                position.skills.map(skill => {
                  if (skill.name === selectedPlayer) {
                    return (
                      <Card key={skill.name} className="hover:shadow-lg transition-shadow border-2 border-primary/20">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                              style={{ backgroundColor: skill.color }}
                            >
                              ⚽
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold">{skill.name}</h3>
                              <p className="text-muted-foreground">{skill.description}</p>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Skill Level</span>
                                <span className="text-sm font-bold">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-3" />
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-5 h-5 ${i < skill.level / 20 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <Badge variant="outline" className="text-sm">
                                {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Intermediate'}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                  return null;
                })
              )}
            </div>
          </div>
        </section>
      )}

      {/* Net Stats */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Football Net Statistics
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Overview of the colorful footballs spinning on my 3D skills net
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">15+</h3>
                  <p className="text-muted-foreground">Footballs on Net</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">87%</h3>
                  <p className="text-muted-foreground">Average Skill Level</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">3D</h3>
                  <p className="text-muted-foreground">Simple View</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              How to Interact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="font-semibold">Click to Stop/Start</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Click on any spinning football to stop its rotation. Click again to restart the spinning animation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-semibold">Simple Static View</h3>
                  </div>
                  <p className="text-muted-foreground">
                    No zooming or dragging - just a clear, simple view of all your skills. Click footballs to see detailed information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;