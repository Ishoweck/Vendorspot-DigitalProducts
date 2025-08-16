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
    rating: 4.8
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
    rating: 4.9
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
    rating: 4.7
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
    rating: 4.6
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
    rating: 4.8
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
    rating: 4.9
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
    rating: 4.7
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
    rating: 4.6
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
    rating: 4.5
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
    rating: 4.8
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
    rating: 4.7
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
    rating: 4.9
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
    rating: 4.6
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
    rating: 4.5
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
    rating: 4.7
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