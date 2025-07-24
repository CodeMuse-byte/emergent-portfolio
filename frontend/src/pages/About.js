import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import AnimatedBackground from '../components/AnimatedBackground';
import { aboutContent, personalInfo } from '../data/mockData';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Users, 
  Code,
  CheckCircle,
  Download,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: aboutContent.experience, icon: Calendar },
    { label: 'Projects Completed', value: aboutContent.projectsCompleted, icon: Code },
    { label: 'Happy Clients', value: aboutContent.clientsSatisfied, icon: Users },
    { label: 'Awards Won', value: '10+', icon: Award }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              About Me
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#1e1a2e] via-[#5c4f6e] to-[#b3A8C9] bg-clip-text text-transparent">
              Crafting Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm a passionate full stack developer who loves turning complex problems into simple, beautiful solutions.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Stats Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - About Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  My Story
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground mb-8">
                  <p className="leading-relaxed">
                    {aboutContent.bio}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {aboutContent.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button size="lg" className="group hover:scale-105 transition-all duration-300">
                    <Download className="w-5 h-5 mr-2 group-hover:bounce transition-transform" />
                    Download Resume
                  </Button>
                </div>
              </div>

              {/* Right Column - Contact Info & Skills */}
              <div className="space-y-8">
                {/* Contact Information */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <a href={`tel:${personalInfo.phone}`} className="hover:text-primary transition-colors">
                        {personalInfo.phone}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Work Approach */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      My Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">User-Centered Design</span>
                          <span className="text-sm text-muted-foreground">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Code Quality</span>
                          <span className="text-sm text-muted-foreground">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Performance Focus</span>
                          <span className="text-sm text-muted-foreground">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Collaboration</span>
                          <span className="text-sm text-muted-foreground">98%</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Values */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Core Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Clean, maintainable code</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Continuous learning</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                        <span>User experience first</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Effective communication</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              My Journey
            </h2>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
              
              <div className="space-y-12">
                {[
                  {
                    year: "2024",
                    title: "Senior Full Stack Developer",
                    company: "TechCorp Inc.",
                    description: "Leading a team of 5 developers, architecting scalable solutions, and mentoring junior developers.",
                    side: "left"
                  },
                  {
                    year: "2022",
                    title: "Full Stack Developer",
                    company: "StartupXYZ",
                    description: "Built the entire platform from scratch, handling both frontend and backend development.",
                    side: "right"
                  },
                  {
                    year: "2020",
                    title: "Frontend Developer",
                    company: "Creative Agency",
                    description: "Specialized in React development and created engaging user interfaces for various clients.",
                    side: "left"
                  },
                  {
                    year: "2019",
                    title: "Junior Developer",
                    company: "FirstJob Co.",
                    description: "Started my professional journey, learned the fundamentals of web development.",
                    side: "right"
                  }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${item.side === 'left' ? 'justify-start' : 'justify-end'}`}>
                    <Card className={`w-80 hover:shadow-lg transition-all duration-300 hover:scale-105 ${item.side === 'left' ? 'mr-8' : 'ml-8'}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{item.year}</Badge>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{item.company}</p>
                        <p className="text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full relative z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;