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
  BookOpen
} from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categoryIcons = {
    'Frontend': Code,
    'Backend': Server,
    'Tools & DevOps': Tool
  };

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(category => category.category === selectedCategory);

  const categories = ['all', ...skills.map(skill => skill.category)];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              Technical Skills
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              My Expertise
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive overview of the technologies and tools I use to build exceptional digital experiences.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Skills Overview */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {skills.map((category, index) => {
                const Icon = categoryIcons[category.category];
                const avgLevel = Math.round(
                  category.technologies.reduce((sum, tech) => sum + tech.level, 0) / category.technologies.length
                );
                
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
                      <p className="text-muted-foreground mb-4">{category.technologies.length} Technologies</p>
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-sm text-muted-foreground">Avg Level:</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < avgLevel / 20 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="hover:scale-105 transition-all duration-300"
                >
                  {category === 'all' ? 'All Skills' : category}
                </Button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="space-y-12">
              {filteredSkills.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      {React.createElement(categoryIcons[category.category], { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category.category}</h2>
                      <p className="text-muted-foreground">{category.technologies.length} technologies</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.technologies.map((tech, techIndex) => (
                      <Card key={techIndex} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{tech.icon}</span>
                              <div>
                                <h3 className="font-semibold group-hover:text-primary transition-colors">{tech.name}</h3>
                                <div className="flex items-center space-x-1 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-3 h-3 ${i < tech.level / 20 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {tech.level}%
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Proficiency</span>
                              <span className="text-sm font-medium">{tech.level}%</span>
                            </div>
                            <Progress value={tech.level} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Continuous Learning
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Currently Learning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>🦀 Rust Programming</span>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🤖 Machine Learning</span>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>☁️ Kubernetes</span>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🔗 Blockchain Development</span>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>AWS Certified Developer</span>
                    <Badge>2024</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>React Developer Certification</span>
                    <Badge>2023</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Google Cloud Professional</span>
                    <Badge>2023</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MongoDB Developer</span>
                    <Badge>2022</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Improvement */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Always Growing
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying at the forefront of industry trends and best practices.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <TrendingUp className="w-5 h-5" />
                <span>Continuous Learning</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Code className="w-5 h-5" />
                <span>Open Source Contributions</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <BookOpen className="w-5 h-5" />
                <span>Technical Writing</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Award className="w-5 h-5" />
                <span>Industry Certifications</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;