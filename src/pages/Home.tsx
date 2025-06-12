import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAISimulation } from '../contexts/AISimulationContext';
import { 
  Users, 
  Brain, 
  BarChart3, 
  Zap, 
  Target, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Play
} from 'lucide-react';

const Home: React.FC = () => {
  const { currentVisitor, analytics, personalizationContent } = useAISimulation();
  const [visibleStats, setVisibleStats] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  // Get personalized content based on current visitor
  const getPersonalizedContent = () => {
    if (!currentVisitor) {
      return personalizationContent[0]; // Default content
    }
    
    // Find content that matches visitor's interests
    const matchingContent = personalizationContent.find(content =>
      content.targetInterests.some(interest =>
        currentVisitor.interests.includes(interest)
      )
    );
    
    return matchingContent || personalizationContent[0];
  };

  const personalizedContent = getPersonalizedContent();

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 500);
    
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 15
    }));
    setParticles(newParticles);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Enhanced AI Personalization */}
      <section className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br ${personalizedContent.content.backgroundColor} overflow-hidden`}>
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          {/* Primary blob animations */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-cyan-200 rounded-full mix-blend-multiply filter blur-lg animate-float animation-delay-1000"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-lg animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-lg animate-pulse-glow animation-delay-3000"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles-container">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle animate-particle-float"
              style={{
                left: `${particle.x}%`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Background Shapes */}
        <div className="geometric-bg">
          <div className="geometric-shape shape-circle w-16 h-16 top-1/4 left-1/4 animate-drift"></div>
          <div className="geometric-shape shape-square w-12 h-12 top-3/4 right-1/4 animate-drift animation-delay-4000"></div>
          <div className="geometric-shape shape-circle w-20 h-20 bottom-1/4 left-3/4 animate-float animation-delay-2000"></div>
          <div className="shape-triangle top-1/2 right-1/2 animate-sparkle animation-delay-6000"></div>
        </div>

        {/* Neural Network Animation */}
        <div className="neural-network">
          <div className="neural-node top-1/4 left-1/4 animation-delay-1000"></div>
          <div className="neural-node top-1/3 right-1/3 animation-delay-2000"></div>
          <div className="neural-node bottom-1/4 left-1/2 animation-delay-3000"></div>
          <div className="neural-connection top-1/4 left-1/4 w-32 transform rotate-45 animation-delay-1000"></div>
          <div className="neural-connection top-1/3 right-1/3 w-24 transform -rotate-12 animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* AI Personalization Indicator with enhanced animation */}
          {currentVisitor && (
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 animate-fade-in glow-effect">
              <Sparkles className="h-4 w-4 mr-2 animate-sparkle" />
              Personalized for {currentVisitor.name} from {currentVisitor.location}
            </div>
          )}

          <h1 className={`text-5xl md:text-7xl font-bold ${personalizedContent.content.textColor} mb-6 animate-slide-up`}>
            {personalizedContent.content.headline}
          </h1>
          
          <p className={`text-xl md:text-2xl ${personalizedContent.content.textColor}/90 mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-200`}>
            {personalizedContent.content.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up animation-delay-400">
            <Link
              to="/dashboard"
              className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl glow-effect"
            >
              <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              {personalizedContent.content.ctaText}
            </Link>
            
            <Link
              to="/features"
              className="group inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200 hover-lift"
            >
              Learn More
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Enhanced Real-time Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 ${
            visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {[
              { label: 'Active Visitors', value: analytics.activeVisitors, icon: Users },
              { label: 'Total Sessions', value: analytics.totalVisitors, icon: BarChart3 },
              { label: 'Avg Duration', value: `${analytics.avgSessionDuration}s`, icon: TrendingUp },
              { label: 'AI Powered', value: '100%', icon: Brain }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-float glow-effect"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-white/80 animate-pulse-glow" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center glow-effect">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-wave"></div>
          </div>
        </div>
      </section>

      {/* Features Preview Section with Enhanced Background */}
      <section className="py-20 bg-gradient-animated relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full animate-drift"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-200 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-200 rounded-full animate-pulse-glow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
              Experience AI-Powered Analytics
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              Our platform simulates real visitor behavior using advanced AI algorithms,
              providing insights that transform how you understand your audience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Visitor Simulation',
                description: 'Generate realistic visitor personas with authentic behavioral patterns based on demographics and interests.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Target,
                title: 'Dynamic Personalization',
                description: 'Watch content adapt in real-time based on visitor profiles, interests, and engagement patterns.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Comprehensive dashboards with real-time metrics, behavioral insights, and predictive analytics.',
                color: 'from-green-500 to-teal-500'
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden animate-slide-up glow-effect"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative p-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 animate-float`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section with Enhanced Animations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-5">
          <div className="geometric-shape shape-circle w-24 h-24 top-1/4 left-1/4 animate-drift"></div>
          <div className="geometric-shape shape-square w-16 h-16 top-3/4 right-1/4 animate-float animation-delay-4000"></div>
          <div className="geometric-shape shape-circle w-32 h-32 bottom-1/4 left-3/4 animate-pulse-glow animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 animate-fade-in">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            The content you're seeing right now is being personalized based on simulated visitor data.
            Every refresh brings new insights and adaptive experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400">
            <Link
              to="/dashboard"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl glow-effect"
            >
              <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Explore Dashboard
            </Link>
            
            <Link
              to="/features"
              className="group inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-200 hover-lift"
            >
              View Features
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;