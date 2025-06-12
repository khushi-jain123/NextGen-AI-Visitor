// AI Visitor Simulation Types
export interface VisitorPersona {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  deviceType: 'desktop' | 'mobile' | 'tablet';
  sessionDuration: number;
  pageViews: number;
  interactionScore: number;
  timestamp: Date;
}

export interface VisitorBehavior {
  id: string;
  visitorId: string;
  action: 'page_view' | 'click' | 'form_interaction' | 'scroll' | 'exit';
  target: string;
  duration: number;
  timestamp: Date;
}

export interface PersonalizationContent {
  id: string;
  targetInterests: string[];
  content: {
    headline: string;
    description: string;
    ctaText: string;
    backgroundColor: string;
    textColor: string;
  };
}

export interface AnalyticsData {
  totalVisitors: number;
  activeVisitors: number;
  avgSessionDuration: number;
  topInterests: { interest: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  locationBreakdown: { location: string; count: number }[];
}