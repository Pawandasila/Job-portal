import React, { useContext, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Home,
  Briefcase,
  Info,
  MessageCircle,
  UserPlus,
  LogIn,
  User,
  LogOut,
  Bell,
  ChevronRight,
  PlusCircle,
  Building,
} from "lucide-react";

import useAxios from "@/hooks/useAxios";
import toast from "@/components/custom/toast";
import { AuthContext } from "@/context/authContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const axios = useAxios();
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const logoSpring = useSpring(0, { stiffness: 300, damping: 20 });
  const buttonScaleControls = useAnimation();

  const isLoggedIn = !!user?.id;

  const navItems = [
    { path: "/", text: "Home", icon: <Home size={20} /> },
    { path: "/jobs", text: "Jobs", icon: <Briefcase size={20} /> },
    { path: "/about", text: "About", icon: <Info size={20} /> },
    { path: "/contact", text: "Contact", icon: <MessageCircle size={20} /> },
  ];

  const isRecruiterPath = location.pathname.includes('/recruiter-access');

  

  // Enhanced animations
  const logoRotate = useMotionValue(0);
  const logoScale = useTransform(logoRotate, [0, 360], [1, 1.2]);

  // Handle click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logo animation triggers
  useEffect(() => {
    const interval = setInterval(() => {
      logoSpring.set(360);
      setTimeout(() => logoSpring.set(0), 1000);
    }, 10000);
    return () => clearInterval(interval);
  }, [logoSpring]);

  if(isRecruiterPath){
    return null;
  }

  // Mobile menu animations
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Profile menu animations
  const profileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const profileItemVariants = {
    closed: {
      opacity: 0,
      x: -5,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25 },
    },
  };

  // Hover animation variants
  const linkVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  // Button animation
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Menu button animations
  const Path = (props) => (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      {...props}
    />
  );

  const MenuToggle = ({ toggle }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="md:hidden p-2 z-50 relative"
    >
      <svg width="24" height="24" viewBox="0 0 23 23">
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.g
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Path
                d="M 3 16.5 L 20 16.5"
                variants={{
                  open: { d: "M 3 2.5 L 20 16.5" },
                  closed: { d: "M 3 16.5 L 20 16.5" },
                }}
                initial="closed"
                animate="open"
                transition={{ duration: 0.3 }}
              />
              <Path
                d="M 3 9.5 L 20 9.5"
                opacity="0"
                transition={{ duration: 0.3 }}
              />
              <Path
                d="M 3 2.5 L 20 2.5"
                variants={{
                  open: { d: "M 3 16.5 L 20 2.5" },
                  closed: { d: "M 3 2.5 L 20 2.5" },
                }}
                initial="closed"
                animate="open"
                transition={{ duration: 0.3 }}
              />
            </motion.g>
          ) : (
            <motion.g
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <Path d="M 3 16.5 L 20 16.5" />
              <Path d="M 3 9.5 L 20 9.5" transition={{ duration: 0.3 }} />
              <Path d="M 3 2.5 L 20 2.5" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </motion.button>
  );

  // Logout function
  const logoutUser = async () => {
    try {
      const response = await axios.post("/user/logout");
      return response.data;
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    buttonScaleControls.start({
      scale: [1, 0.9, 1],
      transition: { duration: 0.3 },
    });

    try {
      const response = await logoutUser();
      if (response.success) {
        toast.success(response.message);
        await logout();

        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);

        setTimeout(() => {
          navigate("/login");
        }, 300);
      }
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Animated nav indicator
  const NavIndicator = ({ isActive }) =>
    isActive && (
      <motion.div
        layoutId="navIndicator"
        className="absolute inset-0 bg-blue-50 rounded-full -z-10"
        initial={{ borderRadius: 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                style={{ rotate: logoSpring, scale: logoScale }}
                whileHover={{ scale: 1.2, rotate: 20 }}
                whileTap={{ scale: 0.9, rotate: -20 }}
                onHoverStart={() => logoRotate.set(360)}
                onHoverEnd={() => logoRotate.set(0)}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
              >
                <Briefcase className="text-white" size={20} />
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Naukri Marg
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="hidden md:block text-gray-500 text-xs"
                >
                  Get your dream job
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={linkVariants}
                  onHoverStart={() => setHoveredItem(item.path)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
                      location.pathname === item.path
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <NavIndicator isActive={location.pathname === item.path} />
                    <motion.div
                      animate={{
                        scale: hoveredItem === item.path ? 1.1 : 1,
                        rotate: hoveredItem === item.path ? 5 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <span>{item.text}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Auth Section - Desktop */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {/* User Profile Dropdown */}
                  <div className="relative" ref={profileMenuRef}>
                    <motion.button
                      whileHover="hover"
                      whileTap="tap"
                      variants={buttonVariants}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-full"
                    >
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-sm"
                      >
                        {user.firstName.charAt(0).toUpperCase()}
                        {user.lastName.charAt(0).toUpperCase()}
                      </motion.div>
                      <span>{user.firstName}</span>
                      <motion.div
                        animate={{ rotate: isProfileOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={profileMenuVariants}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-1 z-10 border border-gray-100 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b">
                            <motion.p
                              variants={profileItemVariants}
                              className="text-sm font-medium text-gray-900 truncate"
                            >
                              {user.firstName} {user.lastName}
                            </motion.p>
                            <motion.p
                              variants={profileItemVariants}
                              className="text-xs text-gray-500 truncate"
                            >
                              {user.email}
                            </motion.p>
                            <motion.p
                              variants={profileItemVariants}
                              className="text-xs text-gray-500 mt-1"
                            >
                              Role:{" "}
                              <span className="capitalize">{user.role}</span>
                            </motion.p>
                          </div>

                          {user.role === "jobseeker" && (
                            <motion.div variants={profileItemVariants}>
                              <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                <div className="flex items-center space-x-2">
                                  <User size={16} />
                                  <span>My Profile</span>
                                </div>
                              </Link>
                            </motion.div>
                          )}

                          {user.role === "recruiter" && (
                            <motion.div variants={profileItemVariants}>
                              <Link
                                to="/recruiter-access?user=verified"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsProfileOpen(false)}
                              >
                                <div className="flex items-center space-x-2">
                                  <Building size={16} />
                                  <span>Recuriter Access</span>
                                </div>
                              </Link>
                            </motion.div>
                          )}

                          <motion.div variants={profileItemVariants}>
                            <Link
                              to="/jobs?appliedFilter=applied"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <div className="flex items-center space-x-2">
                                <Briefcase size={16} />
                                <span>My Applications</span>
                              </div>
                            </Link>
                          </motion.div>

                          <motion.div variants={profileItemVariants}>
                            <motion.button
                              animate={buttonScaleControls}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              onClick={handleLogout}
                            >
                              <div className="flex items-center space-x-2">
                                <LogOut size={16} />
                                <span>Logout</span>
                              </div>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Link
                      to="/signup"
                      className="flex items-center space-x-1 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all"
                    >
                      <UserPlus size={20} />
                      <span>Register</span>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Link
                      to="/login"
                      className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg px-4 py-2 rounded-full transition-all"
                    >
                      <LogIn size={20} />
                      <span>Login</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <MenuToggle toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden overflow-hidden bg-white rounded-b-xl shadow-xl border-x border-b border-gray-100"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    variants={mobileItemVariants}
                    custom={index}
                    whileHover="hover"
                    whileTap="tap"
                    className="overflow-hidden"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <span>{item.text}</span>
                    </Link>
                  </motion.div>
                ))}

                {isLoggedIn ? (
                  <>
                    <motion.div
                      variants={mobileItemVariants}
                      className="border-t pt-2 mt-2"
                    >
                      <div className="flex items-center space-x-2 px-3 py-3">
                        <motion.div
                          whileHover={{ rotate: 10 }}
                          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center"
                        >
                          {user.firstName.charAt(0).toUpperCase()}
                          {user.lastName.charAt(0).toUpperCase()}
                        </motion.div>
                        <div>
                          <p className="text-sm font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>

                      <motion.div
                        variants={mobileItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg mt-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User size={20} />
                          <span>My Profile</span>
                        </Link>
                      </motion.div>

                      {user.role === "recruiter" && (
                        <motion.div
                          variants={mobileItemVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            to={`/recuriter-access?user=${user ? "verified" : "not-verified"}`}
                            className="flex items-center space-x-2 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Building size={20} />
                            <span>Recruiter Access</span>
                          </Link>
                        </motion.div>
                      )}

                      <motion.div
                        variants={mobileItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to="/applications"
                          className="flex items-center space-x-2 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Briefcase size={20} />
                          <span>My Applications</span>
                        </Link>
                      </motion.div>

                      <motion.div
                        variants={mobileItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <motion.button
                          animate={buttonScaleControls}
                          className="flex items-center space-x-2 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                          onClick={handleLogout}
                        >
                          <LogOut size={20} />
                          <span>Logout</span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      variants={mobileItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="mt-4"
                    >
                      <Link
                        to="/signup"
                        className="flex items-center justify-center space-x-2 px-3 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserPlus size={20} />
                        <span>Register</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      variants={mobileItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link
                        to="/login"
                        className="flex items-center justify-center space-x-2 px-3 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg rounded-xl text-center mt-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LogIn size={20} />
                        <span>Login</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
