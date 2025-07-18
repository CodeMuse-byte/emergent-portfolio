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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedBackground className="relative overflow-hidden">
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
              Client Testimonials
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              What People Say
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Hear from clients and colleagues about their experience working with me.
            </p>
          </div>
        </section>
      </AnimatedBackground>

      {/* Stats Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Happy Clients', value: '30+', icon: Users },
              { label: 'Projects Delivered', value: '50+', icon: Award },
              { label: 'Client Satisfaction', value: '98%', icon: ThumbsUp },
              { label: 'Testimonials', value: testimonials.length, icon: MessageSquare }
            ].map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-primary">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center mb-8">
                  <Quote className="w-16 h-16 text-purple-500 opacity-20" />
                </div>
                
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 italic">
                    "{currentTestimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < currentTestimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                      <AvatarFallback>
                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h4 className="font-semibold">{currentTestimonial.name}</h4>
                      <p className="text-muted-foreground">{currentTestimonial.role}</p>
                      <p className="text-sm text-muted-foreground">{currentTestimonial.company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={prevTestimonial}
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={nextTestimonial}
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              All Testimonials
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-3 pt-4 border-t border-border">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Building className="w-3 h-3 mr-1" />
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by Great Companies
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              I've had the privilege of working with these amazing organizations
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
              {[
                { name: 'TechCorp Inc.', logo: '🏢' },
                { name: 'StartupXYZ', logo: '🚀' },
                { name: 'Creative Agency', logo: '🎨' },
                { name: 'InnovateNow', logo: '💡' },
                { name: 'GlobalTech', logo: '🌐' },
                { name: 'DevStudio', logo: '⚡' },
                { name: 'CloudTech', logo: '☁️' },
                { name: 'NextGen', logo: '🔮' }
              ].map((company, index) => (
                <div key={index} className="group hover:scale-110 transition-transform duration-300">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-2">{company.logo}</div>
                    <p className="text-sm text-muted-foreground">{company.name}</p>
                  </Card>
                </div>
              ))}
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