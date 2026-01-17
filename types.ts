
export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  client: string;
  content?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website?: string;
  budget: string;
  decisionMaker: string;
  growthChallenge: string;
  message: string;
  date: string;
  status: 'pending' | 'approved' | 'completed';
}

export interface SiteSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  aboutTitle: string;
  aboutText: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
}
