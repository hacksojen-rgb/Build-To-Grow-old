
import React from 'react';
import { 
  BarChart3, 
  Code2, 
  Megaphone, 
  PenTool, 
  Search, 
  Smartphone,
  Video,
  Target,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Service, PortfolioProject, Testimonial, BlogPost, HeroSlide, PricingPlan } from './types';

export const COLORS = {
  primary: '#014034',
  primaryLight: '#00695c',
  accent: '#4DB6AC',
  background: '#F8F9FA'
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    title: "We Help Businesses Grow with High-Converting Websites, Content & Marketing",
    subtitle: "From strategy to execution — we build websites, content, and marketing systems that generate leads and sales.",
    ctaPrimary: "Get a Free Growth Plan",
    ctaSecondary: "Book a Free Consultation",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: '2',
    title: "Authority-Building Content & Premium Branding",
    subtitle: "Position your brand as the undisputed market leader with premium design and scroll-stopping digital content.",
    ctaPrimary: "Start Your Project",
    ctaSecondary: "View Case Studies",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015"
  },
  {
    id: '3',
    title: "Full-Stack Marketing that Generates Real ROI",
    subtitle: "Stop guessing and start growing. Our data-driven strategies focus on lead generation and measurable sales impact.",
    ctaPrimary: "Claim Your Audit",
    ctaSecondary: "See How We Work",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070"
  }
];

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'High-converting websites that turn visitors into customers.',
    icon: 'Code2'
  },
  {
    id: '2',
    title: 'Digital Marketing',
    description: 'Generate consistent leads and sales through data-driven campaigns.',
    icon: 'Target'
  },
  {
    id: '3',
    title: 'SEO Optimization',
    description: 'Long-term organic traffic that compounds your growth.',
    icon: 'Search'
  },
  {
    id: '4',
    title: 'UI/UX Design',
    description: 'Designs that improve trust, usability, and conversion.',
    icon: 'PenTool'
  },
  {
    id: '5',
    title: 'Content Creation',
    description: 'Scroll-stopping content that builds trust and authority.',
    icon: 'Megaphone'
  },
  {
    id: '6',
    title: 'Analytics & Reporting',
    description: 'Clear insights so you know what’s working and what’s not.',
    icon: 'BarChart3'
  }
];

export const CLIENT_LOGOS = [
  'https://cdn.worldvectorlogo.com/logos/airbnb.svg',
  'https://cdn.worldvectorlogo.com/logos/amazon-2.svg',
  'https://cdn.worldvectorlogo.com/logos/hubspot.svg',
  'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
  'https://cdn.worldvectorlogo.com/logos/uber-2.svg'
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: '1',
    title: 'SaaS Growth Platform',
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    client: 'Streamline AI'
  },
  {
    id: '2',
    title: 'Premium D2C Branding',
    category: 'Design & Branding',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    client: 'Velvet Flora'
  },
  {
    id: '3',
    title: 'Video Ad Campaign',
    category: 'Video Editing',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    client: 'NextGen Fitness'
  },
  {
    id: '4',
    title: 'Multi-Channel Growth Strategy',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    client: 'Global Logistics'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'Nexus Tech',
    content: 'The growth plan they delivered was a game-changer. We saw a 40% increase in qualified leads within the first month of working together.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Stellar Startups',
    content: 'Professional, fast, and results-focused. They finally made our brand look premium and credible to enterprise clients.',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    id: '3',
    name: 'Emma Williams',
    role: 'Marketing Lead',
    company: 'Green Path',
    content: 'Finally an agency that speaks "business" and not just "design". They understood our ROI goals from day one and executed flawlessly.',
    avatar: 'https://i.pravatar.cc/150?u=emma'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Why Most B2B Websites Fail to Convert',
    excerpt: 'Learn the 3 critical design mistakes that are costing you leads and how to fix them for immediate results.',
    author: 'David Smith',
    date: 'Oct 15, 2023',
    category: 'Strategy',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'The Psychology of High-Converting Landing Pages',
    excerpt: 'Deep dive into visual hierarchy and cognitive biases that drive user action on your digital platforms.',
    author: 'Elena Ross',
    date: 'Oct 22, 2023',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Scaling from $1M to $10M: The Growth Playbook',
    excerpt: 'A blueprint for ambitious startups ready to dominate their category using integrated marketing systems.',
    author: 'Mark Wood',
    date: 'Nov 02, 2023',
    category: 'Growth',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_PRICING_PLANS: PricingPlan[] = [
  {
    id: '1',
    name: 'Starter Growth',
    price: '$2,500',
    period: 'mo',
    description: 'Perfect for small businesses looking to establish a digital presence.',
    features: ['Modern Website', 'Basic SEO', 'Monthly Report', '1 Social Channel'],
    isPopular: false
  },
  {
    id: '2',
    name: 'Scale Up',
    price: '$5,000',
    period: 'mo',
    description: 'The preferred choice for ambitious brands ready for market expansion.',
    features: ['High-Conversion Site', 'Advanced SEO', 'Weekly Insights', '3 Social Channels', 'Ad Management'],
    isPopular: true
  },
  {
    id: '3',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-service digital transformation for large-scale operations.',
    features: ['Full Stack Dev', 'Omni-channel Strategy', 'Real-time Dashboard', 'Dedicated Team'],
    isPopular: false
  }
];
