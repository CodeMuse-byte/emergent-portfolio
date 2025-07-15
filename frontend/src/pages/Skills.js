import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, Sphere } from '@react-three/drei';
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
          position: [0, 1, 2],
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
          position: [-3, 1, 1],
          color: "#FF6B6B"
        },
        { 
          name: "Jest", 
          level: 80, 
          icon: "⚔️", 
          description: "Testing warrior",
          position: [-1, 1, 1],
          color: "#4ECDC4"
        },
        { 
          name: "Docker", 
          level: 75, 
          icon: "🏰", 
          description: "Container fortress builder",
          position: [1, 1, 1],
          color: "#45B7D1"
        },
        { 
          name: "Linux", 
          level: 85, 
          icon: "🛡️", 
          description: "System security expert",
          position: [3, 1, 1],
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
          position: [-2, 1, 0],
          color: "#F7DC6F"
        },
        { 
          name: "React", 
          level: 90, 
          icon: "⚛️", 
          description: "Frontend orchestrator",
          position: [0, 1, 0],
          color: "#61DAFB"
        },
        { 
          name: "Node.js", 
          level: 85, 
          icon: "🟢", 
          description: "Backend conductor",
          position: [2, 1, 0],
          color: "#68A063"
        },
        { 
          name: "TypeScript", 
          level: 85, 
          icon: "🔷", 
          description: "Type safety midfielder",
          position: [-1, 1, -0.5],
          color: "#3178C6"
        },
        { 
          name: "Python", 
          level: 80, 
          icon: "🐍", 
          description: "Versatile midfielder",
          position: [1, 1, -0.5],
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
          position: [-1.5, 1, -2],
          color: "#000000"
        },
        { 
          name: "FastAPI", 
          level: 75, 
          icon: "⚡", 
          description: "Speed striker",
          position: [0, 1, -2],
          color: "#009688"
        },
        { 
          name: "MongoDB", 
          level: 85, 
          icon: "🍃", 
          description: "Database finisher",
          position: [1.5, 1, -2],
          color: "#47A248"
        }
      ]
    }
  };

  // Simple 3D Football Component
  const SimpleFootball = ({ skill, position, isSelected, isHovered, onClick }) => {
    const meshRef = useRef();
    const [isStopped, setIsStopped] = useState(false);
    
    // Handle click to stop/start rotation
    const handleClick = (e) => {
      e.stopPropagation();
      setIsStopped(!isStopped);
      onClick();
    };

    // Animation loop - only rotate if not stopped
    useFrame((state, delta) => {
      if (meshRef.current && !isStopped) {
        meshRef.current.rotation.x += delta * 0.5;
        meshRef.current.rotation.y += delta * 0.3;
        meshRef.current.rotation.z += delta * 0.2;
      }
    });

    return (
      <group>
        {/* Simple Football Sphere */}
        <Sphere
          ref={meshRef}
          args={[0.5, 16, 16]}
          position={position}
          onClick={handleClick}
          onPointerOver={() => setHoveredSkill(skill.name)}
          onPointerOut={() => setHoveredSkill(null)}
          scale={isHovered ? 1.2 : 1}
        >
          <meshStandardMaterial 
            color={skill.color}
            metalness={0.1}
            roughness={0.4}
            emissive={isSelected ? skill.color : isStopped ? "#333333" : "#000000"} 
            emissiveIntensity={isSelected ? 0.3 : isStopped ? 0.1 : 0}
          />
        </Sphere>

        {/* Skill Name */}
        <Text
          position={[position[0], position[1] + 0.8, position[2]]}
          fontSize={0.2}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>

        {/* Skill Level */}
        <Text
          position={[position[0], position[1] - 0.8, position[2]]}
          fontSize={0.15}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>

        {/* Stop indicator */}
        {isStopped && (
          <Text
            position={[position[0], position[1] - 1.1, position[2]]}
            fontSize={0.12}
            color="#FF0000"
            anchorX="center"
            anchorY="middle"
          >
            STOPPED
          </Text>
        )}
      </group>
    );
  };

  // Simple Net Background
  const SimpleNet = () => {
    return (
      <group>
        {/* Ground Plane */}
        <Plane args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#ffffff" />
        </Plane>

        {/* Net Grid Lines */}
        {Array.from({ length: 13 }, (_, i) => (
          <Box key={`h-${i}`} args={[12, 0.02, 0.02]} position={[0, 0.01, -6 + i]}>
            <meshStandardMaterial color="#cccccc" />
          </Box>
        ))}
        
        {Array.from({ length: 13 }, (_, i) => (
          <Box key={`v-${i}`} args={[0.02, 0.02, 12]} position={[-6 + i, 0.01, 0]}>
            <meshStandardMaterial color="#cccccc" />
          </Box>
        ))}

        {/* Border */}
        <Box args={[12, 0.05, 0.05]} position={[0, 0.025, 6]}>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[12, 0.05, 0.05]} position={[0, 0.025, -6]}>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[0.05, 0.05, 12]} position={[6, 0.025, 0]}>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[0.05, 0.05, 12]} position={[-6, 0.025, 0]}>
          <meshStandardMaterial color="#666666" />
        </Box>
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
      <Canvas 
        camera={{ position: [0, 8, 6], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* Scene */}
        <SimpleNet />

        {getAllSkills().map((skill) => (
          <SimpleFootball
            key={skill.name}
            skill={skill}
            position={skill.position}
            isSelected={selectedPlayer === skill.name}
            isHovered={hoveredSkill === skill.name}
            onClick={() => handleFootballClick(skill)}
          />
        ))}

        {/* No controls - completely static */}
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
              Welcome to my 3D football skills net! Each colorful football represents a technology. Click on any football to stop its rotation and see details.
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
                Click on any colorful football to stop its rotation and see detailed information! Each football spins continuously on the white net.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <span>⚽ Click footballs to stop/start rotation</span>
                <span>📋 See skill details when selected</span>
                <span>🎯 Simple static view</span>
              </div>
            </div>
            
            {/* 3D Canvas Container */}
            <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-2xl overflow-hidden border-2 border-gray-200" style={{ height: '600px' }}>
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
                    <h3 className="font-semibold">View Skill Details</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Click on any football to see detailed information about that skill including level, description, and rating.
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