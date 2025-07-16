import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Plane, Sphere, Cylinder, Cone } from '@react-three/drei';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  Star,
  Waves,
  Fish,
  Anchor
} from 'lucide-react';
import * as THREE from 'three';

const Skills = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skills positioned across the underwater ocean scene
  const oceanEcosystem = {
    coralReef: {
      habitat: "Coral Reef",
      skills: [
        { 
          name: "Problem Solving", 
          level: 95, 
          description: "Master navigator of complex currents",
          position: [0, 1, 3],
          color: "#FF6B6B",
          creature: "starfish"
        },
      ]
    },
    deepSea: {
      habitat: "Deep Sea", 
      skills: [
        { 
          name: "Git", 
          level: 90, 
          description: "Version control like a wise octopus",
          position: [-4, 2, 1.5],
          color: "#9B59B6",
          creature: "jellyfish"
        },
        { 
          name: "Jest", 
          level: 80, 
          description: "Testing the waters with precision",
          position: [-1.5, 1.5, 1.5],
          color: "#3498DB",
          creature: "fish"
        },
        { 
          name: "Docker", 
          level: 75, 
          description: "Container expert of the abyss",
          position: [1.5, 3, 1.5],
          color: "#2ECC71",
          creature: "coral"
        },
        { 
          name: "Linux", 
          level: 85, 
          description: "System guardian of the deep",
          position: [4, 2.5, 1.5],
          color: "#E74C3C",
          creature: "anemone"
        }
      ]
    },
    midWater: {
      habitat: "Mid Water",
      skills: [
        { 
          name: "JavaScript", 
          level: 95, 
          description: "Swift predator of the code ocean",
          position: [-3, 2, 0],
          color: "#F39C12",
          creature: "fish"
        },
        { 
          name: "React", 
          level: 90, 
          description: "Graceful swimmer through interfaces",
          position: [0, 2.5, 0],
          color: "#00CED1",
          creature: "jellyfish"
        },
        { 
          name: "Node.js", 
          level: 85, 
          description: "Backend whale of the server seas",
          position: [3, 1.8, 0],
          color: "#228B22",
          creature: "whale"
        },
        { 
          name: "TypeScript", 
          level: 85, 
          description: "Type-safe navigator of deep waters",
          position: [-1.5, 1.2, -0.8],
          color: "#4682B4",
          creature: "fish"
        },
        { 
          name: "Python", 
          level: 80, 
          description: "Versatile serpent of the coding depths",
          position: [1.5, 1.5, -0.8],
          color: "#FFD700",
          creature: "eel"
        }
      ]
    },
    seaFloor: {
      habitat: "Sea Floor",
      skills: [
        { 
          name: "Next.js", 
          level: 80, 
          description: "Foundation builder of ocean floors",
          position: [-2, 0.5, -2.5],
          color: "#FF1493",
          creature: "coral"
        },
        { 
          name: "FastAPI", 
          level: 75, 
          description: "Speed demon of the depths",
          position: [0, 0.3, -2.5],
          color: "#20B2AA",
          creature: "fish"
        },
        { 
          name: "MongoDB", 
          level: 85, 
          description: "Data treasure guardian",
          position: [2, 0.8, -2.5],
          color: "#8A2BE2",
          creature: "anemone"
        }
      ]
    }
  };

  // Sea Creature Component - Different creatures for different skills
  const SeaCreature = ({ skill, position, isSelected, isHovered, onClick }) => {
    const meshRef = useRef();
    const groupRef = useRef();
    
    // Different swimming animations based on creature type
    useFrame((state, delta) => {
      if (meshRef.current && groupRef.current) {
        const time = state.clock.getElapsedTime();
        
        switch (skill.creature) {
          case 'fish':
            // Swimming motion
            meshRef.current.rotation.y += delta * 0.5;
            groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
            break;
          case 'jellyfish':
            // Pulsing motion
            meshRef.current.rotation.y += delta * 0.3;
            groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.2;
            const scale = 1 + Math.sin(time * 3) * 0.1;
            meshRef.current.scale.set(scale, scale, scale);
            break;
          case 'starfish':
            // Gentle rotation
            meshRef.current.rotation.z += delta * 0.2;
            groupRef.current.position.y = position[1] + Math.sin(time * 1) * 0.05;
            break;
          case 'coral':
            // Swaying motion
            meshRef.current.rotation.x = Math.sin(time * 0.8) * 0.1;
            meshRef.current.rotation.z = Math.cos(time * 0.6) * 0.1;
            break;
          case 'anemone':
            // Waving tentacles
            meshRef.current.rotation.y += delta * 0.1;
            const wave = Math.sin(time * 2) * 0.05;
            meshRef.current.rotation.x = wave;
            meshRef.current.rotation.z = wave;
            break;
          case 'whale':
            // Slow majestic movement
            meshRef.current.rotation.y += delta * 0.2;
            groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.15;
            break;
          case 'eel':
            // Serpentine movement
            meshRef.current.rotation.y += delta * 0.4;
            groupRef.current.position.x = position[0] + Math.sin(time * 1.5) * 0.1;
            groupRef.current.position.y = position[1] + Math.cos(time * 1.2) * 0.1;
            break;
          default:
            meshRef.current.rotation.y += delta * 0.5;
        }
      }
    });

    const renderCreature = () => {
      switch (skill.creature) {
        case 'fish':
          return (
            <group>
              <Sphere args={[0.4, 16, 16]}>
                <meshStandardMaterial 
                  color={skill.color}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Sphere>
              <Cone args={[0.2, 0.3, 8]} position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={skill.color} />
              </Cone>
            </group>
          );
        case 'jellyfish':
          return (
            <group>
              <Sphere args={[0.5, 16, 16]} scale={[1, 0.6, 1]}>
                <meshStandardMaterial 
                  color={skill.color}
                  transparent
                  opacity={0.7}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Sphere>
              {[...Array(6)].map((_, i) => (
                <Cylinder 
                  key={i} 
                  args={[0.02, 0.02, 0.8, 8]} 
                  position={[
                    Math.cos(i * Math.PI / 3) * 0.3,
                    -0.4,
                    Math.sin(i * Math.PI / 3) * 0.3
                  ]}
                  rotation={[Math.random() * 0.2, 0, Math.random() * 0.2]}
                >
                  <meshStandardMaterial color={skill.color} transparent opacity={0.6} />
                </Cylinder>
              ))}
            </group>
          );
        case 'starfish':
          return (
            <group>
              <Sphere args={[0.3, 16, 16]} scale={[1, 0.3, 1]}>
                <meshStandardMaterial 
                  color={skill.color}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Sphere>
              {[...Array(5)].map((_, i) => (
                <Cone 
                  key={i} 
                  args={[0.15, 0.4, 8]} 
                  position={[
                    Math.cos(i * Math.PI * 2 / 5) * 0.3,
                    0,
                    Math.sin(i * Math.PI * 2 / 5) * 0.3
                  ]}
                  rotation={[Math.PI / 2, 0, i * Math.PI * 2 / 5]}
                >
                  <meshStandardMaterial color={skill.color} />
                </Cone>
              ))}
            </group>
          );
        case 'coral':
          return (
            <group>
              <Cylinder args={[0.3, 0.4, 0.8, 8]}>
                <meshStandardMaterial 
                  color={skill.color}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Cylinder>
              {[...Array(4)].map((_, i) => (
                <Cylinder 
                  key={i} 
                  args={[0.1, 0.15, 0.5, 8]} 
                  position={[
                    Math.cos(i * Math.PI / 2) * 0.2,
                    0.3,
                    Math.sin(i * Math.PI / 2) * 0.2
                  ]}
                >
                  <meshStandardMaterial color={skill.color} />
                </Cylinder>
              ))}
            </group>
          );
        case 'anemone':
          return (
            <group>
              <Cylinder args={[0.3, 0.3, 0.2, 8]}>
                <meshStandardMaterial 
                  color={skill.color}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Cylinder>
              {[...Array(8)].map((_, i) => (
                <Cylinder 
                  key={i} 
                  args={[0.05, 0.02, 0.6, 8]} 
                  position={[
                    Math.cos(i * Math.PI / 4) * 0.2,
                    0.3,
                    Math.sin(i * Math.PI / 4) * 0.2
                  ]}
                  rotation={[Math.PI / 6, 0, i * Math.PI / 4]}
                >
                  <meshStandardMaterial color={skill.color} />
                </Cylinder>
              ))}
            </group>
          );
        case 'whale':
          return (
            <group>
              <Sphere args={[0.6, 16, 16]} scale={[1.2, 0.8, 1]}>
                <meshStandardMaterial 
                  color={skill.color}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Sphere>
              <Cone args={[0.3, 0.4, 8]} position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={skill.color} />
              </Cone>
            </group>
          );
        case 'eel':
          return (
            <group>
              <Cylinder args={[0.1, 0.15, 1.2, 8]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial 
                  color={skill.color}
                  emissive={isSelected ? skill.color : "#000000"} 
                  emissiveIntensity={isSelected ? 0.3 : 0}
                />
              </Cylinder>
              <Sphere args={[0.2, 16, 16]} position={[0, 0, 0.6]}>
                <meshStandardMaterial color={skill.color} />
              </Sphere>
            </group>
          );
        default:
          return (
            <Sphere args={[0.6, 16, 16]}>
              <meshStandardMaterial 
                color={skill.color}
                emissive={isSelected ? skill.color : "#000000"} 
                emissiveIntensity={isSelected ? 0.3 : 0}
              />
            </Sphere>
          );
      }
    };

    return (
      <group 
        ref={groupRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredSkill(skill.name);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoveredSkill(null);
        }}
      >
        <group ref={meshRef}>
          {renderCreature()}
        </group>

        {/* Skill Name */}
        <Text
          position={[0, 1.2, 0]}
          fontSize={0.25}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {skill.name}
        </Text>

        {/* Skill Level */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.18}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    );
  };

  // Static Green Grass Field
  const StaticGrassField = () => {
    return (
      <group>
        {/* Main grass ground */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshLambertMaterial color="#4A7C59" />
        </Plane>

        {/* Grass texture layer */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <meshLambertMaterial 
            color="#5A8A67" 
            transparent
            opacity={0.7}
          />
        </Plane>
      </group>
    );
  };

  // 3D Scene Component
  const SkillsScene = React.memo(() => {
    const getAllSkills = () => {
      return Object.values(footballFormation).flatMap(position => position.skills);
    };

    const handleFootballClick = (skill) => {
      setSelectedPlayer(selectedPlayer === skill.name ? null : skill.name);
    };

    return (
      <Canvas 
        camera={{ position: [0, 8, 6], fov: 75 }}
        gl={{ antialias: false }}
      >
        {/* Simple lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Static grass field */}
        <StaticGrassField />

        {/* Skills footballs */}
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
      </Canvas>
    );
  });

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
              Welcome to my 3D football skills field! Each colorful football represents a technology and rotates continuously on the green grass field.
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
                Click on any colorful football to see detailed information! All footballs rotate continuously on a stable green grass field.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-green-600">
                <span>⚽ Click footballs to see details</span>
                <span>🌱 Stable green grass field</span>
                <span>🔄 Smooth ball rotation</span>
              </div>
            </div>
            
            {/* 3D Canvas Container */}
            <div 
              className="relative bg-gradient-to-b from-green-50 to-green-100 rounded-lg shadow-2xl overflow-hidden border-2 border-green-300" 
              style={{ height: '650px' }}
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
                  <p className="text-muted-foreground">Stable Experience</p>
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
                    <h3 className="font-semibold">Stable Performance</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Enjoy a smooth, stable 3D experience with no blinking or flickering. Just clean, continuous football rotations.
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