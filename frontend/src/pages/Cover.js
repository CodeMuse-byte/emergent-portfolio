import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground';
import ScrollReveal from '../components/ScrollReveal';
import { personalInfo } from '../data/mockData';
import { 
  Play, 
  FileText, 
  Github, 
  Linkedin, 
  Twitter, 
  Sparkles,
  Code,
  Zap,
  Sun,
  Moon,
  Gamepad2,
  ArrowLeft
} from 'lucide-react';

const Cover = () => {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const dynamicTexts = [
    "Full Stack Developer",
    "Problem Solver",
    "Code Architect",
    "Digital Innovator"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: personalInfo.twitter, label: 'Twitter' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Theme Toggle Button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/30 hover:scale-110 transition-all duration-300"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </Button>
      </div>



      <AnimatedBackground className="absolute inset-0">
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Main Content - Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-6">
                  {/* Greeting */}
                  <div className="mb-8">
                    <ScrollReveal delay={200}>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                        <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="text-sm font-medium text-muted-foreground">
                          Welcome to my digital space
                        </span>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={400}>
                      <div className="relative mb-4">
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          Hello
                        </h1>
                        {/* Playground Button positioned to the right corner of 'hello' */}
                        <Link 
                          to="/playground" 
                          className="absolute top-0 right-0 p-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm hover:from-purple-500/30 hover:to-blue-500/30 hover:scale-110 transition-all duration-300 group"
                        >
                          <Gamepad2 size={24} className="text-purple-500 group-hover:text-purple-400" />
                        </Link>
                      </div>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={600}>
                      <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                        I'm <span className="font-semibold text-foreground">{personalInfo.name}</span>
                      </p>
                    </ScrollReveal>
                    
                    <ScrollReveal delay={800}>
                      <div className="h-16 flex items-start justify-start mb-8">
                        <div className="text-2xl md:text-3xl font-semibold">
                          <span className="text-muted-foreground">A passionate </span>
                          <span 
                            key={textIndex}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse"
                          >
                            {dynamicTexts[textIndex]}
                          </span>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Action Buttons */}
                  <ScrollReveal delay={1000}>
                    <div className="flex flex-col sm:flex-row gap-6 justify-start items-start mb-12">
                      <Button 
                        size="lg" 
                        asChild
                        className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Link to="/portfolio">
                          <div className="flex items-center space-x-3">
                            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span>Start Story</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="group px-8 py-6 text-lg font-semibold rounded-full border-2 border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
                        onClick={() => window.open(personalInfo.resume, '_blank')}
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                          <span>View Resume</span>
                        </div>
                      </Button>
                    </div>
                  </ScrollReveal>

                  {/* Social Links */}
                  <ScrollReveal delay={1200}>
                    <div className="flex justify-start space-x-6 mb-12">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="icon"
                          asChild
                          className="rounded-full hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:scale-110 transition-all duration-300"
                        >
                          <a 
                            href={social.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            <social.icon className="w-6 h-6" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Column - Profile Photo */}
                <ScrollReveal delay={1400} direction="right">
                  <div className="relative max-w-md mx-auto lg:max-w-full">
                    {/* Profile Photo Container */}
                    <div className="relative">
                      {/* Background Gradient Circle */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full scale-105 opacity-20 animate-pulse"></div>
                      
                      {/* Profile Photo */}
                      <div className="relative overflow-hidden rounded-full aspect-square">
                        <img 
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc1Mjc3MTk4MHww&ixlib=rb-4.1.0&q=85"
                          alt="Professional Profile"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent"></div>
                      </div>
                      
                      {/* Floating Elements Around Photo */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60 animate-pulse delay-2000"></div>
                      <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-40 animate-pulse delay-3000"></div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </AnimatedBackground>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-20 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-20 animate-pulse delay-2000" />
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 animate-pulse delay-3000" />
    </div>
  );
};

export default Cover;