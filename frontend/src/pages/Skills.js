import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  Star,
  Code,
  Database,
  Globe,
  Settings,
  Layers,
  Terminal,
  Zap
} from 'lucide-react';

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

  // Underwater Ocean Scene
  const UnderwaterOcean = () => {
    const bubblesRef = useRef();
    
    // Animate floating bubbles
    useFrame((state, delta) => {
      if (bubblesRef.current) {
        bubblesRef.current.children.forEach((bubble, i) => {
          bubble.position.y += delta * (0.5 + i * 0.1);
          if (bubble.position.y > 8) {
            bubble.position.y = -2;
          }
        });
      }
    });

    return (
      <group>
        {/* Ocean Floor */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <meshLambertMaterial color="#8B7355" />
        </Plane>

        {/* Sandy texture layer */}
        <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.99, 0]}>
          <meshLambertMaterial 
            color="#D2B48C" 
            transparent
            opacity={0.7}
          />
        </Plane>

        {/* Coral formations */}
        <Cylinder args={[0.5, 0.8, 2, 8]} position={[-5, 0, 2]} rotation={[0, 0, 0.1]}>
          <meshStandardMaterial color="#FF7F50" />
        </Cylinder>
        <Cylinder args={[0.3, 0.5, 1.5, 8]} position={[5, -0.25, 1]} rotation={[0, 0, -0.1]}>
          <meshStandardMaterial color="#FF69B4" />
        </Cylinder>
        <Cylinder args={[0.4, 0.6, 1.8, 8]} position={[2, -0.1, 3]} rotation={[0, 0, 0.15]}>
          <meshStandardMaterial color="#FF1493" />
        </Cylinder>

        {/* Seaweed */}
        <Plane args={[0.2, 3]} position={[-3, 0.5, -1]} rotation={[0, 0, 0.2]}>
          <meshLambertMaterial color="#228B22" transparent opacity={0.8} />
        </Plane>
        <Plane args={[0.15, 2.5]} position={[3.5, 0.25, -2]} rotation={[0, 0, -0.15]}>
          <meshLambertMaterial color="#32CD32" transparent opacity={0.8} />
        </Plane>
        <Plane args={[0.18, 2.8]} position={[-1, 0.4, 2.5]} rotation={[0, 0, 0.1]}>
          <meshLambertMaterial color="#228B22" transparent opacity={0.8} />
        </Plane>

        {/* Floating bubbles */}
        <group ref={bubblesRef}>
          {[...Array(15)].map((_, i) => (
            <Sphere 
              key={i} 
              args={[0.05 + Math.random() * 0.1, 8, 8]} 
              position={[
                (Math.random() - 0.5) * 15,
                Math.random() * 6 - 2,
                (Math.random() - 0.5) * 15
              ]}
            >
              <meshStandardMaterial 
                color="#87CEEB" 
                transparent 
                opacity={0.3}
              />
            </Sphere>
          ))}
        </group>

        {/* Rocks */}
        <Sphere args={[0.8, 16, 16]} position={[-4, -0.5, -2]} scale={[1, 0.5, 1]}>
          <meshStandardMaterial color="#708090" />
        </Sphere>
        <Sphere args={[0.6, 16, 16]} position={[4, -0.7, -1]} scale={[1, 0.4, 1]}>
          <meshStandardMaterial color="#2F4F4F" />
        </Sphere>
        <Sphere args={[0.5, 16, 16]} position={[1, -0.8, -3]} scale={[1, 0.3, 1]}>
          <meshStandardMaterial color="#696969" />
        </Sphere>
      </group>
    );
  };

  // 3D Scene Component
  const SkillsScene = React.memo(() => {
    const getAllSkills = () => {
      return Object.values(oceanEcosystem).flatMap(habitat => habitat.skills);
    };

    const handleCreatureClick = (skill) => {
      setSelectedPlayer(selectedPlayer === skill.name ? null : skill.name);
    };

    return (
      <Canvas 
        camera={{ position: [0, 6, 8], fov: 75 }}
        gl={{ antialias: true }}
      >
        {/* Underwater lighting */}
        <ambientLight intensity={0.4} color="#4682B4" />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#87CEEB" />
        <directionalLight position={[-10, 5, -5]} intensity={0.3} color="#4169E1" />

        {/* Ocean fog effect */}
        <fog attach="fog" args={["#4682B4", 5, 15]} />

        {/* Underwater ocean scene */}
        <UnderwaterOcean />

        {/* Skills sea creatures */}
        {getAllSkills().map((skill) => (
          <SeaCreature
            key={skill.name}
            skill={skill}
            position={skill.position}
            isSelected={selectedPlayer === skill.name}
            isHovered={hoveredSkill === skill.name}
            onClick={() => handleCreatureClick(skill)}
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
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <Waves className="w-4 h-4 mr-2" />
              Underwater Skills Ocean
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Deep Sea Tech Arsenal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Dive into my underwater skills ocean! Each sea creature represents a technology swimming in the depths of my expertise.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* 3D Skills Ocean Scene */}
      <section className="py-20 bg-gradient-to-b from-blue-100 to-cyan-200 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Interactive Underwater Skills Ocean
              </h2>
              <p className="text-lg text-blue-700 max-w-2xl mx-auto mb-8">
                Click on any sea creature to see detailed information! Watch them swim and float in their natural underwater habitat.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-600">
                <span>🐟 Click creatures to see details</span>
                <span>🌊 Realistic ocean environment</span>
                <span>🪸 Living coral reef ecosystem</span>
              </div>
            </div>
            
            {/* 3D Canvas Container */}
            <div 
              className="relative bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-2xl overflow-hidden border-2 border-blue-300" 
              style={{ height: '650px' }}
            >
              <SkillsScene />
            </div>
          </div>
        </div>
      </section>

      {/* Creature Details */}
      {selectedPlayer && (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {Object.values(oceanEcosystem).map(habitat => 
                habitat.skills.map(skill => {
                  if (skill.name === selectedPlayer) {
                    return (
                      <Card key={skill.name} className="hover:shadow-lg transition-shadow border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                              style={{ backgroundColor: skill.color }}
                            >
                              {skill.creature === 'fish' ? '🐟' : 
                               skill.creature === 'jellyfish' ? '🪼' : 
                               skill.creature === 'starfish' ? '⭐' : 
                               skill.creature === 'coral' ? '🪸' : 
                               skill.creature === 'anemone' ? '🌊' : 
                               skill.creature === 'whale' ? '🐋' : 
                               skill.creature === 'eel' ? '🐍' : '🌊'}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-blue-800">{skill.name}</h3>
                              <p className="text-blue-600">{skill.description}</p>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-blue-700">Skill Level</span>
                                <span className="text-sm font-bold text-blue-800">{skill.level}%</span>
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
                              <Badge variant="outline" className="text-sm border-blue-300 text-blue-700">
                                {skill.level >= 90 ? 'Ocean Master' : skill.level >= 80 ? 'Deep Sea Explorer' : 'Skilled Navigator'}
                              </Badge>
                            </div>
                            
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <p className="text-sm text-blue-700">
                                <strong>Habitat:</strong> {habitat.habitat} • <strong>Creature:</strong> {skill.creature.charAt(0).toUpperCase() + skill.creature.slice(1)}
                              </p>
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

      {/* Ocean Stats */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ocean Ecosystem Statistics
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Overview of the sea creatures swimming in my underwater skills ocean
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Fish className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-800">15+</h3>
                  <p className="text-blue-600">Sea Creatures</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Waves className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-800">87%</h3>
                  <p className="text-blue-600">Average Skill Level</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Anchor className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-800">4</h3>
                  <p className="text-blue-600">Ocean Habitats</p>
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
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              How to Explore the Ocean
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="font-semibold text-blue-800">Click on Sea Creatures</h3>
                  </div>
                  <p className="text-blue-600">
                    Click on any swimming sea creature to see detailed information about that skill. Watch them move naturally in their underwater habitat.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-cyan-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-semibold text-blue-800">Immersive Experience</h3>
                  </div>
                  <p className="text-blue-600">
                    Enjoy a realistic underwater experience with floating bubbles, coral reefs, and sea creatures swimming naturally in their ocean habitat.
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