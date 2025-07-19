import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { testimonials } from '../data/mockData';
import { 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Building,
  User,
  Send,
  Clock,
  CheckCheck
} from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState([]);

  // Animation for testimonials appearing one by one - ultra-smooth progression
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleTestimonials(prev => {
        if (prev.length < testimonials.length) {
          return [...prev, testimonials[prev.length]];
        }
        return prev;
      });
    }, 400); // Reduced to 400ms for ultra-smooth progression

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

  // Chat bubble component with ultra-smooth animations
  const ChatBubble = ({ testimonial, index, isLeft = false }) => {
    const bubbleDelay = index * 0.2; // Even faster sequence
    
    return (
      <div 
        className={`flex items-end gap-4 mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} 
          transform-gpu animate-fadeInUp transition-all duration-700 hover:scale-[1.02]`}
        style={{
          animationDelay: `${bubbleDelay}s`,
          animationDuration: '1.2s',
          animationFillMode: 'both',
          willChange: 'transform, opacity'
        }}
      >
        {/* Profile Avatar with ultra-smooth effects */}
        <div className="flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full scale-110 opacity-0 group-hover:opacity-40 transition-all duration-700 blur-sm animate-pulse"></div>
          <Avatar className="w-12 h-12 ring-2 ring-white/20 shadow-lg transform-gpu hover:scale-125 transition-all duration-700 relative z-10 hover:rotate-6 hover:shadow-xl hover:shadow-purple-500/30">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white transition-all duration-700 hover:from-purple-600 hover:to-blue-600">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {/* Ultra-smooth online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse transition-all duration-700 hover:scale-125 hover:shadow-green-500/50"></div>
        </div>

        {/* Speech Bubble with ultra-smooth effects */}
        <div className={`relative max-w-md group ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
          {/* Ultra-smooth 3D Shadow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl transform translate-x-1 translate-y-1 blur-sm opacity-60 transition-all duration-700 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:opacity-80"></div>
          
          {/* Main bubble with ultra-smooth effects */}
          <div className={`relative bg-gradient-to-br ${isLeft ? 'from-white to-gray-50' : 'from-purple-500 to-blue-500'} 
            rounded-2xl p-6 shadow-xl transform-gpu hover:scale-110 transition-all duration-700 
            backdrop-blur-sm border border-white/20 hover:shadow-2xl hover:rotate-1 hover:border-purple-300/30
            ${!isLeft ? 'hover:from-purple-600 hover:to-blue-600' : 'hover:from-gray-50 hover:to-white'}`}>
            
            {/* Bubble tail with smooth animation */}
            <div className={`absolute top-4 ${isLeft ? '-left-2' : '-right-2'} w-4 h-4 
              bg-gradient-to-br ${isLeft ? 'from-white to-gray-50' : 'from-purple-500 to-blue-500'} 
              rotate-45 border-l border-t border-white/20 transition-all duration-700 group-hover:scale-125`}></div>
            
            {/* Message content with smooth transitions */}
            <div className="relative z-10">
              <p className={`text-sm leading-relaxed ${isLeft ? 'text-gray-800' : 'text-white'} mb-3 transition-all duration-700 hover:scale-105`}>
                {testimonial.content}
              </p>
              
              {/* Ultra-smooth rating stars */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 transition-all duration-700 hover:scale-150 hover:rotate-12 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400 hover:fill-yellow-300 hover:text-yellow-300' : 'text-gray-300 hover:text-gray-400'}`}
                    style={{
                      animationDelay: `${bubbleDelay + (i * 0.1)}s`,
                      willChange: 'transform'
                    }}
                  />
                ))}
              </div>
              
              {/* Sender info with ultra-smooth transitions */}
              <div className="flex items-center justify-between">
                <div className="transition-all duration-700 hover:scale-110 hover:translate-x-1">
                  <p className={`font-semibold text-sm ${isLeft ? 'text-gray-900' : 'text-white'} transition-all duration-500 hover:tracking-wide`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-xs ${isLeft ? 'text-gray-600' : 'text-white/80'} transition-all duration-500 hover:text-opacity-100`}>
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
                <div className="flex items-center gap-1 transition-all duration-700 hover:scale-125 hover:rotate-12">
                  <Clock className={`w-3 h-3 ${isLeft ? 'text-gray-400 hover:text-gray-600' : 'text-white/60 hover:text-white/80'} transition-all duration-500`} />
                  <CheckCheck className={`w-4 h-4 ${isLeft ? 'text-blue-500 hover:text-blue-600' : 'text-white/80 hover:text-white'} transition-all duration-500`} />
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
      {/* 3D Chat Interface Section with Header */}
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
            {/* Main Header - What Client Say with ultra-smooth animations */}
            <div className="text-center mb-12 transform-gpu transition-all duration-1000 hover:scale-105">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-pulse transition-all duration-1000 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 hover:scale-110 hover:tracking-wide">
                What Clients Say
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 hover:text-foreground hover:scale-105 hover:tracking-wide">
                Real conversations with satisfied clients who trusted me with their projects.
              </p>
            </div>

            {/* Fixed Chat Interface with scroll isolation */}
            <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform-gpu hover:scale-[1.02] transition-all duration-700 hover:shadow-3xl fixed top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl z-30 testimonials-container">
              {/* Fixed Chat Header Bar */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full transition-all duration-500 hover:scale-125 hover:shadow-lg hover:shadow-red-500/50"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full transition-all duration-500 hover:scale-125 delay-100 hover:shadow-lg hover:shadow-yellow-500/50"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full transition-all duration-500 hover:scale-125 delay-200 hover:shadow-lg hover:shadow-green-500/50"></div>
                  </div>
                  <h3 className="font-semibold text-gray-800 transition-all duration-500 hover:text-purple-600 hover:scale-105">Client Testimonials</h3>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-sm font-medium transition-all duration-500 hover:text-green-700 hover:scale-105">Online</span>
                </div>
              </div>

              {/* Chat Messages with enhanced scrolling and scroll isolation */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar smooth-scroll testimonials-scroll">
                {visibleTestimonials.map((testimonial, index) => (
                  <ChatBubble 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                    index={index} 
                    isLeft={index % 2 === 0}
                  />
                ))}
                
                {/* Enhanced typing indicator */}
                {visibleTestimonials.length < testimonials.length && (
                  <div className="flex items-center gap-4 opacity-60 animate-fadeIn">
                    <Avatar className="w-12 h-12 animate-pulse transition-all duration-700 hover:scale-110">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        ...
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input with enhanced interactivity */}
              <div className="mt-6 pt-6 border-t border-gray-200/50">
                <div className="flex items-center gap-3 bg-gray-100/50 rounded-full p-3 transition-all duration-500 hover:bg-gray-100/70 hover:scale-[1.02] hover:shadow-lg">
                  <div className="flex-1 px-4 py-2 text-gray-500 text-sm transition-all duration-500 hover:text-gray-700">
                    Share your experience working with Alex...
                  </div>
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-700 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30">
                    <Send className="w-4 h-4 transition-transform duration-500 hover:translate-x-1 hover:rotate-12" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for better scrolling experience */}
      <div className="h-screen"></div>

      {/* CTA Section with enhanced smoothness */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transition-all duration-700 hover:scale-105">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-500 hover:text-foreground">
              Join the list of satisfied clients who have trusted me with their projects. Let's create something amazing together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="group hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                <User className="w-5 h-5 mr-2 group-hover:bounce transition-transform duration-300" />
                Start Your Project
              </Button>
              <Button size="lg" variant="outline" className="group hover:scale-105 transition-all duration-500 hover:shadow-xl">
                <MessageSquare className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
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