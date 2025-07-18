import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import { 
  Star
} from 'lucide-react';
import '../styles/skills-map.css';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skills arranged in a network/constellation style like the photo
  const skillsNetwork = {
    frontend: {
      name: "Frontend",
      color: "#E91E63",
      skills: [
        { name: "React", level: 95, x: 15, y: 25, connections: ['JavaScript', 'TypeScript', 'Next.js'] },
        { name: "Next.js", level: 90, x: 35, y: 15, connections: ['React', 'TypeScript'] },
        { name: "TypeScript", level: 85, x: 25, y: 40, connections: ['React', 'Next.js', 'JavaScript'] },
        { name: "Tailwind", level: 92, x: 10, y: 50, connections: ['React', 'Next.js'] },
        { name: "Three.js", level: 72, x: 5, y: 35, connections: ['React', 'JavaScript'] }
      ]
    },
    backend: {
      name: "Backend",
      color: "#00BCD4",
      skills: [
        { name: "Node.js", level: 85, x: 55, y: 30, connections: ['JavaScript', 'Express', 'MongoDB'] },
        { name: "Express", level: 82, x: 65, y: 45, connections: ['Node.js', 'MongoDB'] },
        { name: "MongoDB", level: 78, x: 75, y: 25, connections: ['Node.js', 'Express', 'Python'] },
        { name: "Python", level: 80, x: 85, y: 35, connections: ['MongoDB', 'FastAPI'] },
        { name: "FastAPI", level: 75, x: 95, y: 50, connections: ['Python'] }
      ]
    },
    tools: {
      name: "Tools",
      color: "#9C27B0",
      skills: [
        { name: "Docker", level: 75, x: 25, y: 70, connections: ['Kubernetes', 'AWS'] },
        { name: "AWS", level: 85, x: 15, y: 85, connections: ['Docker', 'Kubernetes'] },
        { name: "Kubernetes", level: 70, x: 45, y: 75, connections: ['Docker', 'AWS'] }
      ]
    },
    other: {
      name: "Other",
      color: "#4CAF50",
      skills: [
        { name: "JavaScript", level: 95, x: 45, y: 50, connections: ['React', 'Node.js', 'TypeScript'] }
      ]
    }
  };

  const getAllSkills = () => {
    return Object.values(skillsNetwork).flatMap(category => category.skills);
  };

  const getSkillByName = (name) => {
    return getAllSkills().find(skill => skill.name === name);
  };

  const getSkillCategory = (skillName) => {
    for (const [key, category] of Object.entries(skillsNetwork)) {
      if (category.skills.find(skill => skill.name === skillName)) {
        return category;
      }
    }
    return null;
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  const SkillNode = ({ skill }) => {
    const category = getSkillCategory(skill.name);
    const isSelected = selectedSkill?.name === skill.name;
    const isHovered = hoveredSkill === skill.name;
    
    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-110 z-20' : isHovered ? 'scale-105 z-10' : 'z-5'
        }`}
        style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
        onClick={() => handleSkillClick(skill)}
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        <div
          className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
            isSelected ? 'ring-2 ring-white' : ''
          }`}
          style={{ 
            backgroundColor: '#1a1a1a',
            borderColor: category.color,
            minWidth: '120px',
            ...(isHovered ? {
              boxShadow: `0 0 20px ${category.color}`,
              borderColor: category.color,
              background: `linear-gradient(135deg, #1a1a1a 0%, ${category.color}15 100%)`
            } : {})
          }}
        >
          <div className="text-white font-medium text-sm">{skill.name}</div>
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
        {connections.map(({ from, to, key }) => {
          const isRelatedToHovered = hoveredSkill && 
            (from.name === hoveredSkill || to.name === hoveredSkill);
          
          // Get the color of the target skill (the skill being connected to)
          const targetSkill = from.name === hoveredSkill ? to : from;
          const targetCategory = getSkillCategory(targetSkill.name);
          const lineColor = isRelatedToHovered ? targetCategory.color : "#444444";
          
          return (
            <line
              key={key}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke={lineColor}
              strokeWidth={isRelatedToHovered ? "3" : "1"}
              strokeDasharray="3,3"
              className={`transition-all duration-300 ${
                isRelatedToHovered ? 'opacity-100' : 'opacity-60'
              }`}
              style={isRelatedToHovered ? {
                filter: `drop-shadow(0 0 6px ${targetCategory.color})`
              } : {}}
            />
          );
        })}
      </svg>
    );
  };

  const CategoryLegend = () => {
    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-80 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-6 text-sm">
          {Object.entries(skillsNetwork).map(([key, category]) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-white">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <section className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal delay={200}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Interactive Skills Network
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Click on any skill node to see detailed information and explore the connections between technologies.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>

      {/* Skills Network */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal delay={600}>
              {/* Network Container */}
              <div className="relative h-96 md:h-[600px] bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                {/* Connection lines */}
                <ConnectionLines />
                
                {/* Skills nodes */}
                {getAllSkills().map(skill => (
                  <SkillNode key={skill.name} skill={skill} />
                ))}
                
                {/* Category legend */}
                <CategoryLegend />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Selected Skill Details */}
      {selectedSkill && (
        <ScrollReveal delay={200}>
          <section className="py-16 bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: getSkillCategory(selectedSkill.name)?.color }}
                    >
                      {selectedSkill.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                      <p className="text-gray-300">Category: {getSkillCategory(selectedSkill.name)?.name}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-5 h-5 ${i < selectedSkill.level / 20 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-sm border-gray-600 text-gray-300">
                        {selectedSkill.level >= 90 ? 'Expert' : selectedSkill.level >= 80 ? 'Advanced' : 'Intermediate'}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Connected Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.connections.map(connection => (
                          <Badge 
                            key={connection} 
                            variant="secondary" 
                            className="text-sm bg-gray-700 text-gray-300 border-gray-600"
                          >
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
        </ScrollReveal>
      )}
    </div>
  );
};

export default Skills;