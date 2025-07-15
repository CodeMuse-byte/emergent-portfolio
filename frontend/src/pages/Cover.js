import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground';
import { personalInfo } from '../data/mockData';
import { 
  Play, 
  FileText, 
  Github, 
  Linkedin, 
  Twitter, 
  ChevronDown,
  Sparkles,
  Code,
  Zap,
  Sun,
  Moon
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
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Content */}
              <div className={`transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                {/* Greeting */}
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Welcome to my digital space
                    </span>
                  </div>
                  
                  <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Hello
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                    I'm <span className="font-semibold text-foreground">{personalInfo.name}</span>
                  </p>
                  
                  <div className="h-16 flex items-center justify-center mb-8">
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
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
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

                {/* Social Links */}
                <div className="flex justify-center space-x-6 mb-12">
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

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">50+</h3>
                      <p className="text-muted-foreground">Projects Built</p>
                    </div>
                  </div>
                  
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">5+</h3>
                      <p className="text-muted-foreground">Years Experience</p>
                    </div>
                  </div>
                  
                  <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
                    <div className="text-center">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">30+</h3>
                      <p className="text-muted-foreground">Happy Clients</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-sm text-muted-foreground">Scroll to explore</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </div>
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