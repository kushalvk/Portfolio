import { Icons } from "@/components/icons";
import { FileTextIcon, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Kushal Vaghela",
  initials: "KV",
  url: "https://dillion.io",
  location: "Surat, Gujarat, IND",
  locationLink: "https://www.google.com/maps/place/Surat,+Gujarat",
  description:
    "As a Full-stack web developer with a growing passion for software engineering, I thrive on crafting innovative digital solutions and exploring the tech landscape. You can catch me sharing my journey and insights on GitHub, where I’m very active!",
  summary:
    "I completed my Bachelor of Computer Applications (BCA) and gained expertise in modern web technologies. I specialize in React, Node.js, Express.js, Java, and Java Spring Boot, building scalable and efficient applications. I also have experience working with databases like MongoDB and PostgreSQL, and I’m exploring NEXT JS & TypeScript with libraries like Lit to enhance my development skills. Always eager to learn, I’m passionate about creating innovative and high-performance web solutions.",
  avatarUrl: "https://res.cloudinary.com/da0lceyy7/image/upload/v1784831053/1_nbfohl.jpg",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Postgres",
    "Java",
    "Java Spring Boot",
    "C++",
    "Angular",
    "Flask",
    "PHP",
    "MySQL",
    ".NET",
    "Oracle"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/resume", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "kushalvaghela2003@gmail.com",
    tel: "+918460698315",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/kushalvk",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kushal-vaghela-247b942a1/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Durvasa Infotech",
      href: "https://www.durvasainfotech.com/",

      badges: [],
      location: "Office",
      title: "Full-Stack Web Devloper Intarnship",
      logoUrl: "https://media.licdn.com/dms/image/v2/C4D0BAQFcxRkX3hta4A/company-logo_200_200/company-logo_200_200/0/1674128554948?e=2147483647&v=beta&t=is7RBjcKZsSk5G-wst13FfdXQp2Zoh9cvqrg9Ie2JyA",
      start: "Oct 2024",
      end: "Mar 2025",
      description:
        "As a Full-Stack Web Developer Intern at Durvasa Infotech, I have been actively involved in designing, developing, and optimizing web applications. I work with React, Node.js, and Express.js integrating robust backend services with seamless front-end experiences. Additionally, I contribute to database management using MongoDB, ensuring efficient data handling. I have also explored TypeScript to enhance code scalability and maintainability. My role includes building, testing, and deploying applications and scalable software solutions.(Cloudinary)",
    },
  ],
  education: [
    {
      school: "Ambaba Collage (VNSGU)",
      href: "https://www.vnsgu.ac.in/",
      degree: "Bachelor of Computer Applications (BCA)",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/11/VNSGU_logo.png",
      start: "2022",
      end: "2025",
    },
    {
      school: "Charotar University of Science and Technology (CHARUSAT)",
      href: "https://www.charusat.ac.in/",
      degree: "Master of Science in Information Technology (M.Sc. IT)",
      logoUrl: "https://admission.charusat.ac.in/View%20Assets/images/University_Hero.png",
      start: "2025",
      end: "Present"
    },
  ],
  projects: [
    {
      title: "Bid Athlete",
      href: "https://bid-athlete.vercel.app/",
      dates: "Nov 2024 - Oct 2024",
      active: true,
      description:
        "Bid Athlete Project is an interactive web platform that allows event organizers to create and manage athletic competitions, while athletes can place bids to participate. The system includes secure login, role-based access for admins, organizers, and athletes, and real-time bidding features. It also provides tools for managing events, users, and bid details, offering a smooth and responsive user experience for all participants.",
      technologies: [
        "React.js",
        "MongoDB",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "Cloudinary",
        "Vercel"
      ],
      links: [
        {
          type: "Website",
          href: "https://bid-athlete.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/kushalvk/BidAthlete",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://res.cloudinary.com/da0lceyy7/image/upload/v1784869773/BidAthlet_tsfwmu.png",
      video:
        "https://res.cloudinary.com/da0lceyy7/video/upload/v1784869623/Bid_Athlete_amphda.mp4",
    },
    {
      title: "WorkPilot",
      href: "https://office-ms-two.vercel.app/",
      dates: "Dec 2024 - Mar 2024",
      active: true,
      description:
        "The Office Management System is a comprehensive MERN stack-based web application designed to streamline office operations efficiently. This system enables managers and employees to manage tasks, projects, salaries, notifications, and reports while ensuring smooth communication and workflow.",
      technologies: [
        "React.js",
        "MongoDB",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "Cloudinary"
      ],
      links: [
        {
          type: "Website",
          href: "https://office-ms-two.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/kushalvk/Office_Managment_System",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://res.cloudinary.com/da0lceyy7/image/upload/v1784870483/OfficeMS_v6nmew.png",
      video: "https://res.cloudinary.com/da0lceyy7/video/upload/v1784870357/Office_MS_uxkcfc.mp4",
    },
    {
      title: "VeriNest",
      href: "https://veri-nest-tenant.vercel.app/",
      dates: "Mar 2026 - Present",
      active: true,
      description:
          "A full-stack MERN platform that lets tenants build a single reusable, AI-verified profile — with OCR-based document extraction, fraud/duplicate detection, and a computed trust score — while landlords search verified tenants and request secure, time-limited access to their documents via cryptographically signed tokens. Includes digital rental agreements with e-signatures, post-tenancy ratings, a Gemini-powered chat assistant scoped to each user's own data, Google OAuth login, and reCAPTCHA-protected auth.",
      technologies: [
        "React.js",
        "TypeScript",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Cloudinary",
        "Tesseract OCR",
        "Gemini API",
        "JWT"
      ],
      links: [
        {
          type: "Website",
          href: "https://veri-nest-tenant.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/kushalvk/VeriNest",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://res.cloudinary.com/da0lceyy7/image/upload/v1784870563/VeriNest_xtfvc8.png",
      video: "https://res.cloudinary.com/da0lceyy7/video/upload/v1784871065/VeriNestVideo_c91utm.mp4",
    },
    {
      title: "SkillSurge",
      href: "https://skillsurge-ashen.vercel.app/",
      dates: "Mar 2025 - Nov 2025",
      active: true,
      description:
          "Proud to share my latest project — SkillSurge, a complete learning platform built using Next.js and TypeScript. I handled the full development lifecycle including UI design, backend integration, deployment, and writing automated test cases with Jest to ensure stability and performance. This project strengthened my skills in modern web development, testing, and production deployment.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Jest (unit & API testing)",
        "MongoDB"
      ],
      links: [
        {
          type: "Website",
          href: "https://skillsurge-ashen.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/kushalvk/NEXT-JS/tree/main/e_lerning",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://res.cloudinary.com/da0lceyy7/image/upload/v1784871540/SkillSurgeP_wpqt6p.png",
      video:
          "https://res.cloudinary.com/da0lceyy7/video/upload/v1784871987/SkillSurge_drvpwz.mp4",
    },
    {
      title: "StaySync",
      href: "https://hotel-managment-system-client.vercel.app/",
      dates: "Aug 2024 - Oct 2024",
      active: true,
      description:
        "VK Hotel Management System is a comprehensive platform that allows users to book rooms, halls, and dining spaces, and make secure online payments. The system also includes various management tools for admin users and handles different room types, bookings, and payment options.",
      technologies: [
        "React.js",
        "MongoDB",
        "TailwindCSS",
        "Node.js",
        "Express.js"
      ],
      links: [
        {
          type: "Website",
          href: "https://hotel-managment-system-client.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/kushalvk/Hotel-Managment-System",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://res.cloudinary.com/da0lceyy7/image/upload/v1784871082/HotelMS_jbfgom.png",
      video:
        "https://res.cloudinary.com/da0lceyy7/video/upload/v1784871531/Hotel_MS_u7xyej.mp4",
    },
  ],
} as const;
