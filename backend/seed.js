const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hero = require('./models/Hero');
const Product = require('./models/Product');
const Founder = require('./models/Founder');
const Testimonial = require('./models/Testimonial');
const Category = require('./models/Category');

dotenv.config();

const heroes = [
  {
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200",
    text: ["INNOVATING", "AKSHAYA LAB", "TECHNOLOGIES"],
    subtext: "fume hood lab funiture & lab fitting manufacturing & supplies"
  },
  {
    img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1200",
    text: ["CNC PRESS", "BRAKE"],
    subtext: "A high-performance CNC Press Brake used for precise bending of sheet metal. With advanced control, strong build quality, and high capacity, it ensures accurate and efficient fabrication."
  },
  {
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200",
    text: ["PRECISION", "MANUFACTURING"],
    subtext: "Expert lab fitting and equipment supplies"
  }
];

const founder = {
  name: "Mr. Vanket Reddy",
  subtitle: "Meet Our Founder",
  title: "Driving Excellence in Lab Technology",
  text: '"Our mission at Akshaya Lab Technologies is to bridge the gap between complex industrial needs and precise manufacturing solutions. We don\'t just supply equipment; we build the foundation for scientific breakthroughs."',
  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  experience: "15+",
  projects: "200+"
};

const testimonials = [
  {
    quote: "Akshaya Labs made streamlining all of our laboratory processes an absolute breeze. Their technology is truly future-proof.",
    author: "John Doe",
    role: "Technical Director",
    img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600"
  },
  {
    quote: "The support and expertise provided during our CNC mission integration were unmatched. Highly recommended partner.",
    author: "Sarah Chen",
    role: "Operations Manager",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600"
  },
  {
    quote: "Their advanced laboratory solutions have transformed our research capabilities. The innovation level is exceptional.",
    author: "Michael Ross",
    role: "Chief Scientist",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600"
  }
];

const products = [
  {
    name: "Ductless Fume Hood",
    category: "Safety Cabinets",
    description: "Advanced filtration system for safe chemical handling without external ducting.",
    img: "https://images.unsplash.com/photo-1581093141620-109249e327da?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Chemical Laboratory Bench",
    category: "Laboratory Furniture",
    description: "Durable workspace designed for chemical resistance and efficiency.",
    img: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Modular Laboratory Bench",
    category: "Laboratory Furniture",
    description: "Flexible and customizable lab furniture solutions.",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Chemical Air Blower",
    category: "Industrial Systems",
    description: "Efficient air circulation system for industrial and lab use.",
    img: "https://images.unsplash.com/photo-1581093583424-94c6f8515764?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Safety Cabinet SC-100",
    category: "Safety Cabinets",
    description: "Ensures safe handling of hazardous materials and biological samples.",
    img: "https://images.unsplash.com/photo-1579154246535-ad52b4756cc2?auto=format&fit=crop&q=80&w=800"
  }
];

const categoriesSeed = [
  { name: "Gas Chromatography", img: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=800" },
  { name: "Chromatography Analysers", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800" },
  { name: "Mass Spectrometry", img: "https://images.unsplash.com/photo-1579154246535-ad52b4756cc2?q=80&w=800" },
  { name: "Laboratory Furniture", img: "https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?q=80&w=800" },
  { name: "Safety Cabinets", img: "https://images.unsplash.com/photo-1581093583449-82650c88bc11?q=80&w=800" },
  { name: "Industrial Systems", img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800" }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Hero.deleteMany({});
    await Hero.insertMany(heroes);

    await Founder.deleteMany({});
    await Founder.create(founder);

    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonials);

    await Product.deleteMany({});
    await Product.insertMany(products);

    await Category.deleteMany({});
    await Category.insertMany(categoriesSeed);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
