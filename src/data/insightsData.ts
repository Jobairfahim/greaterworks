export interface Insight {
  id: string;
  title: string;
  description: string;
  image: string;
  content?: string;
  date?: string;
  author?: string;
  readTime?: string;
}

export const guides: Insight[] = [
  {
    id: "scalable-web-apps",
    title: "How to Build a Scalable Web Application",
    description: "Learn core principles of scalable architecture, from database design to deployment strategies.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd9c1d82c15d69cbec_img-07.jpg",
    content: "Scalability is a critical factor in web development. In this comprehensive guide, we cover the essential principles of building applications that can handle millions of users gracefully. From microservices and load balancing to database sharding and caching strategies, we explore how leading tech companies design their backend infrastructure. Learn how to identify bottlenecks before they affect your users and implement robust deployment strategies that ensure high availability.",
    date: "May 10, 2026",
    author: "Tech Team",
    readTime: "8 min read"
  },
  {
    id: "mern-stack",
    title: "Getting Started with MERN Stack Development",
    description: "A practical beginner-friendly guide to building full-stack applications using MongoDB, Express, React, and Node.js.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd27d812d075ffb703_img-08.jpg",
    content: "The MERN stack (MongoDB, Express, React, Node.js) remains one of the most popular combinations for building modern web applications. This guide will walk you through the process of setting up a new full-stack project, connecting your frontend to a backend API, and managing data with MongoDB. Whether you are a beginner or a seasoned developer looking to switch tech stacks, this tutorial provides a solid foundation for your next project.",
    date: "April 28, 2026",
    author: "Dev Team",
    readTime: "12 min read"
  },
  {
    id: "ui-ux-practices",
    title: "UI/UX Best Practices for Modern Web Apps",
    description: "Design intuitive and engaging user experiences that convert and retain users.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd9c1d82c15d69cbec_img-07.jpg",
    content: "Great design is more than just making things look pretty. It's about understanding user psychology and creating seamless pathways for interaction. In this article, we dive into the latest UI/UX best practices, including responsive typography, dark mode optimization, accessible color palettes, and micro-interactions. Discover how small design tweaks can lead to significant improvements in user retention and conversion rates.",
    date: "April 15, 2026",
    author: "Design Team",
    readTime: "6 min read"
  },
  {
    id: "api-design",
    title: "API Design: Best Practices for Developers",
    description: "Build clean, secure, and efficient APIs that scale with your application.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd27d812d075ffb703_img-08.jpg",
    content: "An API is the backbone of any modern software architecture. Designing it correctly from the start saves countless hours of refactoring down the road. This guide covers RESTful conventions, versioning strategies, rate limiting, and authentication methods like OAuth and JWT. We also discuss when to choose GraphQL over REST and how to thoroughly document your endpoints for third-party developers.",
    date: "March 22, 2026",
    author: "Backend Team",
    readTime: "10 min read"
  },
  {
    id: "performance-optimization",
    title: "Optimizing Website Performance",
    description: "Techniques to improve loading speed, SEO ranking, and overall user experience.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd9c1d82c15d69cbec_img-07.jpg",
    content: "Speed matters. Every extra second of loading time impacts your bounce rate and SEO performance. Here, we outline actionable steps to optimize your web applications. Learn how to implement lazy loading, optimize images (WebP/AVIF), minimize JavaScript bundles, and utilize Content Delivery Networks (CDNs) to serve assets faster globally. Improve your Core Web Vitals and deliver a lightning-fast experience to your users.",
    date: "March 05, 2026",
    author: "Performance Team",
    readTime: "7 min read"
  },
];

export const updates: Insight[] = [
  {
    id: "web-dev-trends",
    title: "Top Web Development Trends in 2026",
    description: "Explore the latest technologies shaping the future of web development.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd27d812d075ffb703_img-08.jpg",
    content: "As we move further into 2026, web development continues to evolve at a breakneck pace. This update covers the biggest trends, including edge computing, WebAssembly going mainstream, AI-driven development tools, and the continued rise of meta-frameworks like Next.js and Nuxt. Stay ahead of the curve by understanding which technologies to invest your time in this year.",
    date: "May 15, 2026",
    author: "Research Team",
    readTime: "5 min read"
  },
  {
    id: "ai-development",
    title: "The Rise of AI in Software Development",
    description: "How AI tools are transforming the way developers build and deploy applications.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd9c1d82c15d69cbec_img-07.jpg",
    content: "Artificial Intelligence is no longer just a buzzword; it's an active participant in the software development lifecycle. From intelligent code completion and automated bug fixing to AI-generated tests and natural language querying, developers are finding new ways to boost productivity. Discover how your team can securely integrate AI assistants into their daily workflows without compromising code quality.",
    date: "May 02, 2026",
    author: "AI Integration Team",
    readTime: "9 min read"
  },
  {
    id: "cloud-trends",
    title: "Cloud Computing Trends You Should Know",
    description: "Key updates in cloud infrastructure, DevOps, and scalability.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd27d812d075ffb703_img-08.jpg",
    content: "Cloud computing is shifting from centralized data centers to a more distributed edge model. In this update, we discuss serverless architectures, multi-cloud strategies, and the increasing focus on FinOps (Cloud Financial Management). Learn how companies are optimizing their cloud bills while maintaining high availability and rapid deployment cycles.",
    date: "April 18, 2026",
    author: "Cloud Infrastructure Team",
    readTime: "6 min read"
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity in Modern Applications",
    description: "Emerging threats and how to protect your systems effectively.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd9c1d82c15d69cbec_img-07.jpg",
    content: "With cyber threats becoming more sophisticated, security must be built in, not bolted on. This article breaks down the latest in application security, covering zero-trust architecture, automated vulnerability scanning in CI/CD pipelines, and protecting against novel API attacks. Equip yourself with the knowledge needed to keep your users' data secure in a hostile digital environment.",
    date: "March 30, 2026",
    author: "Security Team",
    readTime: "8 min read"
  },
  {
    id: "ecommerce-future",
    title: "The Future of E-commerce Platforms",
    description: "Innovations changing how online businesses operate and grow.",
    image: "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd27d812d075ffb703_img-08.jpg",
    content: "E-commerce is undergoing a transformation driven by headless architectures and immersive experiences. We explore the benefits of decoupling the frontend presentation layer from the backend logic, allowing for lightning-fast storefronts and seamless omnichannel selling. Additionally, see how AR product previews and personalized shopping experiences are driving higher conversion rates.",
    date: "March 12, 2026",
    author: "E-commerce Strategy Team",
    readTime: "7 min read"
  },
];

export const allInsights: Insight[] = [...guides, ...updates];

export function getInsightById(id: string): Insight | undefined {
  return allInsights.find(insight => insight.id === id);
}
