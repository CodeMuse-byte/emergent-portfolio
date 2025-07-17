import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  Star,
  MapPin,
  Route,
  Compass,
  Navigation
} from 'lucide-react';
import '../styles/skills-map.css';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skills positioned like locations on a map
  const skillsMap = {
    frontend: {
      name: "Frontend Territory",
      color: "#3B82F6",
      skills: [
        { name: "React", level: 90, x: 25, y: 30, connections: ['JavaScript', 'TypeScript', 'Next.js'] },
        { name: "JavaScript", level: 95, x: 35, y: 20, connections: ['React', 'Node.js', 'TypeScript'] },
        { name: "TypeScript", level: 85, x: 45, y: 35, connections: ['React', 'JavaScript', 'Next.js'] },
        { name: "Next.js", level: 80, x: 55, y: 25, connections: ['React', 'TypeScript'] }
      ]
    },
    backend: {
      name: "Backend Valley",
      color: "#10B981",
      skills: [
        { name: "Node.js", level: 85, x: 65, y: 55, connections: ['JavaScript', 'MongoDB', 'FastAPI'] },
        { name: "Python", level: 80, x: 75, y: 45, connections: ['FastAPI', 'MongoDB'] },
        { name: "FastAPI", level: 75, x: 85, y: 60, connections: ['Python', 'Node.js'] },
        { name: "MongoDB", level: 85, x: 70, y: 70, connections: ['Node.js', 'Python'] }
      ]
    },
    tools: {
      name: "Tools Mountain",
      color: "#8B5CF6",
      skills: [
        { name: "Git", level: 90, x: 20, y: 70, connections: ['Docker', 'Linux'] },
        { name: "Docker", level: 75, x: 30, y: 80, connections: ['Git', 'Linux'] },
        { name: "Linux", level: 85, x: 40, y: 75, connections: ['Git', 'Docker', 'Jest'] },
        { name: "Jest", level: 80, x: 50, y: 85, connections: ['Linux', 'JavaScript'] }
      ]
    },
    core: {
      name: "Core Skills Island",
      color: "#F59E0B",
      skills: [
        { name: "Problem Solving", level: 95, x: 50, y: 50, connections: ['JavaScript', 'Python', 'Git'] }
      ]
    }
  };

  const getAllSkills = () => {
    return Object.values(skillsMap).flatMap(territory => territory.skills);
  };

  const getSkillByName = (name) => {
    return getAllSkills().find(skill => skill.name === name);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  const SkillNode = ({ skill, territory }) => {
    const isSelected = selectedSkill?.name === skill.name;
    const isHovered = hoveredSkill === skill.name;
    
    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-125 z-20' : isHovered ? 'scale-110 z-10' : 'z-5'
        }`}
        style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
        onClick={() => handleSkillClick(skill)}
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div
          className={`w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
            isSelected ? 'ring-4 ring-blue-400' : ''
          }`}
          style={{ backgroundColor: territory.color }}
        >
          <MapPin className="w-6 h-6" />
        </div>
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-white px-2 py-1 rounded shadow-md text-sm font-medium text-gray-800">
            {skill.name}
          </div>
          <div className="text-xs text-gray-600 mt-1">{skill.level}%</div>
        </div>
      </div>
    );
  };

  const ConnectionLines = () => {
    const allSkills = getAllSkills();
    const connections = [];

    allSkills.forEach(skill => {
      skill.connections.forEach(connectionName => {
        const connectedSkill = getSkillByName(connectionName);
        if (connectedSkill) {
          connections.push({
            from: skill,
            to: connectedSkill,
            key: `${skill.name}-${connectionName}`
          });
        }
      });
    });

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map(({ from, to, key }) => (
          <line
            key={key}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke="#E5E7EB"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        ))}
      </svg>
    );
  };

  const TerritoryLabels = () => {
    return (
      <>
        {/* Frontend Territory */}
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4" />
            <span className="font-bold">Frontend Territory</span>
          </div>
        </div>

        {/* Backend Valley */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4" />
            <span className="font-bold">Backend Valley</span>
          </div>
        </div>

        {/* Tools Mountain */}
        <div className="absolute bottom-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4" />
            <span className="font-bold">Tools Mountain</span>
          </div>
        </div>

        {/* Core Skills Island */}
        <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4" />
            <span className="font-bold">Core Skills Island</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
              <Compass className="w-4 h-4 mr-2" />
              Interactive Skills Map
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Skills Navigation Map
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore my technical skills mapped across different territories. Click on any skill node to discover connections and proficiency levels.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Skills Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Interactive Skills Map
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Navigate through different skill territories and discover how technologies connect with each other.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>🗺️ Click nodes to explore</span>
                <span>🔗 Connected skills shown</span>
                <span>📍 Hover for details</span>
              </div>
            </div>
            
            {/* Map Container */}
            <div className="relative h-96 md:h-[600px] bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-lg shadow-xl border-2 border-gray-200 overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-grid-pattern"></div>
              </div>
              
              {/* Connection lines */}
              <ConnectionLines />
              
              {/* Territory labels */}
              <TerritoryLabels />
              
              {/* Skills nodes */}
              {Object.entries(skillsMap).map(([key, territory]) =>
                territory.skills.map(skill => (
                  <SkillNode key={skill.name} skill={skill} territory={territory} />
                ))
              )}
              
              {/* Map legend */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Skill Node</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Route className="w-4 h-4 text-gray-400" />
                    <span>Connections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Skill Details */}
      {selectedSkill && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedSkill.name}</h3>
                      <p className="text-gray-600">Skill Level: {selectedSkill.level}%</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Proficiency Level</span>
                        <span className="text-sm font-bold text-gray-900">{selectedSkill.level}%</span>
                      </div>
                      <Progress value={selectedSkill.level} className="h-3" />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < selectedSkill.level / 20 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {selectedSkill.level >= 90 ? 'Expert' : selectedSkill.level >= 80 ? 'Advanced' : 'Intermediate'}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Connected Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.connections.map(connection => (
                          <Badge key={connection} variant="secondary" className="text-sm">
                            {connection}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Map Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Map Overview
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Explore different territories of my technical expertise
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Object.entries(skillsMap).map(([key, territory]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: territory.color }}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{territory.name}</h3>
                    <p className="text-gray-600">{territory.skills.length} Skills</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Instructions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              How to Navigate the Map
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="font-semibold text-gray-900">Click to Explore</h3>
                  </div>
                  <p className="text-gray-600">
                    Click on any skill node to see detailed information and discover connected technologies.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-semibold text-gray-900">Follow Connections</h3>
                  </div>
                  <p className="text-gray-600">
                    Dotted lines show how skills connect and complement each other in real projects.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-purple-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="font-semibold text-gray-900">Explore Territories</h3>
                  </div>
                  <p className="text-gray-600">
                    Navigate through different skill territories to understand the full technology landscape.
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