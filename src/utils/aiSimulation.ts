import { VisitorPersona, VisitorBehavior } from '../types';

// AI Simulation Logic for generating realistic visitor personas and behaviors

const FIRST_NAMES = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
  'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia',
  'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

const LOCATIONS = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
  'Seattle, WA', 'Denver, CO', 'Boston, MA', 'Nashville, TN',
  'London, UK', 'Toronto, CA', 'Sydney, AU', 'Berlin, DE'
];

const INTEREST_CATEGORIES = [
  'Technology', 'AI', 'Software', 'Marketing', 'Business', 'Sales',
  'Healthcare', 'Research', 'Science', 'Education', 'Finance',
  'E-commerce', 'Design', 'Gaming', 'Travel', 'Food', 'Sports',
  'Music', 'Art', 'Photography'
];

const BEHAVIORS = [
  { action: 'page_view', targets: ['home', 'features', 'dashboard', 'contact', 'about'] },
  { action: 'click', targets: ['cta-button', 'nav-link', 'feature-card', 'demo-button'] },
  { action: 'form_interaction', targets: ['contact-form', 'newsletter', 'demo-request'] },
  { action: 'scroll', targets: ['hero-section', 'features-section', 'testimonials'] }
] as const;

/**
 * Generates a realistic visitor persona using AI simulation algorithms
 * Considers demographic patterns and behavioral correlations
 */
export const generateVisitorPersona = (): VisitorPersona => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  
  // Age distribution follows realistic web demographics (more weight on 25-45)
  const ageWeights = [0.1, 0.3, 0.4, 0.15, 0.05]; // 18-24, 25-34, 35-44, 45-54, 55+
  const ageRanges = [[18, 24], [25, 34], [35, 44], [45, 54], [55, 65]];
  const ageGroupIndex = weightedRandomIndex(ageWeights);
  const ageRange = ageRanges[ageGroupIndex];
  const age = Math.floor(Math.random() * (ageRange[1] - ageRange[0] + 1)) + ageRange[0];
  
  // Device type distribution based on real analytics data
  const deviceWeights = [0.6, 0.35, 0.05]; // desktop, mobile, tablet
  const devices = ['desktop', 'mobile', 'tablet'] as const;
  const deviceType = devices[weightedRandomIndex(deviceWeights)];
  
  // Generate 2-4 interests with some correlation logic
  const numInterests = Math.floor(Math.random() * 3) + 2;
  const interests = generateCorrelatedInterests(numInterests, age);
  
  // Session duration varies by age and device (mobile users typically shorter sessions)
  const baseDuration = deviceType === 'mobile' ? 120 : 200; // seconds
  const ageFactor = age < 35 ? 0.8 : 1.2; // younger users tend to have shorter sessions
  const sessionDuration = Math.floor((baseDuration + Math.random() * 300) * ageFactor);
  
  // Page views correlate with session duration and interests
  const basePageViews = Math.floor(sessionDuration / 60); // roughly 1 page per minute
  const pageViews = Math.max(1, basePageViews + Math.floor(Math.random() * 3));
  
  // Interaction score based on engagement patterns
  const interactionScore = calculateInteractionScore(age, interests, sessionDuration, deviceType);
  
  return {
    id: generateId(),
    name: `${firstName} ${lastName}`,
    age,
    location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
    interests,
    deviceType,
    sessionDuration,
    pageViews,
    interactionScore,
    timestamp: new Date()
  };
};

/**
 * Generates realistic visitor behaviors based on persona characteristics
 * Uses behavioral psychology principles to simulate authentic interactions
 */
export const generateBehavior = (visitorId: string): VisitorBehavior => {
  const behaviorType = BEHAVIORS[Math.floor(Math.random() * BEHAVIORS.length)];
  const target = behaviorType.targets[Math.floor(Math.random() * behaviorType.targets.length)];
  
  // Duration varies by action type
  let duration: number;
  switch (behaviorType.action) {
    case 'page_view':
      duration = Math.floor(Math.random() * 120) + 30; // 30-150 seconds
      break;
    case 'click':
      duration = Math.floor(Math.random() * 5) + 1; // 1-5 seconds
      break;
    case 'form_interaction':
      duration = Math.floor(Math.random() * 180) + 60; // 60-240 seconds
      break;
    case 'scroll':
      duration = Math.floor(Math.random() * 30) + 10; // 10-40 seconds
      break;
    default:
      duration = Math.floor(Math.random() * 60) + 10;
  }
  
  return {
    id: generateId(),
    visitorId,
    action: behaviorType.action,
    target,
    duration,
    timestamp: new Date()
  };
};

// Helper Functions

/**
 * Generates correlated interests based on age demographics and common patterns
 */
function generateCorrelatedInterests(numInterests: number, age: number): string[] {
  let availableInterests = [...INTEREST_CATEGORIES];
  const selectedInterests: string[] = [];
  
  // Age-based interest preferences
  if (age < 30) {
    // Younger users more likely to be interested in tech, gaming, social media
    const techInterests = ['Technology', 'AI', 'Software', 'Gaming', 'Design'];
    techInterests.forEach(interest => {
      if (Math.random() < 0.4 && availableInterests.includes(interest)) {
        selectedInterests.push(interest);
        availableInterests = availableInterests.filter(i => i !== interest);
      }
    });
  } else if (age > 40) {
    // Older users more likely interested in business, healthcare, finance
    const businessInterests = ['Business', 'Finance', 'Healthcare', 'Research'];
    businessInterests.forEach(interest => {
      if (Math.random() < 0.3 && availableInterests.includes(interest)) {
        selectedInterests.push(interest);
        availableInterests = availableInterests.filter(i => i !== interest);
      }
    });
  }
  
  // Fill remaining slots randomly
  while (selectedInterests.length < numInterests && availableInterests.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableInterests.length);
    selectedInterests.push(availableInterests[randomIndex]);
    availableInterests.splice(randomIndex, 1);
  }
  
  return selectedInterests;
}

/**
 * Calculates interaction score based on multiple engagement factors
 */
function calculateInteractionScore(
  age: number,
  interests: string[],
  sessionDuration: number,
  deviceType: string
): number {
  let score = 50; // Base score
  
  // Session duration factor
  if (sessionDuration > 300) score += 20;
  else if (sessionDuration > 180) score += 10;
  else if (sessionDuration < 60) score -= 10;
  
  // Interest relevance (tech-savvy users tend to be more engaged)
  const techInterests = interests.filter(i => 
    ['Technology', 'AI', 'Software'].includes(i)
  ).length;
  score += techInterests * 5;
  
  // Age factor (middle-aged users often more engaged with business content)
  if (age >= 30 && age <= 50) score += 10;
  
  // Device factor (desktop users typically more engaged)
  if (deviceType === 'desktop') score += 5;
  else if (deviceType === 'tablet') score += 2;
  
  // Add some randomness for realism
  score += Math.floor(Math.random() * 20) - 10;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Weighted random selection helper
 */
function weightedRandomIndex(weights: number[]): number {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) return i;
  }
  
  return weights.length - 1;
}

/**
 * Generates unique IDs for visitors and behaviors
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}