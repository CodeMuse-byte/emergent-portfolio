import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse movement for wind effect
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    });
  };

  // Skills positioned across the green field
  const footballFormation = {
    goalkeeper: {
      position: "Goalkeeper",
      skills: [
        { 
          name: "Problem Solving", 
          level: 95, 
          description: "Last line of defense against bugs",
          position: [0, 0.5, 3],
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
          description: "Version control specialist",
          position: [-4, 0.5, 1.5],
          color: "#FF6B6B"
        },
        { 
          name: "Jest", 
          level: 80, 
          description: "Testing warrior",
          position: [-1.5, 0.5, 1.5],
          color: "#4ECDC4"
        },
        { 
          name: "Docker", 
          level: 75, 
          description: "Container fortress builder",
          position: [1.5, 0.5, 1.5],
          color: "#45B7D1"
        },
        { 
          name: "Linux", 
          level: 85, 
          description: "System security expert",
          position: [4, 0.5, 1.5],
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
          description: "Core playmaker",
          position: [-3, 0.5, 0],
          color: "#F7DC6F"
        },
        { 
          name: "React", 
          level: 90, 
          description: "Frontend orchestrator",
          position: [0, 0.5, 0],
          color: "#61DAFB"
        },
        { 
          name: "Node.js", 
          level: 85, 
          description: "Backend conductor",
          position: [3, 0.5, 0],
          color: "#68A063"
        },
        { 
          name: "TypeScript", 
          level: 85, 
          description: "Type safety midfielder",
          position: [-1.5, 0.5, -0.8],
          color: "#3178C6"
        },
        { 
          name: "Python", 
          level: 80, 
          description: "Versatile midfielder",
          position: [1.5, 0.5, -0.8],
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
          description: "Goal scorer",
          position: [-2, 0.5, -2.5],
          color: "#000000"
        },
        { 
          name: "FastAPI", 
          level: 75, 
          description: "Speed striker",
          position: [0, 0.5, -2.5],
          color: "#009688"
        },
        { 
          name: "MongoDB", 
          level: 85, 
          description: "Database finisher",
          position: [2, 0.5, -2.5],
          color: "#47A248"
        }
      ]
    }
  };

  // Animated Football with proper rotation
  const AnimatedFootball = ({ skill, position, isSelected, isHovered, onClick }) => {
    const meshRef = useRef();
    
    // Always rotate the football
    useFrame((state, delta) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.8;
        meshRef.current.rotation.y += delta * 0.6;
        meshRef.current.rotation.z += delta * 0.4;
      }
    });

    return (
      <group>
        {/* Football */}
        <Sphere
          ref={meshRef}
          args={[0.6, 32, 32]}
          position={position}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredSkill(skill.name);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHoveredSkill(null);
            document.body.style.cursor = 'default';
          }}
          scale={isHovered ? 1.2 : 1}
        >
          <meshStandardMaterial 
            color={skill.color}
            metalness={0.2}
            roughness={0.3}
            emissive={isSelected ? skill.color : "#000000"} 
            emissiveIntensity={isSelected ? 0.3 : 0}
          />
        </Sphere>

        {/* Skill Name */}
        <Text
          position={[position[0], position[1] + 1, position[2]]}
          fontSize={0.25}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#ffffff"
        >
          {skill.name}
        </Text>

        {/* Skill Level */}
        <Text
          position={[position[0], position[1] - 1, position[2]]}
          fontSize={0.18}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#ffffff"
        >
          {skill.level}%
        </Text>
      </group>
    );
  };

  // 3D Grass with wind effect
  const AnimatedGrass = ({ mousePosition }) => {
    const grassRef = useRef();
    const grassGeometry = useRef();
    
    useFrame((state) => {
      if (grassRef.current) {
        // Create wind effect based on mouse position and time
        const time = state.clock.getElapsedTime();
        const windStrength = 0.1;
        const windSpeed = 2;
        
        // Gentle swaying motion
        grassRef.current.rotation.x = Math.sin(time * windSpeed) * windStrength * 0.1;
        grassRef.current.rotation.z = Math.cos(time * windSpeed * 0.7) * windStrength * 0.1;
        
        // Mouse influence
        grassRef.current.rotation.x += mousePosition.y * 0.02;
        grassRef.current.rotation.z += mousePosition.x * 0.02;
      }
    });

    return (
      <group ref={grassRef}>
        {/* Main grass ground */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshLambertMaterial color="#4A7C59" />
        </Plane>

        {/* Grass texture overlay */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <meshLambertMaterial 
            color="#5A8A67" 
            transparent
            opacity={0.8}
          />
        </Plane>

        {/* Grass blades scattered around */}
        {Array.from({ length: 200 }, (_, i) => {
          const x = (Math.random() - 0.5) * 20;
          const z = (Math.random() - 0.5) * 20;
          const height = 0.1 + Math.random() * 0.2;
          
          return (
            <Box
              key={i}
              args={[0.02, height, 0.02]}
              position={[x, height / 2, z]}
              rotation={[0, Math.random() * Math.PI, 0]}
            >
              <meshLambertMaterial color="#3A6B47" />
            </Box>
          );
        })}

        {/* Grass patches for more realistic look */}
        {Array.from({ length: 50 }, (_, i) => {
          const x = (Math.random() - 0.5) * 18;
          const z = (Math.random() - 0.5) * 18;
          const scale = 0.5 + Math.random() * 0.5;
          
          return (
            <Plane
              key={`patch-${i}`}
              args={[scale, scale]}
              rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
              position={[x, 0.02, z]}
            >
              <meshLambertMaterial 
                color="#6B9477" 
                transparent
                opacity={0.6}
              />
            </Plane>
          );
        })}
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
        {/* Improved lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        {/* Animated grass ground */}
        <AnimatedGrass mousePosition={mousePosition} />

        {/* Skills footballs */}
        {getAllSkills().map((skill) => (
          <AnimatedFootball
            key={skill.name}
            skill={skill}
            position={skill.position}
            isSelected={selectedPlayer === skill.name}
            isHovered={hoveredSkill === skill.name}
            onClick={() => handleFootballClick(skill)}
          />
        ))}
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
              3D Football Skills Field
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              My Tech Arsenal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Welcome to my 3D football skills field! Each colorful football represents a technology and rotates continuously. Move your cursor to feel the wind effect on the grass.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* 3D Skills Football Field */}
      <section className="py-20 bg-gradient-to-b from-green-100 to-green-200 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
                Interactive 3D Football Skills Field
              </h2>
              <p className="text-lg text-green-700 max-w-2xl mx-auto mb-8">
                Click on any colorful football to see detailed information! Watch the grass move gently with the wind as you move your cursor around.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-600">
                <span>⚽ Click footballs to see details</span>
                <span>🌱 Move cursor to feel wind on grass</span>
                <span>🔄 Balls rotate continuously</span>
              </div>
            </div>
            
            {/* 3D Canvas Container */}
            <div 
              className="relative bg-gradient-to-b from-green-50 to-green-100 rounded-lg shadow-2xl overflow-hidden border-2 border-green-300" 
              style={{ height: '650px' }}
              onMouseMove={handleMouseMove}
            >
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

      {/* Field Stats */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Football Field Statistics
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Overview of the colorful footballs spinning on my 3D grass field
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">15+</h3>
                  <p className="text-muted-foreground">Footballs on Field</p>
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
                  <p className="text-muted-foreground">Wind Effect</p>
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
                    <h3 className="font-semibold">Click on Footballs</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Click on any colorful spinning football to see detailed information about that skill. All footballs rotate continuously.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-semibold">Feel the Wind</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Move your cursor around the field to create a gentle wind effect on the 3D grass. Watch it sway naturally!
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