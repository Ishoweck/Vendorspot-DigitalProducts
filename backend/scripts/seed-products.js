const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const { Product } = require(path.join(__dirname, "../dist/models/Product.js"));
const { Category } = require(path.join(__dirname, "../dist/models/Category.js"));
const { Vendor } = require(path.join(__dirname, "../dist/models/Vendor.js"));

const demoProducts = [
  {
    name: "Premium WordPress Theme - Business Pro",
    description: "A modern, responsive WordPress theme perfect for business websites. Features include drag-and-drop page builder, SEO optimization, mobile-first design, and 24/7 support.",
    price: 45000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/business-pro-theme.zip",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
    ],
    tags: ["wordpress", "theme", "business", "responsive"],
    soldCount: 127,
    rating: 4.2
  },
  {
    name: "Complete Digital Marketing Course",
    description: "Master digital marketing from basics to advanced strategies. Covers SEO, social media marketing, email campaigns, Google Ads, and analytics. Includes 50+ hours of video content and practical assignments.",
    price: 75000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/digital-marketing-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["marketing", "course", "digital", "seo"],
    soldCount: 89,
    rating: 3.9
  },
  {
    name: "Professional Logo Design Pack",
    description: "Collection of 50+ professional logo templates in vector format. Perfect for startups, businesses, and freelancers. Includes AI, SVG, and PSD files with unlimited commercial use license.",
    price: 25000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/logo-design-pack.zip",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
    ],
    tags: ["logo", "design", "vector", "templates"],
    soldCount: 203,
    rating: 4.0
  },
  {
    name: "E-commerce Website Template",
    description: "Complete e-commerce solution built with React and Node.js. Features include shopping cart, payment integration, admin dashboard, inventory management, and mobile responsive design.",
    price: 120000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/ecommerce-template.zip",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["ecommerce", "react", "nodejs", "template"],
    soldCount: 67,
    rating: 3.7
  },
  {
    name: "Financial Freedom Blueprint",
    description: "Comprehensive guide to achieving financial independence. Covers investment strategies, passive income streams, budgeting techniques, and wealth building principles for the African market.",
    price: 15000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/financial-freedom.pdf",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["finance", "investment", "wealth", "ebook"],
    soldCount: 156,
    rating: 4.5
  },
  {
    name: "Mobile App UI Kit",
    description: "Modern mobile app UI components for iOS and Android. Includes 200+ screens, icons, and components built with Figma. Perfect for designers and developers creating mobile applications.",
    price: 35000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/mobile-ui-kit.fig",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
    ],
    tags: ["mobile", "ui", "figma", "design"],
    soldCount: 94,
    rating: 4.1
  },
  {
    name: "Python Programming Masterclass",
    description: "Learn Python from beginner to advanced level. Covers web development, data science, automation, and machine learning. Includes 100+ coding exercises and real-world projects.",
    price: 55000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/python-masterclass.zip",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["python", "programming", "course", "coding"],
    soldCount: 178,
    rating: 3.8
  },
  {
    name: "Social Media Content Calendar",
    description: "Professional social media content calendar with 365 days of content ideas, hashtag strategies, and posting schedules. Includes templates for Instagram, Facebook, Twitter, and LinkedIn.",
    price: 18000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/social-media-calendar.xlsx",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["social media", "content", "calendar", "marketing"],
    soldCount: 234,
    rating: 4.3
  },
  {
    name: "Restaurant Management System",
    description: "Complete restaurant management solution with POS, inventory tracking, staff management, and reporting. Built with modern web technologies and includes mobile app for waiters.",
    price: 95000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/restaurant-system.zip",
    thumbnail: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["restaurant", "pos", "management", "software"],
    soldCount: 45,
    rating: 3.5
  },
  {
    name: "Photography Lightroom Presets",
    description: "Professional Lightroom presets for portrait, landscape, and street photography. Includes 50+ presets with before/after examples and detailed installation instructions.",
    price: 22000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/lightroom-presets.zip",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
    ],
    tags: ["photography", "lightroom", "presets", "editing"],
    soldCount: 167,
    rating: 4.4
  },
  {
    name: "Startup Business Plan Template",
    description: "Comprehensive business plan template with financial projections, market analysis, and investor pitch deck. Includes 10+ industry-specific examples and step-by-step guidance.",
    price: 28000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/business-plan-template.docx",
    thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
    ],
    tags: ["business", "plan", "startup", "template"],
    soldCount: 89,
    rating: 4.0
  },
  {
    name: "JavaScript Framework Course",
    description: "Master modern JavaScript frameworks including React, Vue, and Angular. Learn state management, routing, and deployment strategies. Includes 80+ hours of video content and coding challenges.",
    price: 65000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/javascript-frameworks.zip",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop"
    ],
    tags: ["javascript", "react", "vue", "angular"],
    soldCount: 134,
    rating: 3.6
  },
  {
    name: "Real Estate Website Template",
    description: "Professional real estate website template with property listings, search filters, agent profiles, and contact forms. Built with modern web technologies and SEO optimized.",
    price: 85000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/real-estate-template.zip",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["real estate", "website", "template", "property"],
    soldCount: 56,
    rating: 4.1
  },
  {
    name: "Fitness App Development Guide",
    description: "Complete guide to building a fitness tracking app. Covers UI/UX design, backend development, API integration, and app store deployment. Includes source code and design assets.",
    price: 75000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/fitness-app-guide.zip",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    ],
    tags: ["fitness", "app", "development", "mobile"],
    soldCount: 78,
    rating: 3.9
  },
  {
    name: "Stock Market Trading Strategy",
    description: "Proven stock market trading strategies for beginners and intermediate traders. Includes technical analysis, risk management, and portfolio diversification techniques.",
    price: 32000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/trading-strategy.pdf",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
    ],
    tags: ["trading", "stock market", "investment", "strategy"],
    soldCount: 112,
    rating: 4.2
  },
  {
    name: "Advanced CSS Grid Layout Course",
    description: "Master CSS Grid Layout with comprehensive tutorials and real-world projects. Learn responsive design, complex layouts, and modern CSS techniques for professional web development.",
    price: 38000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/css-grid-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop"
    ],
    tags: ["css", "grid", "layout", "web design"],
    soldCount: 145,
    rating: 4.0
  },
  {
    name: "Cryptocurrency Investment Guide",
    description: "Complete guide to cryptocurrency investing and trading. Covers blockchain technology, portfolio management, risk assessment, and market analysis for digital assets.",
    price: 42000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/crypto-investment-guide.pdf",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
    ],
    tags: ["cryptocurrency", "investment", "blockchain", "trading"],
    soldCount: 98,
    rating: 3.8
  },
  {
    name: "Professional Email Templates Pack",
    description: "Collection of 100+ professional email templates for business communication. Includes sales emails, customer service, marketing campaigns, and follow-up templates.",
    price: 19000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/email-templates-pack.zip",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["email", "templates", "business", "communication"],
    soldCount: 267,
    rating: 4.4
  },
  {
    name: "Video Editing Masterclass",
    description: "Learn professional video editing with Adobe Premiere Pro and After Effects. Covers color grading, motion graphics, sound design, and advanced editing techniques.",
    price: 68000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/video-editing-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    tags: ["video editing", "premiere pro", "after effects", "motion graphics"],
    soldCount: 87,
    rating: 4.3
  },
  {
    name: "Dropshipping Business Blueprint",
    description: "Complete guide to starting and scaling a dropshipping business. Covers product research, supplier management, marketing strategies, and automation tools.",
    price: 35000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/dropshipping-blueprint.pdf",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
    ],
    tags: ["dropshipping", "ecommerce", "business", "entrepreneurship"],
    soldCount: 134,
    rating: 3.7
  },
  {
    name: "3D Modeling for Beginners",
    description: "Learn 3D modeling from scratch using Blender. Covers modeling, texturing, lighting, and rendering techniques for creating professional 3D assets.",
    price: 45000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/3d-modeling-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    tags: ["3d modeling", "blender", "design", "animation"],
    soldCount: 76,
    rating: 4.5
  },
  {
    name: "Affiliate Marketing Mastery",
    description: "Complete affiliate marketing course covering niche selection, content creation, traffic generation, and conversion optimization strategies.",
    price: 29000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/affiliate-marketing-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop"
    ],
    tags: ["affiliate marketing", "passive income", "content creation", "traffic"],
    soldCount: 189,
    rating: 3.9
  },
  {
    name: "Mobile Game Development Guide",
    description: "Learn to create mobile games using Unity and C#. Covers game design, programming, monetization strategies, and app store optimization.",
    price: 82000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/mobile-game-dev-guide.zip",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    ],
    tags: ["game development", "unity", "mobile games", "programming"],
    soldCount: 63,
    rating: 4.2
  },
  {
    name: "Personal Branding Strategy",
    description: "Build a powerful personal brand online. Covers social media strategy, content creation, networking, and monetization techniques for influencers and professionals.",
    price: 26000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/personal-branding-strategy.pdf",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop"
    ],
    tags: ["personal branding", "social media", "influencer", "marketing"],
    soldCount: 156,
    rating: 4.4
  },
  {
    name: "Data Science Fundamentals",
    description: "Introduction to data science with Python. Covers statistics, machine learning, data visualization, and real-world data analysis projects.",
    price: 72000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/data-science-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop"
    ],
    tags: ["data science", "python", "machine learning", "statistics"],
    soldCount: 94,
    rating: 3.8
  },
  {
    name: "Freelance Writing Masterclass",
    description: "Learn to write compelling content and build a successful freelance writing career. Covers copywriting, content marketing, client management, and portfolio building.",
    price: 31000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/freelance-writing-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["freelance writing", "copywriting", "content marketing", "writing"],
    soldCount: 178,
    rating: 4.1
  },
  {
    name: "SaaS Business Model Guide",
    description: "Complete guide to building and scaling a SaaS business. Covers product development, pricing strategies, customer acquisition, and growth hacking techniques.",
    price: 58000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/saas-business-guide.pdf",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e@w=800&h=600&fit=crop"
    ],
    tags: ["saas", "business model", "startup", "software"],
    soldCount: 82,
    rating: 3.9
  },
  {
    name: "UI/UX Design Principles",
    description: "Master UI/UX design principles and create user-centered digital experiences. Covers wireframing, prototyping, user research, and design systems.",
    price: 48000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/ui-ux-design-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop"
    ],
    tags: ["ui/ux", "design", "user experience", "prototyping"],
    soldCount: 123,
    rating: 4.5
  },
  {
    name: "Podcast Production Masterclass",
    description: "Learn to create professional podcasts from recording to publishing. Covers equipment setup, audio editing, content strategy, and monetization methods.",
    price: 39000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/podcast-production-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["podcast", "audio production", "content creation", "recording"],
    soldCount: 67,
    rating: 4.0
  },
  {
    name: "E-commerce Analytics Dashboard",
    description: "Professional e-commerce analytics dashboard built with React and Chart.js. Tracks sales, customer behavior, inventory, and performance metrics.",
    price: 95000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/ecommerce-dashboard.zip",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["analytics", "dashboard", "react", "ecommerce"],
    soldCount: 45,
    rating: 3.6
  },
  {
    name: "Basic Website Template",
    description: "A simple, lightweight website template for small businesses. Includes basic HTML, CSS, and JavaScript with responsive design.",
    price: 15000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/basic-website-template.zip",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["website", "template", "html", "responsive"],
    soldCount: 45,
    rating: 3.2
  },
  {
    name: "Beginner Graphic Design Course",
    description: "Introduction to graphic design using Adobe Photoshop and Illustrator. Covers basic tools, color theory, and simple design projects.",
    price: 20000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/graphic-design-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1516321310762-479437144403?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516321310762-479437144403?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["graphic design", "photoshop", "illustrator", "course"],
    soldCount: 62,
    rating: 3.4
  },
  {
    name: "Social Media Graphics Pack",
    description: "Collection of 20 social media graphics templates for Instagram and Facebook. Editable in Canva with basic customization options.",
    price: 12000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/social-media-graphics.zip",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop"
    ],
    tags: ["social media", "graphics", "canva", "templates"],
    soldCount: 88,
    rating: 3.1
  },
  {
    name: "Budget Planner Template",
    description: "Simple budget planner template for personal finance. Includes spreadsheets for income tracking, expense categorization, and savings goals.",
    price: 10000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/budget-planner.xlsx",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop"
    ],
    tags: ["finance", "budget", "planner", "template"],
    soldCount: 76,
    rating: 3.3
  },
  {
    name: "Basic Mobile App Template",
    description: "A basic mobile app template for startups. Includes minimal UI components and sample code for iOS and Android development.",
    price: 25000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/mobile-app-template.zip",
    thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
    ],
    tags: ["mobile", "app", "template", "ui"],
    soldCount: 53,
    rating: 3.0
  },
  {
    name: "Intro to Coding with JavaScript",
    description: "Beginner-friendly course on JavaScript basics. Covers variables, functions, loops, and simple web interactions with 20+ coding exercises.",
    price: 18000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/javascript-intro-course.zip",
    thumbnail: "https://images.unsplash.com/photo-1516321310762-479437144403?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516321310762-479437144403?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop"
    ],
    tags: ["javascript", "coding", "course", "beginner"],
    soldCount: 95,
    rating: 3.5
  },
  {
    name: "Event Planning Checklist",
    description: "Comprehensive event planning checklist for small events. Includes timelines, vendor contacts, and budget tracking templates.",
    price: 8000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/event-planning-checklist.pdf",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    ],
    tags: ["event planning", "checklist", "template", "organization"],
    soldCount: 101,
    rating: 3.2
  },
  {
    name: "Basic SEO Guide",
    description: "Introductory guide to search engine optimization. Covers keyword research, on-page SEO, and basic link-building strategies.",
    price: 14000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/seo-guide.pdf",
    thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop"
    ],
    tags: ["seo", "marketing", "guide", "digital"],
    soldCount: 72,
    rating: 3.4
  },
  {
    name: "Resume Template Pack",
    description: "Set of 10 professional resume templates for job seekers. Includes editable Word and PDF formats with modern designs.",
    price: 9000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/resume-template-pack.zip",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d877c828f9?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d877c828f9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
    ],
    tags: ["resume", "template", "career", "job"],
    soldCount: 120,
    rating: 3.3
  },
  {
    name: "Basic Video Editing Toolkit",
    description: "Starter toolkit for video editing with 10+ transitions and effects. Compatible with Adobe Premiere Pro and Final Cut Pro.",
    price: 16000,
    fileUrl: "https://res.cloudinary.com/dmmz1qe2d/image/upload/v1755329755/vendorspot/products/files/video-editing-toolkit.zip",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    tags: ["video editing", "transitions", "effects", "toolkit"],
    soldCount: 69,
    rating: 3.1
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const categories = await Category.find({});
    const vendors = await Vendor.find({});

    if (categories.length === 0) {
      console.error("No categories found. Please run seed-categories first.");
      process.exit(1);
    }

    if (vendors.length === 0) {
      console.error("No vendors found. Please create a vendor first.");
      process.exit(1);
    }

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const categoryMap = {
      "Web Templates": categories.find(c => c.slug === "web-templates"),
      "Graphics": categories.find(c => c.slug === "graphics"),
      "E-books": categories.find(c => c.slug === "ebooks"),
      "Courses": categories.find(c => c.slug === "courses"),
      "Software": categories.find(c => c.slug === "software")
    };

    const vendor = vendors[0];
    const productsToCreate = [];

    demoProducts.forEach((product, index) => {
      let categoryId;
      
      if (product.tags.includes("wordpress") || product.tags.includes("template") || product.tags.includes("website")) {
        categoryId = categoryMap["Web Templates"]?._id;
      } else if (product.tags.includes("design") || product.tags.includes("logo") || product.tags.includes("ui") || product.tags.includes("photography")) {
        categoryId = categoryMap["Graphics"]?._id;
      } else if (product.tags.includes("course") || product.tags.includes("programming") || product.tags.includes("marketing")) {
        categoryId = categoryMap["Courses"]?._id;
      } else if (product.tags.includes("ebook") || product.tags.includes("strategy") || product.tags.includes("plan")) {
        categoryId = categoryMap["E-books"]?._id;
      } else if (product.tags.includes("software") || product.tags.includes("app") || product.tags.includes("system")) {
        categoryId = categoryMap["Software"]?._id;
      } else {
        categoryId = categoryMap["Web Templates"]?._id;
      }

      if (!categoryId) {
        console.warn(`No category found for product: ${product.name}`);
        categoryId = categories[0]._id;
      }

      productsToCreate.push({
        ...product,
        vendorId: vendor._id,
        categoryId: categoryId,
        isActive: true,
        isApproved: false,
        approvalStatus: "PENDING"
      });
    });

    const createdProducts = await Product.insertMany(productsToCreate);
    console.log(`Created ${createdProducts.length} products:`);

    createdProducts.forEach((product) => {
      console.log(`- ${product.name} (₦${product.price.toLocaleString()})`);
    });

    console.log("\nProducts seeded successfully!");
    console.log("Note: All products are set to isApproved: false by default.");
    console.log("You can manually approve them in your database or create an admin script.");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedProducts(); 