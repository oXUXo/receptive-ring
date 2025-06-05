import { useState, useEffect } from "react";
import { Menu, X, Search, Bell, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { scrollY } = useScroll();

  // 使用 useTransform 创建基于滚动的动画值
  const headerPadding = useTransform(scrollY, [0, 100], ["0px", "16px"]);
  const navBorderRadius = useTransform(scrollY, [0, 100], ["0px", "24px"]);
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 1px 3px 0 rgba(0, 0, 0, 0.1)", "0 20px 25px -5px rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 160);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navItems = [
    { name: "首页", href: "/", hasDropdown: false },
    {
      name: "博客",
      href: "/blog",
      hasDropdown: true,
      dropdownItems: [
        { name: "最新文章", href: "/blog/latest" },
        { name: "技术分享", href: "/blog/tech" },
        { name: "生活随笔", href: "/blog/life" },
      ],
    },
    { name: "项目", href: "/projects", hasDropdown: false },
    {
      name: "关于",
      href: "/about",
      hasDropdown: true,
      dropdownItems: [
        { name: "个人简介", href: "/about/me" },
        { name: "联系方式", href: "/about/contact" },
        { name: "工作经历", href: "/about/experience" },
      ],
    },
  ];

  // 动画变体配置
  const headerVariants = {
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(16px)",
      borderWidth: "1px",
      borderColor: "rgba(255, 255, 255, 0.2)",
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    normal: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(4px)",
      borderWidth: "0px",
      borderColor: "transparent",
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const logoVariants = {
    scrolled: {
      fontSize: "1.25rem",
      background: "linear-gradient(to right, #1f2937, #374151)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: { duration: 0.3 },
    },
    normal: {
      fontSize: "1.5rem",
      background: "linear-gradient(to right, #2563eb, #9333ea)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: { duration: 0.3 },
    },
  };

  const mobileMenuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const mobileMenuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const dropdownVariants = {
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const dropdownItemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50"
        style={{ padding: headerPadding }}
      >
        <motion.nav
          className={`relative border ${isScrolled ? "max-w-4xl mx-auto" : ""}`}
          variants={headerVariants}
          animate={isScrolled ? "scrolled" : "normal"}
          style={{
            borderRadius: navBorderRadius,
            boxShadow: navShadow,
          }}
          layout
          transition={{
            layout: {
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
            },
          }}
        >
          <motion.div
            className={
              isScrolled
                ? "px-6 py-3"
                : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
            }
            layout
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div className="flex-shrink-0">
                <motion.a
                  href="/"
                  className="font-bold"
                  variants={logoVariants}
                  animate={isScrolled ? "scrolled" : "normal"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SeanXia
                </motion.a>
              </motion.div>

              {/* 桌面端导航 */}
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  {navItems.map((item, index) => (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() =>
                        item.hasDropdown && setActiveDropdown(item.name)
                      }
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.a
                        href={item.href}
                        className={`flex items-center space-x-1 font-medium ${
                          isScrolled ? "text-gray-700" : "text-gray-800"
                        }`}
                        whileHover={{
                          color: "#2563eb",
                          transition: { duration: 0.2 },
                        }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.5,
                            ease: "easeOut",
                          },
                        }}
                      >
                        <span>{item.name}</span>
                        {item.hasDropdown && (
                          <motion.div
                            animate={{
                              rotate: activeDropdown === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        )}
                      </motion.a>

                      {/* 下拉菜单 */}
                      <AnimatePresence>
                        {item.hasDropdown && activeDropdown === item.name && (
                          <motion.div
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            {item.dropdownItems?.map((dropItem, dropIndex) => (
                              <motion.a
                                key={dropItem.name}
                                href={dropItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                variants={dropdownItemVariants}
                                whileHover={{
                                  backgroundColor: "#eff6ff",
                                  color: "#2563eb",
                                  x: 4,
                                }}
                              >
                                {dropItem.name}
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧功能区 */}
              <div className="flex items-center space-x-4">
                {/* 搜索按钮 */}
                {/* <motion.button
                  className={`p-2 rounded-full ${
                    isScrolled ? "text-gray-600" : "text-gray-700"
                  }`}
                  whileHover={{
                    backgroundColor: "#f3f4f6",
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="w-5 h-5" />
                </motion.button> */}

                {/* 通知按钮 */}

                {/* CTA 按钮 */}
                <motion.button
                  className={`font-medium px-6 py-2 rounded-full text-white ${
                    isScrolled
                      ? "bg-blue-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-600"
                  }`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  联系我
                </motion.button>

                {/* 移动端菜单按钮 */}
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg text-gray-600"
                  whileHover={{ backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isMobileMenuOpen ? "close" : "menu"}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                      ) : (
                        <Menu className="w-6 h-6" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* 移动端下拉菜单 */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden overflow-hidden"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div
                  className={`${
                    isScrolled ? "px-6 pb-4" : "px-4 pb-4"
                  } space-y-2`}
                >
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      variants={mobileMenuItemVariants}
                    >
                      <motion.a
                        href={item.href}
                        className="block py-2 text-gray-700 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                        whileHover={{
                          color: "#2563eb",
                          x: 8,
                        }}
                      >
                        {item.name}
                      </motion.a>
                      {item.hasDropdown &&
                        item.dropdownItems?.map((dropItem) => (
                          <motion.a
                            key={dropItem.name}
                            href={dropItem.href}
                            className="block py-1 pl-4 text-sm text-gray-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                            whileHover={{
                              color: "#2563eb",
                              x: 12,
                            }}
                            variants={mobileMenuItemVariants}
                          >
                            {dropItem.name}
                          </motion.a>
                        ))}
                    </motion.div>
                  ))}

                  {/* 移动端 CTA */}
                  <motion.div
                    className="pt-4 border-t border-gray-200"
                    variants={mobileMenuItemVariants}
                  >
                    <motion.button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-medium shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      联系我
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.header>

      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            className="text-6xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            欢迎来到我的网站
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            向下滚动查看导航变化效果
          </motion.p>
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <svg
              className="w-8 h-8 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* 演示内容 */}
      {/* {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="max-w-4xl mx-auto p-8 mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            whileHover={{
              y: -5,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              示例内容 {i + 1}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              这里是一些示例内容，用来展示滚动效果。当你向下滚动时，导航栏会从全宽度的传统导航变成两端圆角的悬浮导航，
              并带有毛玻璃背景效果。这种设计在现代网站中非常流行，既美观又实用。
            </p>
          </motion.div>
        </motion.div>
      ))} */}
    </>
  );
};

export default ModernHeader;
