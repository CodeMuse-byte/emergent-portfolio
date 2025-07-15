import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane, useGLTF, Sphere } from '@react-three/drei';
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
  const [footballPositions, setFootballPositions] = useState({});
  
  // Reorganize skills into football positions with 3D coordinates
  const footballFormation = {
    goalkeeper: {
      position: "Goalkeeper",
      skills: [
        { 
          name: "Problem Solving", 
          level: 95, 
          icon: "🥅", 
          description: "Last line of defense against bugs",
          position: [0, 0.5, 2],
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
          position: [-3, 0.5, 1],
          color: "#FF6B6B"
        },
        { 
          name: "Jest", 
          level: 80, 
          icon: "⚔️", 
          description: "Testing warrior",
          position: [-1, 0.5, 1],
          color: "#4ECDC4"
        },
        { 
          name: "Docker", 
          level: 75, 
          icon: "🏰", 
          description: "Container fortress builder",
          position: [1, 0.5, 1],
          color: "#45B7D1"
        },
        { 
          name: "Linux", 
          level: 85, 
          icon: "🛡️", 
          description: "System security expert",
          position: [3, 0.5, 1],
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
          position: [-2, 0.5, 0],
          color: "#F7DC6F"
        },
        { 
          name: "React", 
          level: 90, 
          icon: "⚛️", 
          description: "Frontend orchestrator",
          position: [0, 0.5, 0],
          color: "#61DAFB"
        },
        { 
          name: "Node.js", 
          level: 85, 
          icon: "🟢", 
          description: "Backend conductor",
          position: [2, 0.5, 0],
          color: "#68A063"
        },
        { 
          name: "TypeScript", 
          level: 85, 
          icon: "🔷", 
          description: "Type safety midfielder",
          position: [-1, 0.5, -0.5],
          color: "#3178C6"
        },
        { 
          name: "Python", 
          level: 80, 
          icon: "🐍", 
          description: "Versatile midfielder",
          position: [1, 0.5, -0.5],
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
          position: [-1, 0.5, -1.5],
          color: "#000000"
        },
        { 
          name: "FastAPI", 
          level: 75, 
          icon: "⚡", 
          description: "Speed striker",
          position: [0, 0.5, -1.5],
          color: "#009688"
        },
        { 
          name: "MongoDB", 
          level: 85, 
          icon: "🍃", 
          description: "Database finisher",
          position: [1, 0.5, -1.5],
          color: "#47A248"
        }
      ]
    }
  };

  // Animated Football Component
  const AnimatedFootball = ({ skill, position, isSelected, isHovered, onClick }) => {
    const meshRef = useRef();
    const [targetPosition, setTargetPosition] = useState(position);
    
    useEffect(() => {
      if (isSelected) {
        // Move towards center when selected
        setTargetPosition([0, 0.5, 0]);
      } else {
        // Return to original position
        setTargetPosition(position);
      }
    }, [isSelected, position]);

    useEffect(() => {
      if (meshRef.current) {
        // Animate position
        const currentPos = meshRef.current.position;
        const targetPos = new THREE.Vector3(...targetPosition);
        
        const animate = () => {
          currentPos.lerp(targetPos, 0.1);
          if (currentPos.distanceTo(targetPos) > 0.01) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }
    }, [targetPosition]);

    // Animation loop for continuous rotation
    useEffect(() => {
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.x += 0.01;
          meshRef.current.rotation.y += 0.01;
          
          // Add bounce effect when selected
          if (isSelected) {
            meshRef.current.position.y = 0.5 + Math.sin(Date.now() * 0.005) * 0.2;
          }
        }
        requestAnimationFrame(animate);
      };
      animate();
    }, [isSelected]);

    return (
      <group>
        {/* Parking Space */}
        <Plane 
          args={[0.8, 0.8]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[position[0], 0.01, position[2]]}
        >
          <meshLambertMaterial color="#ffffff" opacity={0.3} transparent />
        </Plane>
        
        {/* Football */}
        <Sphere
          ref={meshRef}
          args={[0.2, 32, 32]}
          position={position}
          onClick={onClick}
          onPointerOver={() => setHoveredSkill(skill.name)}
          onPointerOut={() => setHoveredSkill(null)}
          scale={isHovered ? 1.2 : 1}
        >
          <meshLambertMaterial 
            color={skill.color} 
            emissive={isSelected ? skill.color : "#000000"} 
            emissiveIntensity={isSelected ? 0.3 : 0}
          />
        </Sphere>

        {/* Skill Label */}
        <Text
          position={[position[0], position[1] + 0.5, position[2]]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {skill.name}
        </Text>

        {/* Skill Level Indicator */}
        <Text
          position={[position[0], position[1] - 0.4, position[2]]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {skill.level}%
        </Text>

        {/* Connection Lines to Center when Selected */}
        {isSelected && (
          <mesh>
            <cylinderGeometry args={[0.01, 0.01, 3, 8]} />
            <meshBasicMaterial color="#ffffff" opacity={0.5} transparent />
          </mesh>
        )}
      </group>
    );
  };

  // Parking Lot Environment
  const ParkingLot = () => {
    return (
      <group>
        {/* Ground */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshLambertMaterial color="#2C3E50" />
        </Plane>

        {/* Parking Lines */}
        {[-3, -1, 1, 3].map((x, i) => (
          <group key={i}>
            <Box args={[0.05, 0.02, 1]} position={[x, 0.01, 1]}>
              <meshBasicMaterial color="#ffffff" />
            </Box>
            <Box args={[0.05, 0.02, 1]} position={[x, 0.01, 0]}>
              <meshBasicMaterial color="#ffffff" />
            </Box>
            <Box args={[0.05, 0.02, 1]} position={[x, 0.01, -1]}>
              <meshBasicMaterial color="#ffffff" />
            </Box>
          </group>
        ))}

        {/* Additional parking lines */}
        {[-2, 0, 2].map((x, i) => (
          <group key={`mid-${i}`}>
            <Box args={[0.05, 0.02, 1]} position={[x, 0.01, 0]}>
              <meshBasicMaterial color="#ffffff" />
            </Box>
            <Box args={[0.05, 0.02, 1]} position={[x, 0.01, -0.5]}>
              <meshBasicMaterial color="#ffffff" />
            </Box>
          </group>
        ))}

        {/* Goalkeeper area */}
        <Box args={[0.05, 0.02, 1]} position={[0, 0.01, 2]}>
          <meshBasicMaterial color="#FFD700" />
        </Box>

        {/* Forward area */}
        {[-1, 0, 1].map((x, i) => (
          <Box key={`forward-${i}`} args={[0.05, 0.02, 1]} position={[x, 0.01, -1.5]}>
            <meshBasicMaterial color="#ffffff" />
          </Box>
        ))}
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
      <Canvas camera={{ position: [8, 8, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />

        <ParkingLot />

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

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
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
              3D Skills Parking Lot
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              My Tech Arsenal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Welcome to my 3D skills parking lot! Each spinning football represents a technology in my arsenal. Click on any football to see it come to life and move to the center.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* 3D Skills Parking Lot */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Interactive 3D Skills Parking
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                Rotate around the scene and click on any football to see the magic happen! Each football is positioned according to its role in development.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span>🎮 Drag to rotate</span>
                <span>🔍 Scroll to zoom</span>
                <span>⚽ Click footballs to select</span>
              </div>
            </div>
            
            {/* 3D Canvas Container */}
            <div className="relative bg-gray-900 rounded-lg shadow-2xl overflow-hidden" style={{ height: '600px' }}>
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
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
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

      {/* Team Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Parking Statistics
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Overview of the footballs parked in my 3D skills lot
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">15+</h3>
                  <p className="text-muted-foreground">Footballs Parked</p>
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
                  <p className="text-muted-foreground">Interactive Experience</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              How to Navigate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="font-semibold">Click on Any Football</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Click on any spinning football to see it move to the center and get detailed information about that skill.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-semibold">Explore in 3D</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Drag to rotate the camera around the parking lot, scroll to zoom, and explore from different angles.
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