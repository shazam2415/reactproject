import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
    // Sosyal medya linklerinizi buraya ekleyebilirsiniz
    const socialLinks = {
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
    };

    return (
        <footer className="bg-black shadow-lg w-full px-96">
            <div className="container mx-auto px-4 py-4 lg:py-5 flex lg:flex-row flex-col items-center justify-between bg-green-600">
                
                {/* Sol Taraf: Telif Hakkı */}
                <div className="text-center bg-red-100 sm:text-left mb-2 sm:mb-0">
                    <p className="text-sm text-gray-600">&copy; 2025 Evine Dön. Tüm hakları saklıdır.</p>
                </div>

                {/* Sağ Taraf: Sosyal Medya İkonları */}
                <div className="flex bg-red-100 items-center space-x-4">
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors duration-300">
                        <FaTwitter size={22} />
                    </a>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors duration-300">
                        <FaInstagram size={22} />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-300">
                        <FaLinkedin size={22} />
                    </a>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors duration-300">
                        <FaGithub size={22} />
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;