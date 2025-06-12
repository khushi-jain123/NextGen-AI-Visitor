import React from 'react';
import { useAISimulation } from '../contexts/AISimulationContext';
import { 
  Brain, 
  Users, 
  Target, 
  BarChart3, 
  Zap, 
  Eye, 
  TrendingUp, 
  Shield,
  Globe,
  Smartphone,
  Clock,
  Sparkles
} from 'lucide-react';

const Features: React.FC = () => {
  const { analytics, currentVisitor } = useAISimulation();

  const features = [
    {
      category: 'AI Simulation',
      items: [
        {
          icon: Brain,
          title: 'Intelligent Persona Generation',
          description: 'Creates realistic visitor profiles with demographic data, interests, and behavioral patterns using advanced AI algorithms.',
          highlight: 'Real-time AI processing',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          icon: Users,
          title: 'Behavioral Pattern Analysis',
          description: 'Simulates authentic user interactions including page views, clicks, form submissions, and navigation patterns.',
          highlight: 'Behavioral psychology based',
          color: 'from-purple-500 to-pink-500'
        },
        {
          icon: Globe,
          title: 'Geographic Distribution',
          description: 'Generates visitors from diverse global locations with region-specific behavior patterns and preferences.',
          highlight: '20+ global locations',
          color: 'from-green-500 to-teal-500'
        }
      ]
    },
    {
      category: 'Personalization Engine',
      items: [
        {
          icon: Target,
          title: 'Dynamic Content Adaptation',
          description: 'Automatically adjusts headlines, descriptions, and call-to-actions based on visitor interests and demographics.',
          highlight: 'Real-time content switching',
          color: 'from-orange-500 to-red-500'
        },
        {
          icon: Eye,
          title: 'Interest-Based Targeting',
          description: 'Analyzes visitor interests to display relevant content themes including technology, business, healthcare, and more.',
          highlight: '20+ interest categories',
          color: 'from-indigo-500 to-purple-500'
        },
        {
          icon: Smartphone,
          title: 'Device-Aware Experiences',
          description: 'Optimizes content presentation and interaction patterns based on device type (desktop, mobile, tablet).',
          highlight: 'Cross-device optimization',
          color: 'from-pink-500 to-rose-500'
        }
      ]
    },
    {
      category: 'Analytics & Insights',
      items: [
        {
          icon: BarChart3,
          title: 'Real-Time Dashboard',
          description: 'Comprehensive analytics showing visitor activity, engagement metrics, and demographic breakdowns in real-time.',
          highlight: 'Live data streaming',
          color: 'from-cyan-500 to-blue-500'
        },
        {
          icon: TrendingUp,
          title: 'Engagement Scoring',
          description: 'Advanced algorithms calculate visitor engagement scores based on session duration, interactions, and interest alignment.',
          highlight: 'AI-powered scoring',
          color: 'from-emerald-500 to-green-500'
        },
        {
          icon: Clock,
          title: 'Temporal Analysis',
          description: 'Tracks visitor behavior patterns over time, identifying peak activity periods and engagement trends.',
          highlight: 'Time-series analysis',
          color: 'from-amber-500 to-orange-500'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Advanced AI Technology
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI Analytics</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our cutting-edge AI simulation platform transforms visitor analysis
            with intelligent personas, dynamic personalization, and real-time insights.
          </p>
        </div>

        {/* Live Stats Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border-l-4 border-blue-500">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-gray-700 font-medium">Live Simulation Active</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-gray-600">
                Active Visitors: <span className="font-bold text-blue-600">{analytics.activeVisitors}</span>
              </div>
              <div className="text-gray-600">
                Total Sessions: <span className="font-bold text-purple-600">{analytics.totalVisitors}</span>
              </div>
              {currentVisitor && (
                <div className="text-gray-600">
                  Current: <span className="font-bold text-green-600">{currentVisitor.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Sections */}
        {features.map((section, sectionIndex) => (
          <div key={section.category} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{section.category}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {section.items.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>

                    {/* Highlight Badge */}
                    <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${feature.color} rounded-full text-white text-sm font-medium`}>
                      <Zap className="h-3 w-3 mr-1" />
                      {feature.highlight}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r ${feature.color} rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-20`}></div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Integration Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white mb-12">
          <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">Enterprise-Ready Integration</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Seamlessly integrate with your existing analytics stack. MongoDB-ready data storage,
            RESTful APIs, and real-time webhooks for enterprise-scale deployments.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              'MongoDB Integration',
              'RESTful API Access',
              'Real-time Webhooks'
            ].map((feature, index) => (
              <div key={feature} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="font-semibold">{feature}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Analytics?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven visitor simulation and see how it can
            revolutionize your understanding of user behavior.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Brain className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Start Free Trial
            </button>
            <button className="group inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
              View Documentation
              <TrendingUp className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;