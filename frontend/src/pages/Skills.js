import React, { useState } from 'react';
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

const Skills = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  // Reorganize skills into football positions
  const footballFormation = {
    goalkeeper: {
      position: "Goalkeeper",
      skills: [
        { name: "Problem Solving", level: 95, icon: "🥅", description: "Last line of defense against bugs" },
      ]
    },
    defenders: {
      position: "Defenders",
      skills: [
        { name: "Git", level: 90, icon: "🛡️", description: "Version control specialist" },
        { name: "Jest", level: 80, icon: "⚔️", description: "Testing warrior" },
        { name: "Docker", level: 75, icon: "🏰", description: "Container fortress builder" },
        { name: "Linux", level: 85, icon: "🛡️", description: "System security expert" }
      ]
    },
    midfielders: {
      position: "Midfielders",
      skills: [
        { name: "JavaScript", level: 95, icon: "⚡", description: "Core playmaker" },
        { name: "React", level: 90, icon: "⚛️", description: "Frontend orchestrator" },
        { name: "Node.js", level: 85, icon: "🟢", description: "Backend conductor" },
        { name: "TypeScript", level: 85, icon: "🔷", description: "Type safety midfielder" },
        { name: "Python", level: 80, icon: "🐍", description: "Versatile midfielder" }
      ]
    },
    forwards: {
      position: "Forwards",
      skills: [
        { name: "Next.js", level: 80, icon: "▲", description: "Goal scorer" },
        { name: "FastAPI", level: 75, icon: "⚡", description: "Speed striker" },
        { name: "MongoDB", level: 85, icon: "🍃", description: "Database finisher" }
      ]
    }
  };

  const SkillPlayer = ({ skill, position, index, total }) => {
    const isSelected = selectedPlayer === skill.name;
    
    return (
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-110 z-10' : 'hover:scale-105'
        }`}
        onClick={() => setSelectedPlayer(isSelected ? null : skill.name)}
      >
        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-2xl transition-all duration-300 ${
          isSelected 
            ? 'bg-yellow-400 border-yellow-600 shadow-lg' 
            : 'bg-white border-gray-300 hover:border-blue-500 shadow-md'
        }`}>
          {skill.icon}
        </div>
        
        {/* Player name badge */}
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <Badge className="bg-blue-600 text-white text-xs whitespace-nowrap">
            {skill.name}
          </Badge>
        </div>
        
        {/* Skill level indicator */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold ${
          skill.level >= 90 ? 'bg-green-500' : skill.level >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
        }`}>
          {Math.round(skill.level / 20)}
        </div>
      </div>
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
              Technical Skills Formation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              My Tech Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Like a well-organized football team, each technology plays a specific role in building amazing applications.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Football Field */}
      <section className="py-20 bg-gradient-to-b from-green-400 to-green-600 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Field Container */}
            <div className="relative bg-green-500 rounded-lg p-8 shadow-2xl" style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 40px,
                  rgba(255,255,255,0.1) 40px,
                  rgba(255,255,255,0.1) 80px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 40px,
                  rgba(255,255,255,0.1) 40px,
                  rgba(255,255,255,0.1) 80px
                )
              `,
              minHeight: '600px'
            }}>
              {/* Field Lines */}
              <div className="absolute inset-4 border-4 border-white rounded-lg">
                {/* Center Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white transform -translate-x-1/2"></div>
                {/* Center Circle */}
                <div className="absolute top-1/2 left-1/2 w-32 h-32 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* Goal Areas */}
                <div className="absolute top-1/2 left-0 w-16 h-24 border-4 border-white border-l-0 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 w-16 h-24 border-4 border-white border-r-0 transform -translate-y-1/2"></div>
                
                {/* Penalty Areas */}
                <div className="absolute top-1/2 left-0 w-24 h-40 border-4 border-white border-l-0 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-0 w-24 h-40 border-4 border-white border-r-0 transform -translate-y-1/2"></div>
              </div>

              {/* Team Formation */}
              <div className="relative h-full flex flex-col justify-between py-8">
                {/* Goalkeeper */}
                <div className="flex justify-center mb-8">
                  <div className="text-center">
                    <h3 className="text-white font-bold mb-4 bg-black/20 px-3 py-1 rounded">
                      {footballFormation.goalkeeper.position}
                    </h3>
                    <div className="flex space-x-6">
                      {footballFormation.goalkeeper.skills.map((skill, index) => (
                        <SkillPlayer 
                          key={skill.name} 
                          skill={skill} 
                          position="goalkeeper"
                          index={index}
                          total={footballFormation.goalkeeper.skills.length}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Defenders */}
                <div className="flex justify-center mb-8">
                  <div className="text-center">
                    <h3 className="text-white font-bold mb-4 bg-black/20 px-3 py-1 rounded">
                      {footballFormation.defenders.position}
                    </h3>
                    <div className="flex space-x-8">
                      {footballFormation.defenders.skills.map((skill, index) => (
                        <SkillPlayer 
                          key={skill.name} 
                          skill={skill} 
                          position="defenders"
                          index={index}
                          total={footballFormation.defenders.skills.length}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Midfielders */}
                <div className="flex justify-center mb-8">
                  <div className="text-center">
                    <h3 className="text-white font-bold mb-4 bg-black/20 px-3 py-1 rounded">
                      {footballFormation.midfielders.position}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6">
                      {footballFormation.midfielders.skills.map((skill, index) => (
                        <SkillPlayer 
                          key={skill.name} 
                          skill={skill} 
                          position="midfielders"
                          index={index}
                          total={footballFormation.midfielders.skills.length}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Forwards */}
                <div className="flex justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-bold mb-4 bg-black/20 px-3 py-1 rounded">
                      {footballFormation.forwards.position}
                    </h3>
                    <div className="flex space-x-8">
                      {footballFormation.forwards.skills.map((skill, index) => (
                        <SkillPlayer 
                          key={skill.name} 
                          skill={skill} 
                          position="forwards"
                          index={index}
                          total={footballFormation.forwards.skills.length}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                      <Card key={skill.name} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3">
                            <span className="text-3xl">{skill.icon}</span>
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
              Team Statistics
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Overall performance metrics of my technical skills
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">15+</h3>
                  <p className="text-muted-foreground">Technologies Mastered</p>
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
                  <h3 className="text-3xl font-bold mb-2 text-primary">5+</h3>
                  <p className="text-muted-foreground">Years Experience</p>
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
              How to Play
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <h3 className="font-semibold">Click on Any Player</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Click on any skill icon on the football field to see detailed information about that technology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="font-semibold">Formation Strategy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Each position represents the role of technology in development: Defense (Security), Midfield (Core), Forward (Performance).
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