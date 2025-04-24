import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Kushal Vaghela",
  initials: "DV",
  url: "https://dillion.io",
  location: "Surat, Gujarat, IND",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "As a Full-stack web developer with a growing passion for software engineering, I thrive on crafting innovative digital solutions and exploring the tech landscape. You can catch me sharing my journey and insights on GitHub, where I’m very active!",
  summary:
    "I completed my Bachelor of Computer Applications (BCA) and gained expertise in modern web technologies. I specialize in React, Node.js, Express.js, Java, and Java Spring Boot, building scalable and efficient applications. I also have experience working with databases like MongoDB and PostgreSQL, and I’m exploring NEXT JS & TypeScript with libraries like Lit to enhance my development skills. Always eager to learn, I’m passionate about creating innovative and high-performance web solutions.",
  avatarUrl: "https://res.cloudinary.com/da0lceyy7/image/upload/v1740752274/rsqez04kjf71o4vss4m1.jpg",
  skills: [
    "React",
    "Next.js",
    "JavaScript",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
    "Java",
    "Java Spring Boot",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
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
      href: "https://atomic.finance",
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
      image: "",
      video:
        "Bid_Athlete.mp4",
    },
    {
      title: "Office Management System",
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
      image: "",
      video: "Office_MS.mp4",
    },
    {
      title: "Hotel Management System",
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
      image: "",
      video:
        "Hotel_MS.mp4",
    },
  ],
} as const;
