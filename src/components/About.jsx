import React, { useRef } from "react";
import logo from "../assets/Logo.jpg";
import adhikari from "../assets/Adhikari.jpg"
import { motion, useMotionValue, useTransform, useInView, useScroll } from "framer-motion";
import {
  Users,
  Building,
  Trophy,
  ArrowRight,
  Check,
  Linkedin,
  Github,
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "1M+", label: "Active Job Seekers", icon: Users },
    { number: "50K+", label: "Partner Companies", icon: Building },
    { number: "500K+", label: "Successful Placements", icon: Trophy },
  ];

  const features = [
    {
      title: "Smart Matching Technology",
      description:
        "Our AI-powered algorithm ensures the perfect match between candidates and opportunities",
      icon: Check,
    },
    {
      title: "Verified Companies",
      description:
        "All companies on our platform go through a strict verification process",
      icon: Check,
    },
    {
      title: "Real-time Updates",
      description:
        "Get instant notifications about new opportunities and application status",
      icon: Check,
    },
    {
      title: "Career Resources",
      description:
        "Access to resume builders, interview tips, and career development guides",
      icon: Check,
    },
  ];
  
  const teamMembers = [
    {
      name: "Sumit Singh Bora",
      role: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin: "https://linkedin.com/in/sumitsinghbora",
      github: "https://github.com/sumitsinghbora",
      description: "React developer specializing in creating responsive and intuitive user interfaces"
    },
    {
      name: "Pawan Dasila",
      role: "Backend Developer",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      linkedin: "https://linkedin.com/in/pawandasila",
      github: "https://github.com/pawandasila",
      description: "Expert in Node.js, Express, and MongoDB with a passion for building robust server-side applications"
    },{
      name: "Sourav Singh Adhikari",
      role: "Backend Developer",
      image: adhikari,
      linkedin: "https://www.linkedin.com/in/sourav-singh-adhikari-4213231b7/",
      github: "https://github.com/souravsinghadhikari",
      description: "Expert in Node.js, Express, and MongoDB with a passion for building robust server-side applications"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    rest: { 
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
    },
    hover: { 
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      z: 50,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  
  // Refs for section animations
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const teamRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });

  // Function for 3D card tilt effect
  const Card3D = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;
      
      x.set(xPct * 50);
      y.set(yPct * 50);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={className}
      >
        <div style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-800 to-indigo-900 py-24">
        <motion.div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `url(${logo})`,
            y: heroY, opacity: heroOpacity
          }}
        ></motion.div>

        <motion.div 
          className="relative max-w-7xl mx-auto px-6 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Naukari Marg: Your Path to Success
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-300 mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Connecting talented professionals with their dream careers and helping companies find their perfect match.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{ 
                  transformStyle: "preserve-3d",
                }}
              >
                <span style={{ transform: "translateZ(10px)" }}>Explore Jobs</span>
                <ArrowRight className="w-5 h-5" style={{ transform: "translateZ(15px)" }} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats Section with 3D Cards */}
      <div className="py-16 px-6 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <Card3D
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {React.createElement(stat.icon, {
                    className: "w-12 h-12 text-blue-600",
                  })}
                </div>
                <motion.h3 
                  className="text-4xl font-bold text-blue-900 mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={statsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-lg text-blue-700">{stat.label}</p>
              </Card3D>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission Section with 3D text effect */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-blue-900 mb-6"
            style={{ textShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}
          >
            Our Mission
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-blue-500 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: "4rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-700 leading-relaxed"
            style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}
          >
            At Naukari Marg, we believe everyone deserves a fulfilling career path. Our mission is to revolutionize job hunting and talent acquisition by providing a transparent, efficient, and user-friendly platform that puts human connections first. We are committed to bridging the gap between talented professionals and quality opportunities across India.
          </motion.p>
        </div>
      </div>

      {/* Features Section with 3D hover effects */}
      <div className="py-16 px-6 bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4" 
              style={{ textShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}>
              Why Choose Naukari Marg
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  backfaceVisibility: "hidden"
                }}
              >
                <div className="flex items-start" style={{ transform: "translateZ(30px)" }}>
                  <motion.div 
                    className="bg-blue-100 rounded-full p-3 mr-5"
                    whileHover={{ 
                      rotate: 360,
                      transition: { duration: 0.6 } 
                    }}
                  >
                    {React.createElement(feature.icon, {
                      className: "w-6 h-6 text-blue-600",
                    })}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section with 3D Cards */}
      <motion.div
        ref={teamRef}
        variants={containerVariants}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden"
      >
        {/* Floating shapes for background effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-700/20 -top-20 -left-20"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 50, 0],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-indigo-700/10 bottom-0 right-0"
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -30, 0],
            rotate: [0, -45, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut" 
          }}
        />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" 
              style={{ textShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}>
              Meet Our Team
            </h2>
            <p className="text-xl text-blue-200">
              The talented professionals behind Naukari Marg
            </p>
            <div className="w-24 h-1 bg-blue-400 mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  translateY: -15,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-indigo-800 opacity-90" 
                  style={{ transform: "translateZ(0)" }} />
                
                <div className="p-8 text-center relative" style={{ transform: "translateZ(40px)" }}>
                  <motion.div 
                    className="mb-6 mx-auto w-32 h-32 relative"
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <img
                      src={member.image}
                      className="rounded-full object-cover h-full w-full border-4 border-blue-300 shadow-lg"
                      alt={member.name}
                    />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-1" style={{ textShadow: "0 2px 5px rgba(0, 0, 0, 0.3)" }}>
                    {member.name}
                  </h3>
                  <p className="text-blue-300 text-lg mb-4">
                    {member.role}
                  </p>
                  <p className="text-blue-100 mb-6">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white transition-colors shadow-lg"
                      style={{ transform: "translateZ(60px)" }}
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white transition-colors shadow-lg"
                      style={{ transform: "translateZ(60px)" }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Naukari Marg with 3D box shadow */}
      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4"
               style={{ textShadow: "0 5px 15px rgba(59, 130, 246, 0.3)" }}>
              About Naukari Marg
            </h2>
            <motion.div 
              className="w-24 h-1 bg-blue-500 mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
              translateY: -5,
              transition: { duration: 0.4 }
            }}
            className="bg-white rounded-xl p-8 shadow-md text-gray-700 leading-relaxed"
          >
            <p className="mb-4">
              Naukari Marg is India's innovative job portal designed to transform how professionals find their career paths and how companies discover exceptional talent. Our platform combines cutting-edge technology with a human-centered approach to create meaningful connections in the job market.
            </p>
            <p className="mb-4">
              What sets Naukari Marg apart is our commitment to quality over quantity. We focus on meaningful matches rather than overwhelming users with countless irrelevant options. Our sophisticated matching algorithm considers not just skills and experience, but also company culture, career aspirations, and growth potential.
            </p>
            <p>
              Whether you're a job seeker looking for the next step in your career journey or an employer searching for the perfect addition to your team, Naukari Marg provides the tools, resources, and support to help you succeed in today's competitive job market.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Call to Action with 3D button */}
      <div className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background: "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))",
            backgroundSize: "30px 30px"
          }}
          animate={{ x: [-30, 0], y: [-30, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ textShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}
          >
            Ready to Find Your Path?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of professionals who have found their dream careers through Naukari Marg
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              rotateX: 2,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
              style={{ 
                transformStyle: "preserve-3d",
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.5)"
              }}
            >
              <span style={{ transform: "translateZ(20px)" }}>Get Started Today</span>
              <ArrowRight className="w-5 h-5" style={{ transform: "translateZ(30px)" }} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
