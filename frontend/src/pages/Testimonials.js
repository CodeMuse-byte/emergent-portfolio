import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import AnimatedBackground from '../components/AnimatedBackground';
import { testimonials } from '../data/mockData';
import { 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Users,
  ThumbsUp,
  MessageSquare,
  Award,
  Building,
  User,
  Send,
  Clock,
  CheckCheck
} from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState([]);

  // Animation for testimonials appearing one by one
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleTestimonials(prev => {
        if (prev.length < testimonials.length) {
          return [...prev, testimonials[prev.length]];
        }
        return prev;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [visibleTestimonials]);

  // Initialize first testimonial
  useEffect(() => {
    if (visibleTestimonials.length === 0) {
      setVisibleTestimonials([testimonials[0]]);
    }
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Chat bubble component with 3D effects
  const ChatBubble = ({ testimonial, index, isLeft = false }) => {
    const bubbleDelay = index * 0.5;
    
    return (
      <div 
        className={`flex items-end gap-4 mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} 
          transform-gpu animate-fadeInUp`}
        style={{
          animationDelay: `${bubbleDelay}s`,
          animationFillMode: 'both'
        }}
      >
        {/* Profile Avatar with 3D effect */}
        <div className="flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full scale-110 opacity-0 group-hover:opacity-20 transition-all duration-300 blur-sm"></div>
          <Avatar className="w-12 h-12 ring-2 ring-white/20 shadow-lg transform-gpu hover:scale-110 transition-all duration-300 relative z-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>

        {/* Speech Bubble with 3D effect */}
        <div className={`relative max-w-md group ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
          {/* 3D Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl transform translate-x-1 translate-y-1 blur-sm opacity-60"></div>
          
          {/* Main bubble */}
          <div className={`relative bg-gradient-to-br ${isLeft ? 'from-white to-gray-50' : 'from-purple-500 to-blue-500'} 
            rounded-2xl p-6 shadow-xl transform-gpu hover:scale-105 transition-all duration-300 
            backdrop-blur-sm border border-white/20`}>
            
            {/* Bubble tail */}
            <div className={`absolute top-4 ${isLeft ? '-left-2' : '-right-2'} w-4 h-4 
              bg-gradient-to-br ${isLeft ? 'from-white to-gray-50' : 'from-purple-500 to-blue-500'} 
              rotate-45 border-l border-t border-white/20`}></div>
            
            {/* Message content */}
            <div className="relative z-10">
              <p className={`text-sm leading-relaxed ${isLeft ? 'text-gray-800' : 'text-white'} mb-3`}>
                {testimonial.content}
              </p>
              
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              {/* Sender info */}
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold text-sm ${isLeft ? 'text-gray-900' : 'text-white'}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-xs ${isLeft ? 'text-gray-600' : 'text-white/80'}`}>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className={`w-3 h-3 ${isLeft ? 'text-gray-400' : 'text-white/60'}`} />
                  <CheckCheck className={`w-4 h-4 ${isLeft ? 'text-blue-500' : 'text-white/80'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 transition-all duration-500 hover:scale-105">
              Client Testimonials
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse">
              What People Say
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-700 hover:text-foreground">
              Hear from clients and colleagues about their experience working with me.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* 3D Chat Interface Section */}
      <section className="py-20 relative overflow-hidden">
        {/* 3D Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        
        {/* Floating 3D Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20 backdrop-blur-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Client Messages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                What Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real conversations with satisfied clients who trusted me with their projects.
              </p>
            </div>

            {/* Chat Interface */}
            <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform-gpu hover:scale-[1.02] transition-all duration-500">
              {/* Chat Header Bar */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-gray-800">Client Testimonials</h3>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Online</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                {visibleTestimonials.map((testimonial, index) => (
                  <ChatBubble 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                    index={index} 
                    isLeft={index % 2 === 0}
                  />
                ))}
                
                {/* Typing indicator */}
                {visibleTestimonials.length < testimonials.length && (
                  <div className="flex items-center gap-4 opacity-60">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        ...
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input (decorative) */}
              <div className="mt-6 pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-3 bg-gray-100/50 rounded-full p-3">
                  <div className="flex-1 px-4 py-2 text-gray-500 text-sm">
                    Share your experience working with Alex...
                  </div>
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the list of satisfied clients who have trusted me with their projects. Let's create something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="group hover:scale-105 transition-all duration-300">
                <User className="w-5 h-5 mr-2 group-hover:bounce transition-transform" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="group hover:scale-105 transition-all duration-300">
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;