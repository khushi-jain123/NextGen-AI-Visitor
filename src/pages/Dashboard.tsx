import React, { useState, useEffect } from 'react';
import { useAISimulation } from '../contexts/AISimulationContext';
import { 
  Users, 
  Activity, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Smartphone,
  Brain,
  Eye,
  BarChart3,
  Zap
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { visitors, analytics, currentVisitor, behaviors } = useAISimulation();
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'behavior'>('overview');
  const [animateStats, setAnimateStats] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 300);
    
    // Generate background particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10
    }));
    setParticles(newParticles);
    
    return () => clearTimeout(timer);
  }, []);

  // Get recent activities
  const recentActivities = behaviors.slice(-10).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-300 rounded-full animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-300 rounded-full animate-pulse-glow animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-particle-float opacity-30"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 animate-fade-in animation-delay-200">
                Real-time insights from AI-powered visitor simulation
              </p>
            </div>
            <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full animate-pulse-glow">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
              Live Simulation Active
            </div>
          </div>
        </div>

        {/* Key Metrics with Enhanced Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Visitors',
              value: analytics.totalVisitors,
              icon: Users,
              color: 'from-blue-500 to-blue-600',
              change: '+12%'
            },
            {
              label: 'Active Now',
              value: analytics.activeVisitors,
              icon: Activity,
              color: 'from-green-500 to-green-600',
              change: '+5%'
            },
            {
              label: 'Avg Session',
              value: `${analytics.avgSessionDuration}s`,
              icon: Clock,
              color: 'from-purple-500 to-purple-600',
              change: '+8%'
            },
            {
              label: 'Engagement',
              value: currentVisitor ? `${currentVisitor.interactionScore}%` : '0%',
              icon: TrendingUp,
              color: 'from-orange-500 to-orange-600',
              change: '+15%'
            }
          ].map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 glow-effect animate-float ${
                animateStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} animate-pulse-glow`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-500 text-sm font-medium animate-sparkle">{metric.change}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Current Visitor Spotlight with Enhanced Animation */}
        {currentVisitor && (
          <div className="bg-gradient-animated rounded-2xl p-6 mb-8 text-white animate-slide-up glow-effect">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-full mr-4 animate-pulse-glow">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Current Visitor Spotlight</h3>
                  <p className="opacity-90">Real-time personalization active</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="animate-fade-in">
                  <div className="text-2xl font-bold">{currentVisitor.name}</div>
                  <div className="text-sm opacity-75">Name</div>
                </div>
                <div className="animate-fade-in animation-delay-200">
                  <div className="text-2xl font-bold">{currentVisitor.age}</div>
                  <div className="text-sm opacity-75">Age</div>
                </div>
                <div className="animate-fade-in animation-delay-400">
                  <div className="text-2xl font-bold">{currentVisitor.deviceType}</div>
                  <div className="text-sm opacity-75">Device</div>
                </div>
                <div className="animate-fade-in animation-delay-600">
                  <div className="text-2xl font-bold">{currentVisitor.interactionScore}%</div>
                  <div className="text-sm opacity-75">Engagement</div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm opacity-75">Interests:</span>
                {currentVisitor.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-white/20 rounded-full text-sm animate-sparkle"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation with Enhanced Styling */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 animate-slide-up glow-effect">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'visitors', label: 'Visitor Profiles', icon: Users },
                { id: 'behavior', label: 'Live Activity', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all duration-300 hover-lift ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50 glow-effect'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Charts Row */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Top Interests */}
                  <div className="animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Interests</h3>
                    <div className="space-y-3">
                      {analytics.topInterests.slice(0, 5).map((interest, index) => (
                        <div key={interest.interest} className="flex items-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="flex-1 flex items-center">
                            <span className="text-sm font-medium text-gray-900 w-20">
                              {interest.interest}
                            </span>
                            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 animate-wave"
                                style={{ 
                                  width: `${(interest.count / Math.max(...analytics.topInterests.map(i => i.count))) * 100}%` 
                                }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{interest.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Breakdown */}
                  <div className="animate-fade-in animation-delay-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Types</h3>
                    <div className="space-y-4">
                      {analytics.deviceBreakdown.map((device, index) => {
                        const total = analytics.deviceBreakdown.reduce((sum, d) => sum + d.count, 0);
                        const percentage = total > 0 ? (device.count / total) * 100 : 0;
                        const colors = ['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600'];
                        
                        return (
                          <div key={device.device} className="flex items-center justify-between animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                            <div className="flex items-center">
                              <Smartphone className="h-5 w-5 text-gray-400 mr-3 animate-float" />
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {device.device}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-3">
                                <div
                                  className={`bg-gradient-to-r ${colors[index % colors.length]} h-2 rounded-full transition-all duration-1000 animate-wave`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 w-12">
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div className="animate-fade-in animation-delay-400">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analytics.locationBreakdown.slice(0, 6).map((location, index) => (
                      <div 
                        key={location.location} 
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover-lift animate-slide-up glow-effect"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <MapPin className="h-5 w-5 text-blue-500 mr-3 animate-pulse-glow" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{location.location}</div>
                          <div className="text-xs text-gray-600">{location.count} visitors</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Visitors Tab */}
            {activeTab === 'visitors' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 animate-fade-in">Recent Visitor Profiles</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visitors.slice(-9).reverse().map((visitor, index) => (
                    <div
                      key={visitor.id}
                      className={`bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 hover-lift animate-slide-up glow-effect ${
                        currentVisitor?.id === visitor.id ? 'ring-2 ring-blue-500 border-blue-200' : 'border-gray-200'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {currentVisitor?.id === visitor.id && (
                        <div className="flex items-center text-blue-600 text-sm mb-3 animate-pulse-glow">
                          <Zap className="h-4 w-4 mr-1" />
                          Currently Active
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">{visitor.name}</h4>
                        <span className="text-xs text-gray-500">{visitor.age} years</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 animate-float" />
                          {visitor.location}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Smartphone className="h-4 w-4 mr-2 animate-float animation-delay-200" />
                          {visitor.deviceType}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 animate-float animation-delay-400" />
                          {visitor.sessionDuration}s session
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex flex-wrap gap-1">
                          {visitor.interests.slice(0, 3).map((interest, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full animate-sparkle"
                              style={{ animationDelay: `${idx * 0.2}s` }}
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Behavior Tab */}
            {activeTab === 'behavior' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 animate-fade-in">Live Activity Stream</h3>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => {
                    const visitor = visitors.find(v => v.id === activity.visitorId);
                    const actionColors = {
                      page_view: 'bg-blue-100 text-blue-700',
                      click: 'bg-green-100 text-green-700',
                      form_interaction: 'bg-purple-100 text-purple-700',
                      scroll: 'bg-gray-100 text-gray-700'
                    };
                    
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors animate-slide-up hover-lift glow-effect"
                        style={{ 
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="flex items-center">
                          {/* <div className={`px-3 py-1 rounded-full text-xs font-medium animate-pulse-glow ${actionColors?.[activity?.action] || 'bg-gray-200'}`}>
                          {String(activity?.action || '').replace('_', ' ')}
                        </div> */}

                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {visitor?.name || 'Unknown Visitor'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {activity.target} • {activity.duration}s
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MongoDB Integration Note with Enhanced Styling */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white animate-slide-up glow-effect">
          <div className="flex items-center mb-4">
            <Brain className="h-8 w-8 mr-3 animate-pulse-glow" />
            <h3 className="text-xl font-bold">MongoDB Integration Ready</h3>
          </div>
          <p className="text-gray-300 mb-6">
            This dashboard displays simulated data. In production, all visitor personas, behaviors, 
            and analytics would be stored in MongoDB collections with real-time synchronization.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4 hover-lift animate-fade-in">
              <div className="font-semibold mb-1">Collections</div>
              <div className="text-gray-300">visitors, behaviors, analytics</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 hover-lift animate-fade-in animation-delay-200">
              <div className="font-semibold mb-1">Real-time Updates</div>
              <div className="text-gray-300">Change streams & WebSockets</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 hover-lift animate-fade-in animation-delay-400">
              <div className="font-semibold mb-1">Scalability</div>
              <div className="text-gray-300">Horizontal scaling ready</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;