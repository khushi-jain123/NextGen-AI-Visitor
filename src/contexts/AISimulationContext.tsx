import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VisitorPersona, VisitorBehavior, PersonalizationContent, AnalyticsData } from '../types';
import { generateVisitorPersona, generateBehavior } from '../utils/aiSimulation';

interface AISimulationContextType {
  visitors: VisitorPersona[];
  behaviors: VisitorBehavior[];
  currentVisitor: VisitorPersona | null;
  analytics: AnalyticsData;
  personalizationContent: PersonalizationContent[];
  addVisitor: (visitor: VisitorPersona) => void;
  addBehavior: (behavior: VisitorBehavior) => void;
  setCurrentVisitor: (visitor: VisitorPersona | null) => void;
}

const AISimulationContext = createContext<AISimulationContextType | undefined>(undefined);

export const useAISimulation = () => {
  const context = useContext(AISimulationContext);
  if (!context) {
    throw new Error('useAISimulation must be used within an AISimulationProvider');
  }
  return context;
};

interface AISimulationProviderProps {
  children: ReactNode;
}

export const AISimulationProvider: React.FC<AISimulationProviderProps> = ({ children }) => {
  const [visitors, setVisitors] = useState<VisitorPersona[]>([]);
  const [behaviors, setBehaviors] = useState<VisitorBehavior[]>([]);
  const [currentVisitor, setCurrentVisitor] = useState<VisitorPersona | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisitors: 0,
    activeVisitors: 0,
    avgSessionDuration: 0,
    topInterests: [],
    deviceBreakdown: [],
    locationBreakdown: []
  });

  // Personalization content based on different visitor interests
  const [personalizationContent] = useState<PersonalizationContent[]>([
    {
      id: '1',
      targetInterests: ['Technology', 'AI', 'Software'],
      content: {
        headline: 'Revolutionary AI Analytics',
        description: 'Transform your business with cutting-edge artificial intelligence and data insights.',
        ctaText: 'Explore Tech Solutions',
        backgroundColor: 'from-blue-600 to-purple-600',
        textColor: 'text-white'
      }
    },
    {
      id: '2',
      targetInterests: ['Marketing', 'Business', 'Sales'],
      content: {
        headline: 'Boost Your Marketing ROI',
        description: 'Discover powerful tools to optimize your marketing campaigns and increase conversions.',
        ctaText: 'Start Growing Today',
        backgroundColor: 'from-green-500 to-teal-500',
        textColor: 'text-white'
      }
    },
    {
      id: '3',
      targetInterests: ['Healthcare', 'Research', 'Science'],
      content: {
        headline: 'Advanced Healthcare Analytics',
        description: 'Leverage AI to improve patient outcomes and streamline healthcare operations.',
        ctaText: 'Learn More',
        backgroundColor: 'from-red-500 to-pink-500',
        textColor: 'text-white'
      }
    }
  ]);

  // Generate initial visitors and simulate ongoing activity
  useEffect(() => {
    // Create initial visitor personas
    const initialVisitors = Array.from({ length: 5 }, () => generateVisitorPersona());
    setVisitors(initialVisitors);
    
    // Set a random current visitor for personalization
    setCurrentVisitor(initialVisitors[Math.floor(Math.random() * initialVisitors.length)]);

    // Simulate continuous visitor activity
    const interval = setInterval(() => {
      // Randomly add new visitors
      if (Math.random() < 0.3) {
        const newVisitor = generateVisitorPersona();
        setVisitors(prev => [...prev, newVisitor]);
        
        // Sometimes switch current visitor for personalization demo
        if (Math.random() < 0.4) {
          setCurrentVisitor(newVisitor);
        }
      }

      // Generate behaviors for existing visitors
      setVisitors(currentVisitors => {
        currentVisitors.forEach(visitor => {
          if (Math.random() < 0.6) {
            const behavior = generateBehavior(visitor.id);
            setBehaviors(prev => [...prev.slice(-50), behavior]); // Keep last 50 behaviors
          }
        });
        return currentVisitors;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update analytics whenever visitors or behaviors change
  useEffect(() => {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;
    
    const activeVisitors = visitors.filter(v => 
      v.timestamp.getTime() > fiveMinutesAgo
    ).length;

    const avgSessionDuration = visitors.length > 0 
      ? visitors.reduce((sum, v) => sum + v.sessionDuration, 0) / visitors.length 
      : 0;

    // Calculate top interests
    const interestCounts: { [key: string]: number } = {};
    visitors.forEach(visitor => {
      visitor.interests.forEach(interest => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1;
      });
    });
    
    const topInterests = Object.entries(interestCounts)
      .map(([interest, count]) => ({ interest, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate device breakdown
    const deviceCounts: { [key: string]: number } = {};
    visitors.forEach(visitor => {
      deviceCounts[visitor.deviceType] = (deviceCounts[visitor.deviceType] || 0) + 1;
    });
    
    const deviceBreakdown = Object.entries(deviceCounts)
      .map(([device, count]) => ({ device, count }));

    // Calculate location breakdown
    const locationCounts: { [key: string]: number } = {};
    visitors.forEach(visitor => {
      locationCounts[visitor.location] = (locationCounts[visitor.location] || 0) + 1;
    });
    
    const locationBreakdown = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .slice(0, 5);

    setAnalytics({
      totalVisitors: visitors.length,
      activeVisitors,
      avgSessionDuration: Math.round(avgSessionDuration),
      topInterests,
      deviceBreakdown,
      locationBreakdown
    });
  }, [visitors, behaviors]);

  const addVisitor = (visitor: VisitorPersona) => {
    setVisitors(prev => [...prev, visitor]);
  };

  const addBehavior = (behavior: VisitorBehavior) => {
    setBehaviors(prev => [...prev, behavior]);
  };

  return (
    <AISimulationContext.Provider
      value={{
        visitors,
        behaviors,
        currentVisitor,
        analytics,
        personalizationContent,
        addVisitor,
        addBehavior,
        setCurrentVisitor
      }}
    >
      {children}
    </AISimulationContext.Provider>
  );
};