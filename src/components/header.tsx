import React, { useState, useEffect } from 'react';
import { Menu, X, User, Search, Bell, ChevronDown } from 'lucide-react';

const ModernHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: '首页', href: '/', hasDropdown: false },
        {
            name: '博客',
            href: '/blog',
            hasDropdown: true,
            dropdownItems: [
                { name: '最新文章', href: '/blog/latest' },
                { name: '技术分享', href: '/blog/tech' },
                { name: '生活随笔', href: '/blog/life' }
            ]
        },
        { name: '项目', href: '/projects', hasDropdown: false },
        {
            name: '关于',
            href: '/about',
            hasDropdown: true,
            dropdownItems: [
                { name: '个人简介', href: '/about/me' },
                { name: '联系方式', href: '/about/contact' },
                { name: '工作经历', href: '/about/experience' }
            ]
        }
    ];

    return (
        <>
            {/* 背景页面内容模拟 */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-800 mb-4">欢迎来到我的网站</h1>
                        <p className="text-xl text-gray-600 mb-8">向下滚动查看导航变化效果</p>
                        <div className="animate-bounce">
                            <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 演示内容 */}
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="max-w-4xl mx-auto p-8 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">示例内容 {i + 1}</h2>
                            <p className="text-gray-600 leading-relaxed">
                                这里是一些示例内容，用来展示滚动效果。当你向下滚动时，导航栏会从全宽度的传统导航变成两端圆角的悬浮导航，
                                并带有毛玻璃背景效果。这种设计在现代网站中非常流行，既美观又实用。
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 头部导航 */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                        ? 'py-4 px-4'
                        : 'py-0 px-0'
                    }`}
            >
                <nav
                    className={`transition-all duration-500 ease-in-out ${isScrolled
                            ? 'max-w-4xl mx-auto bg-white/80 backdrop-blur-lg border border-white/20 rounded-full shadow-2xl'
                            : 'bg-white/95 backdrop-blur-sm shadow-md'
                        } relative`}
                >
                    <div className={`${isScrolled ? 'px-6 py-3' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'}`}>
                        <div className="flex items-center justify-between">

                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <a
                                    href="/"
                                    className={`font-bold transition-all duration-300 ${isScrolled
                                            ? 'text-xl text-gray-800'
                                            : 'text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                                        }`}
                                >
                                    SeanXia
                                </a>
                            </div>

                            {/* 桌面端导航 */}
                            <div className="hidden md:block">
                                <div className="flex items-center space-x-8">
                                    {navItems.map((item) => (
                                        <div
                                            key={item.name}
                                            className="relative"
                                            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                                            onMouseLeave={() => setActiveDropdown(null)}
                                        >
                                            <a
                                                href={item.href}
                                                className={`flex items-center space-x-1 font-medium transition-all duration-200 hover:text-blue-600 ${isScrolled ? 'text-gray-700' : 'text-gray-800'
                                                    }`}
                                            >
                                                <span>{item.name}</span>
                                                {item.hasDropdown && (
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                                                        }`} />
                                                )}
                                            </a>

                                            {/* 下拉菜单 */}
                                            {item.hasDropdown && (
                                                <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${activeDropdown === item.name
                                                        ? 'opacity-100 visible translate-y-0'
                                                        : 'opacity-0 invisible translate-y-2'
                                                    }`}>
                                                    {item.dropdownItems?.map((dropItem) => (
                                                        <a
                                                            key={dropItem.name}
                                                            href={dropItem.href}
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                                                        >
                                                            {dropItem.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 右侧功能区 */}
                            <div className="flex items-center space-x-4">

                                {/* 搜索按钮 */}
                                <button className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-100 ${isScrolled ? 'text-gray-600' : 'text-gray-700'
                                    }`}>
                                    <Search className="w-5 h-5" />
                                </button>

                                {/* 通知按钮 */}
                                <button className={`p-2 rounded-full transition-all duration-200 hover:bg-gray-100 relative ${isScrolled ? 'text-gray-600' : 'text-gray-700'
                                    }`}>
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </button>

                                {/* CTA 按钮 */}
                                <button className={`transition-all duration-300 font-medium px-6 py-2 rounded-full ${isScrolled
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                    }`}>
                                    联系我
                                </button>

                                {/* 移动端菜单按钮 */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 移动端下拉菜单 */}
                    <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}>
                        <div className={`${isScrolled ? 'px-6 pb-4' : 'px-4 pb-4'} space-y-2`}>
                            {navItems.map((item) => (
                                <div key={item.name}>
                                    <a
                                        href={item.href}
                                        className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                    {item.hasDropdown && item.dropdownItems?.map((dropItem) => (
                                        <a
                                            key={dropItem.name}
                                            href={dropItem.href}
                                            className="block py-1 pl-4 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {dropItem.name}
                                        </a>
                                    ))}
                                </div>
                            ))}

                            {/* 移动端 CTA */}
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-medium shadow-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    联系我
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default ModernHeader;