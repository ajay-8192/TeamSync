const HomePage: React.FC = () => {
    return (
        <>
            <header className="bg-white shadow-lg fixed w-full top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <a href="#" className="text-2xl font-bold text-blue-600">TeamSync</a>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
                            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">How It Works</a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
                        </div>

                        <div className="flex items-center">
                            <a href="#" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
                                Get Started
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* <!-- Hero Section --> */}
            <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Connect & Communicate
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                            Experience seamless real-time messaging with our modern chat application. Built for teams, friends, and communities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href="#" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                                Start Chatting
                            </a>
                            <a href="#" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Features Section --> */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose TeamSync?
                        </h2>
                        <p className="text-xl text-gray-600">
                            Discover the features that make TeamSync the best choice for your communication needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* <!-- Feature 1 --> */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Real-Time Messaging</h3>
                            <p className="text-gray-600">
                                Instant message delivery with real-time synchronization across all devices. Never miss a conversation.
                            </p>
                        </div>

                        {/* <!-- Feature 2 --> */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Secure & Private</h3>
                            <p className="text-gray-600">
                                End-to-end encryption ensures your conversations remain private and secure from unauthorized access.
                            </p>
                        </div>

                        {/* <!-- Feature 3 --> */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Group Chats</h3>
                            <p className="text-gray-600">
                                Create unlimited group chats with friends, family, or colleagues. Perfect for team collaboration.
                            </p>
                        </div>

                        {/* <!-- Feature 4 --> */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Media Sharing</h3>
                            <p className="text-gray-600">
                                Share photos, videos, documents, and files instantly with drag-and-drop simplicity.
                            </p>
                        </div>

                        {/* <!-- Feature 5 --> */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Cross-Platform</h3>
                            <p className="text-gray-600">
                                Access your chats from any device - desktop, mobile, or tablet. Your conversations sync everywhere.
                            </p>
                        </div>

                        {/* <!-- Feature 6 --> */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Message History</h3>
                            <p className="text-gray-600">
                                Never lose important conversations. Search through your entire message history with powerful search tools.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- How It Works Section --> */}
            <section id="how-it-works" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600">
                            Get started with TeamSync in just three simple steps.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* <!-- Step 1 --> */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Sign Up</h3>
                            <p className="text-gray-600">
                                Create your account in seconds with just your email. No complex setup required.
                            </p>
                        </div>

                        {/* <!-- Step 2 --> */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Connect</h3>
                            <p className="text-gray-600">
                                Find friends, create groups, or join communities. Start building your network.
                            </p>
                        </div>

                        {/* <!-- Step 3 --> */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Chat</h3>
                            <p className="text-gray-600">
                                Start messaging instantly. Share media, create groups, and enjoy seamless communication.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Call to Action Section --> */}
            <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Chatting?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join millions of users who trust TeamSync for their daily communication needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
                            Get Started Free
                        </a>
                        <a href="#" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                            View Demo
                        </a>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-blue-400">TeamSync</h3>
                            <p className="text-gray-400">
                                The modern way to communicate. Connect with friends, family, and colleagues effortlessly.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Features</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition duration-300">Real-time Messaging</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Group Chats</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Media Sharing</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Cross-Platform</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition duration-300">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Terms of Service</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition duration-300">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition duration-300">Press</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 TeamSync. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default HomePage;
