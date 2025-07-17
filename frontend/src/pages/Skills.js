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

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Skills organized in categories
  const skillsMapping = {
    frontend: {
      title: "Frontend Development",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-blue-500",
      skills: [
        { 
          name: "React", 
          level: 90, 
          description: "Building dynamic user interfaces with React ecosystem",
          icon: <Code className="w-4 h-4" />
        },
        { 
          name: "JavaScript", 
          level: 95, 
          description: "Core language for web development",
          icon: <Code className="w-4 h-4" />
        },
        { 
          name: "TypeScript", 
          level: 85, 
          description: "Type-safe JavaScript development",
          icon: <Code className="w-4 h-4" />
        },
        { 
          name: "Next.js", 
          level: 80, 
          description: "React framework for production applications",
          icon: <Layers className="w-4 h-4" />
        }
      ]
    },
    backend: {
      title: "Backend Development",
      icon: <Database className="w-5 h-5" />,
      color: "bg-green-500",
      skills: [
        { 
          name: "Node.js", 
          level: 85, 
          description: "Server-side JavaScript runtime",
          icon: <Terminal className="w-4 h-4" />
        },
        { 
          name: "Python", 
          level: 80, 
          description: "Versatile programming language",
          icon: <Code className="w-4 h-4" />
        },
        { 
          name: "FastAPI", 
          level: 75, 
          description: "Modern Python web framework",
          icon: <Zap className="w-4 h-4" />
        },
        { 
          name: "MongoDB", 
          level: 85, 
          description: "NoSQL database management",
          icon: <Database className="w-4 h-4" />
        }
      ]
    },
    tools: {
      title: "Development Tools",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-purple-500",
      skills: [
        { 
          name: "Git", 
          level: 90, 
          description: "Version control and collaboration",
          icon: <Terminal className="w-4 h-4" />
        },
        { 
          name: "Docker", 
          level: 75, 
          description: "Containerization and deployment",
          icon: <Settings className="w-4 h-4" />
        },
        { 
          name: "Linux", 
          level: 85, 
          description: "System administration and operations",
          icon: <Terminal className="w-4 h-4" />
        },
        { 
          name: "Jest", 
          level: 80, 
          description: "JavaScript testing framework",
          icon: <Settings className="w-4 h-4" />
        }
      ]
    },
    other: {
      title: "Problem Solving",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-orange-500",
      skills: [
        { 
          name: "Problem Solving", 
          level: 95, 
          description: "Analytical thinking and solution design",
          icon: <Zap className="w-4 h-4" />
        }
      ]
    }
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(selectedSkill?.name === skill.name ? null : skill);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
              <Code className="w-4 h-4 mr-2" />
              Technical Skills Overview
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Skills & Expertise
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive overview of my technical skills and expertise across different domains.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Skills Mapping */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Skills Mapping
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Click on any skill to see detailed information and proficiency level.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {Object.entries(skillsMapping).map(([key, category]) => (
                <Card key={key} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <span className="text-xl font-bold text-gray-900">{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.skills.map((skill) => (
                        <div 
                          key={skill.name}
                          onClick={() => handleSkillClick(skill)}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-gray-600">
                              {skill.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{skill.name}</h3>
                              <p className="text-sm text-gray-600">{skill.level}%</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${category.color}`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    <div className="text-blue-600">
                      {selectedSkill.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedSkill.name}</h3>
                      <p className="text-gray-600">{selectedSkill.description}</p>
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Skills Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Skills Overview
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              A summary of my technical expertise across different domains
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">4</h3>
                  <p className="text-gray-600">Frontend Skills</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">4</h3>
                  <p className="text-gray-600">Backend Skills</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">4</h3>
                  <p className="text-gray-600">Dev Tools</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">85%</h3>
                  <p className="text-gray-600">Avg Level</p>
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