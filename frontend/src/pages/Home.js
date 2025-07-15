import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import AnimatedBackground from '../components/AnimatedBackground';
import { personalInfo, projects, skills } from '../data/mockData';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Download, 
  ArrowRight, 
  Code, 
  Sparkles,
  Star,
  Users,
  Trophy
} from 'lucide-react';

const Home = () => {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  const topSkills = skills.flatMap(category => category.technologies)
    .sort((a, b) => b.level - a.level)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Available for new projects
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
                {personalInfo.name}
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-muted-foreground">
                {personalInfo.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {personalInfo.tagline}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" asChild className="group hover:scale-105 transition-all duration-300">
                <Link to="/projects">
                  <Code className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group hover:scale-105 transition-all duration-300">
                <Download className="w-5 h-5 mr-2 group-hover:bounce transition-transform" />
                Download Resume
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300">
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform duration-300">
                <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-6 h-6" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </AnimatedBackground>

      {/* Stats Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">50+</h3>
              <p className="text-muted-foreground">Projects Completed</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">30+</h3>
              <p className="text-muted-foreground">Happy Clients</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-primary">5+</h3>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and experience in web development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            View Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild className="group hover:scale-105 transition-all duration-300">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Top Skills
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Technologies I work with to bring ideas to life
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {topSkills.map((skill, index) => (
                <div key={skill.name} className="group hover:scale-105 transition-transform duration-300">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-3">{skill.icon}</div>
                    <h3 className="font-semibold mb-2">{skill.name}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < skill.level / 20 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button size="lg" variant="outline" asChild className="group hover:scale-105 transition-all duration-300">
                <Link to="/skills">
                  View All Skills
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new challenges and help bring your ideas to life. Let's discuss your project and see how we can work together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="group hover:scale-105 transition-all duration-300">
                <Link to="/contact">
                  Get In Touch
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group hover:scale-105 transition-all duration-300">
                <Link to="/about">
                  Learn More About Me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;